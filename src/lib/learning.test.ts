import test from 'node:test';
import assert from 'node:assert/strict';
import { lessons, phraseById } from '../data/curriculum';
import { addDays, advanceSession, applyStep, createProgress, createSession, dateKey, duePhrases, finishSession, isOrderCorrect, lastSevenDays, learnedCount, makeOptions, nextLesson, parseProgress, practiceDays, scrambledTokens } from './learning';
import type { Progress, Session } from './learning';

const TODAY = '2026-10-30';
function completedLesson(progress = createProgress()): { progress: Progress; session: Session } {
  let state: Progress = { ...progress, activeSession: createSession('lesson', progress, 'hello') };
  const count = state.activeSession!.steps.length;
  let session = state.activeSession!;
  for (let i = 0; i < count; i++) {
    const current = state.activeSession!;
    const answered = applyStep(state, current, true, false, TODAY);
    session = answered.activeSession!;
    state = advanceSession(answered);
  }
  return { progress: state, session };
}

test('calendar arithmetic handles month, year and leap-day boundaries', () => {
  assert.equal(addDays('2026-10-30', 1), '2026-10-31');
  assert.equal(addDays('2026-12-31', 1), '2027-01-01');
  assert.equal(addDays('2028-02-28', 1), '2028-02-29');
  assert.equal(addDays('2028-02-29', 1), '2028-03-01');
  assert.deepEqual(lastSevenDays('2026-01-02'), ['2025-12-27', '2025-12-28', '2025-12-29', '2025-12-30', '2025-12-31', '2026-01-01', '2026-01-02']);
  assert.match(dateKey(new Date(2026, 9, 30, 23, 59)), /2026-10-30/);
});

test('curriculum has 30 lessons and 90 unique phrases', () => {
  assert.equal(lessons.length, 30);
  const phrases = lessons.flatMap((lesson) => lesson.phrases);
  assert.equal(phrases.length, 90);
  assert.equal(new Set(phrases.map((phrase) => phrase.id)).size, 90);
  assert.equal(new Set(lessons.map((lesson) => lesson.id)).size, 30);
  for (const lesson of lessons) assert.equal(lesson.phrases.length, 3);
});

test('a new learner starts at hello with a gentle five-minute session', () => {
  const progress = createProgress();
  assert.equal(nextLesson(progress).id, 'hello');
  const session = createSession('lesson', progress);
  assert.equal(session.steps.length, 6);
  assert.equal(session.steps.filter((step) => step.kind === 'learn').length, 3);
  assert.deepEqual(session.steps.slice(3).map((step) => step.exercise), ['meaning', 'listening', 'order']);
});

test('all session lengths respect the selected goal and a tiny session is one question', () => {
  for (const goal of [3, 5, 10] as const) {
    const progress = createProgress();
    progress.settings.goal = goal;
    assert.equal(createSession('lesson', progress).steps.length, 3 + (goal === 3 ? 2 : goal === 5 ? 3 : 6));
  }
  const tiny = createSession('tiny', createProgress());
  assert.equal(tiny.steps.length, 1);
  assert.equal(tiny.steps[0].kind, 'practice');
});

test('options contain one correct answer and three distinct choices', () => {
  for (const phrase of lessons.flatMap((lesson) => lesson.phrases)) {
    for (const field of ['en', 'fa'] as const) {
      const options = makeOptions(phrase, field);
      assert.equal(options.length, 3);
      assert.equal(new Set(options).size, 3);
      assert.equal(options.filter((option) => option === phrase[field]).length, 1);
    }
  }
});

test('word order ignores punctuation and case, not word sequence', () => {
  const phrase = phraseById.get('hello-3')!;
  assert.equal(isOrderCorrect(phrase.en.split(' '), phrase), true);
  assert.equal(isOrderCorrect("I'm fine thank you".toUpperCase().split(' '), phrase), true);
  assert.equal(isOrderCorrect(['you', 'thank', 'fine,', "I'm"], phrase), false);
  for (let i = 0; i < 15; i++) assert.notEqual(scrambledTokens(phrase).join(' '), phrase.en);
});

test('answering is idempotent and learning a phrase schedules tomorrow', () => {
  let progress = createProgress();
  const session = createSession('lesson', progress);
  progress = { ...progress, activeSession: session };
  progress = applyStep(progress, session, true, false, TODAY);
  const duplicate = applyStep(progress, session, true, false, TODAY);
  assert.equal(duplicate, progress);
  assert.equal(progress.learned['hello-1'].due, '2026-10-31');
  assert.equal(progress.totalAnswers, 0);
  assert.equal(learnedCount(progress), 1);
});

test('complete a lesson, persist it, and recommend the next lesson', () => {
  const { progress, session } = completedLesson();
  assert.equal(progress.activeSession, null);
  assert.deepEqual(progress.completedLessons, ['hello']);
  assert.equal(learnedCount(progress), 3);
  assert.equal(practiceDays(progress), 1);
  assert.equal(progress.history[0].phrases, 3);
  assert.equal(progress.history[0].correct, 3);
  assert.equal(progress.history[0].answers, 3);
  assert.equal(nextLesson(progress).id, 'introduce');
  assert.equal(duePhrases(progress, TODAY).length, 0);
  assert.equal(duePhrases(progress, '2026-10-31').length, 3);
  assert.equal(session.answers.length, session.steps.length);
  assert.deepEqual(parseProgress(JSON.stringify(progress)), progress);
});

test('a wrong answer is kind but returns sooner in review', () => {
  let progress = completedLesson().progress;
  const session = createSession('review', progress);
  progress = { ...progress, activeSession: session };
  progress = applyStep(progress, session, false, false, '2026-10-31');
  assert.equal(progress.learned['hello-1'].due, '2026-11-01');
  assert.equal(progress.learned['hello-1'].level, 0);
  assert.equal(progress.totalCorrect, 3);
  assert.equal(progress.totalAnswers, 4);
});

test('correct review increases the interval and caps at thirty days', () => {
  let progress = completedLesson().progress;
  // Keep the free-review pool stable so the same phrase advances through every interval.
  for (const id of Object.keys(progress.learned)) progress.learned[id] = { ...progress.learned[id], due: '2099-01-01' };
  for (const [index, expected] of [3, 7, 14, 30, 30].entries()) {
    const day = addDays(TODAY, index + 1);
    const session = createSession('review', progress);
    const first = session.steps[0];
    session.steps = [first];
    progress = { ...progress, activeSession: session };
    progress = applyStep(progress, session, true, false, day);
    assert.equal(progress.learned[first.phraseId].due, addDays(day, expected));
  }
});

test('overdue items remain available after a break; there is no streak reset', () => {
  const progress = completedLesson().progress;
  assert.equal(duePhrases(progress, '2027-01-15').length, 3);
  assert.equal(practiceDays(progress), 1);
  assert.equal(progress.completedLessons.length, 1);
});

test('tiny practice and early exit never falsely complete a lesson', () => {
  let progress = createProgress();
  progress.activeSession = createSession('tiny', progress);
  progress = applyStep(progress, progress.activeSession!, true, false, TODAY);
  progress = advanceSession(progress);
  assert.equal(progress.history.length, 1);
  assert.equal(progress.completedLessons.length, 0);
  assert.equal(practiceDays(progress), 1);
  progress.activeSession = createSession('lesson', progress, 'introduce');
  progress = applyStep(progress, progress.activeSession!, true, false, TODAY);
  assert.equal(progress.activeSession!.index, 0);
  assert.equal(progress.completedLessons.length, 0);
  assert.equal(practiceDays(progress), 1);
  assert.deepEqual(parseProgress(JSON.stringify(progress)), progress);
});

test('free review works before any phrase has been learned', () => {
  const progress = createProgress();
  const session = createSession('review', progress);
  assert.equal(session.steps.length, 3);
  assert.equal(session.title, 'مرور آزاد');
});

test('corrupt, incompatible and unsafe saved data is rejected', () => {
  for (const raw of ['broken', 'null', '[]', '{}', '{"version":2}']) assert.equal(parseProgress(raw), null);
  const progress = createProgress();
  assert.equal(parseProgress(JSON.stringify({ ...progress, settings: { ...progress.settings, goal: 50 } })), null);
  assert.equal(parseProgress(JSON.stringify({ ...progress, learned: { 'unknown-id': {} } })), null);
  assert.equal(parseProgress(JSON.stringify({ ...progress, totalCorrect: 100 })), null);
  const active = createSession('lesson', progress);
  assert.equal(parseProgress(JSON.stringify({ ...progress, activeSession: { ...active, index: 999 } })), null);
  assert.equal(parseProgress(JSON.stringify({ ...progress, activeSession: { ...active, steps: [] } })), null);
});

test('restored mid-question progress remains valid and does not award duplicate activity', () => {
  let progress = createProgress();
  const session = createSession('lesson', progress);
  progress = applyStep({ ...progress, activeSession: session }, session, true, false, TODAY);
  const restored = parseProgress(JSON.stringify(progress))!;
  assert.ok(restored);
  assert.equal(restored.activeSession!.answers.length, 1);
  const duplicate = applyStep(restored, restored.activeSession!, true, false, TODAY);
  assert.equal(duplicate, restored);
  const done = advanceSession(restored);
  assert.equal(done.activeSession!.index, 1);
  const noActive = { ...done, activeSession: null };
  assert.equal(finishSession(noActive), noActive);
});
