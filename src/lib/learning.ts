import { allPhrases, lessons, lessonById, phraseById, isKnownPhrase } from '../data/curriculum';
import { catalogLessonById } from '../data/catalog';
import type { Phrase } from '../data/curriculum';

export type Goal = 3 | 5 | 10;
export type SessionMode = 'lesson' | 'review' | 'tiny';
export type Memory = { level: number; due: string; introduced: string; lastReviewed: string; attempts: number; correct: number };
export type Activity = { steps: number; sessions: number };
export type Reminder = { enabled: boolean; time: string };
export type Settings = { goal: Goal; name: string; showPronunciation: boolean; slowAudio: boolean; reminder: Reminder };
export type Exercise = 'meaning' | 'listening' | 'order';
export type Step = { id: string; kind: 'learn' | 'practice'; phraseId: string; exercise: Exercise; options: string[] };
export type Answer = { phraseId: string; correct: boolean; revealed: boolean };
export type Session = {
  id: string;
  mode: SessionMode;
  lessonId?: string;
  title: string;
  steps: Step[];
  index: number;
  answers: Answer[];
  startedAt: string;
};
export type HistoryItem = { id: string; date: string; title: string; mode: SessionMode; phrases: number; correct: number; answers: number };
export type Progress = {
  version: 1;
  learned: Record<string, Memory>;
  completedLessons: string[];
  activity: Record<string, Activity>;
  history: HistoryItem[];
  settings: Settings;
  activeSession: Session | null;
  totalAnswers: number;
  totalCorrect: number;
};

export const STORAGE_KEY = 'ghadam-progress-v1';
export const REVIEW_DAYS = [1, 3, 7, 14, 30];
export const faNumber = (value: number) => new Intl.NumberFormat('fa-IR').format(value);

export function dateKey(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function addDays(key: string, days: number): string {
  const date = new Date(`${key}T12:00:00`);
  date.setDate(date.getDate() + days);
  return dateKey(date);
}

export function lastSevenDays(today = dateKey()): string[] {
  return Array.from({ length: 7 }, (_, i) => addDays(today, i - 6));
}

export function createProgress(): Progress {
  return {
    version: 1, learned: {}, completedLessons: [], activity: {}, history: [],
    settings: { goal: 5, name: '', showPronunciation: true, slowAudio: true, reminder: { enabled: false, time: '20:00' } },
    activeSession: null, totalAnswers: 0, totalCorrect: 0,
  };
}

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function makeOptions(phrase: Phrase, field: 'en' | 'fa'): string[] {
  const others = shuffle(allPhrases.filter((item) => item.id !== phrase.id && item[field] !== phrase[field]));
  return shuffle([phrase[field], ...others.slice(0, 2).map((item) => item[field])]);
}

export function exerciseCount(goal: Goal): number {
  return goal === 3 ? 2 : goal === 10 ? 6 : 3;
}

function practiceStep(phrase: Phrase, exercise: Exercise, index: number): Step {
  return { id: `step-${index}`, kind: 'practice', phraseId: phrase.id, exercise, options: exercise === 'order' ? [] : makeOptions(phrase, exercise === 'meaning' ? 'en' : 'fa') };
}

export function createSession(mode: SessionMode, progress: Progress, lessonId?: string): Session {
  const base = { id: `session-${globalThis.crypto.randomUUID()}`, mode, index: 0, answers: [], startedAt: new Date().toISOString() };
  const count = exerciseCount(progress.settings.goal);
  if (mode === 'tiny') {
    const next = nextLesson(progress);
    const phrase = next.phrases.find((item) => !progress.learned[item.id]) ?? next.phrases[0];
    return { ...base, title: 'یک قدم کوچک', lessonId: next.id, steps: [practiceStep(phrase, 'meaning', 0)] };
  }
  if (mode === 'review') {
    const due = duePhrases(progress);
    const pool = due.length ? due : Object.keys(progress.learned).map((id) => phraseById.get(id)).filter((p): p is Phrase => !!p);
    const selected = (pool.length ? pool : lessons[0].phrases).slice(0, progress.settings.goal === 10 ? 8 : 5);
    return { ...base, title: due.length ? 'مرور امروز' : 'مرور آزاد', steps: selected.map((phrase, i) => practiceStep(phrase, i % 2 === 0 ? 'meaning' : 'listening', i)) };
  }
  const lesson = (lessonId && lessonById.get(lessonId)) || nextLesson(progress);
  const learnCount = 3;
  const phrases = lesson.phrases.slice(0, learnCount);
  const types: Exercise[] = ['meaning', 'listening', 'order'];
  return {
    ...base, title: lesson.title, lessonId: lesson.id,
    steps: [
      ...phrases.map((phrase, i): Step => ({ id: `step-${i}`, kind: 'learn', phraseId: phrase.id, exercise: 'meaning', options: [] })),
      ...Array.from({ length: count }, (_, i) => practiceStep(phrases[i % phrases.length], types[i % types.length], i + learnCount)),
    ],
  };
}

export function nextLesson(progress: Progress) {
  return lessons.find((lesson) => !progress.completedLessons.includes(lesson.id)) ?? lessons[0];
}

export function duePhrases(progress: Progress, today = dateKey()): Phrase[] {
  return Object.entries(progress.learned)
    .filter(([, memory]) => memory.due <= today)
    .sort(([, a], [, b]) => a.due.localeCompare(b.due) || a.level - b.level)
    .map(([id]) => phraseById.get(id))
    .filter((phrase): phrase is Phrase => !!phrase);
}

export function applyStep(progress: Progress, session: Session, correct: boolean, revealed = false, today = dateKey()): Progress {
  // Always use the persisted state, so a repeated click cannot award a step twice.
  const activeSession = progress.activeSession;
  if (!activeSession || activeSession.id !== session.id) return progress;
  const step = activeSession.steps[activeSession.index];
  if (!step || activeSession.answers[activeSession.index]) return progress;
  const phrase = phraseById.get(step.phraseId);
  if (!phrase) return progress;
  const previous = progress.learned[phrase.id];
  const level = step.kind === 'learn' ? previous?.level ?? 0 : correct ? Math.min((previous?.level ?? 0) + 1, REVIEW_DAYS.length) : 0;
  const delay = step.kind === 'learn' ? 1 : REVIEW_DAYS[Math.max(0, level - 1)];
  const memory: Memory = {
    level,
    due: addDays(today, delay),
    introduced: previous?.introduced ?? today,
    lastReviewed: today,
    attempts: (previous?.attempts ?? 0) + (step.kind === 'practice' ? 1 : 0),
    correct: (previous?.correct ?? 0) + (step.kind === 'practice' && correct ? 1 : 0),
  };
  const answers = [...activeSession.answers];
  answers[activeSession.index] = { phraseId: phrase.id, correct, revealed };
  const oldActivity = progress.activity[today] ?? { steps: 0, sessions: 0 };
  return {
    ...progress,
    learned: { ...progress.learned, [phrase.id]: memory },
    activity: { ...progress.activity, [today]: { ...oldActivity, steps: oldActivity.steps + 1 } },
    activeSession: { ...activeSession, answers },
    totalAnswers: progress.totalAnswers + (step.kind === 'practice' ? 1 : 0),
    totalCorrect: progress.totalCorrect + (step.kind === 'practice' && correct ? 1 : 0),
  };
}

export function advanceSession(progress: Progress): Progress {
  const session = progress.activeSession;
  if (!session) return progress;
  if (session.index < session.steps.length - 1) {
    return { ...progress, activeSession: { ...session, index: session.index + 1 } };
  }
  return finishSession(progress);
}

export function finishSession(progress: Progress, today = dateKey()): Progress {
  const session = progress.activeSession;
  if (!session) return progress;
  const answers = session.answers.filter(Boolean);
  const practice = session.answers.flatMap((answer, i) => answer && session.steps[i]?.kind === 'practice' ? [answer] : []);
  const activity = progress.activity[today] ?? { steps: 0, sessions: 0 };
  const completed = session.mode === 'lesson' && session.lessonId && session.answers.length === session.steps.length;
  const item: HistoryItem = {
    id: session.id, date: new Date().toISOString(), title: session.title, mode: session.mode,
    phrases: new Set(answers.map((answer) => answer.phraseId)).size,
    correct: practice.filter((answer) => answer.correct).length, answers: practice.length,
  };
  return {
    ...progress,
    activeSession: null,
    completedLessons: completed ? [...new Set([...progress.completedLessons, session.lessonId!])] : progress.completedLessons,
    activity: { ...progress.activity, [today]: { steps: activity.steps, sessions: activity.sessions + 1 } },
    history: [item, ...progress.history].slice(0, 100),
  };
}

export function normalizeSentence(value: string): string {
  return value.toLocaleLowerCase('en-US').replace(/[!?.،,؛;'"’]/g, '').replace(/\s+/g, ' ').trim();
}

export function isOrderCorrect(tokens: string[], phrase: Phrase): boolean {
  return normalizeSentence(tokens.join(' ')) === normalizeSentence(phrase.en);
}

export function scrambledTokens(phrase: Phrase): string[] {
  const original = phrase.en.split(' ');
  if (original.length < 2) return original;
  const tokens = shuffle(original);
  if (tokens.join(' ') === original.join(' ')) tokens.push(tokens.shift()!);
  return tokens;
}

export function practiceDays(progress: Progress): number {
  return Object.values(progress.activity).filter((day) => day.steps > 0).length;
}

export function learnedCount(progress: Progress): number {
  return Object.keys(progress.learned).filter((id) => isKnownPhrase(id)).length;
}

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);
const isString = (value: unknown): value is string => typeof value === 'string';
const isCount = (value: unknown): value is number => typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;
const isDate = (value: unknown): value is string => isString(value) && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(`${value}T12:00:00Z`).toISOString().slice(0, 10) === value;
const isMode = (value: unknown): value is SessionMode => value === 'lesson' || value === 'review' || value === 'tiny';

function validSession(value: unknown): value is Session {
  if (!isRecord(value) || !isString(value.id) || !isMode(value.mode) || !isString(value.title) || !isString(value.startedAt) || Number.isNaN(Date.parse(value.startedAt))) return false;
  if (!Array.isArray(value.steps) || !value.steps.length || value.steps.length > 20 || !isCount(value.index) || value.index >= value.steps.length) return false;
  if (value.mode === 'review') { if (value.lessonId !== undefined) return false; }
  else if (!isString(value.lessonId) || !catalogLessonById.has(value.lessonId)) return false;
  const steps = value.steps;
  if (value.mode === 'tiny' && steps.length !== 1) return false;
  const stepsValid = steps.every((raw, i) => {
    if (!isRecord(raw) || raw.id !== `step-${i}` || !isString(raw.phraseId)) return false;
    const phrase = phraseById.get(raw.phraseId);
    if (!isKnownPhrase(String(raw.phraseId)) || !['learn', 'practice'].includes(String(raw.kind)) || !['meaning', 'listening', 'order'].includes(String(raw.exercise))) return false;
    if (!Array.isArray(raw.options) || !raw.options.every(isString)) return false;
    if (raw.kind === 'learn') return value.mode === 'lesson' && i < 3 && raw.options.length === 0;
    if (raw.exercise === 'order') return raw.options.length === 0;
    return raw.options.length === 3 && new Set(raw.options).size === 3 && (!phrase || raw.options.includes(phrase[raw.exercise === 'meaning' ? 'en' : 'fa']));
  });
  if (!stepsValid) return false;
  return Array.isArray(value.answers) && value.answers.length <= value.index + 1 && value.answers.every((answer, i) => isRecord(answer) && answer.phraseId === steps[i]?.phraseId && typeof answer.correct === 'boolean' && typeof answer.revealed === 'boolean');
}

export function parseProgress(raw: string): Progress | null {
  try {
    const value: unknown = JSON.parse(raw);
    if (!isRecord(value) || value.version !== 1 || !isRecord(value.learned) || !isRecord(value.settings) || !isRecord(value.activity)) return null;
    if ((typeof value.settings.goal !== 'number' || ![3, 5, 10].includes(value.settings.goal)) || !isString(value.settings.name) || value.settings.name.length > 40 || typeof value.settings.showPronunciation !== 'boolean' || typeof value.settings.slowAudio !== 'boolean') return null;
    const reminder = value.settings.reminder;
    if (reminder !== undefined && (!isRecord(reminder) || typeof reminder.enabled !== 'boolean' || !isString(reminder.time) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(reminder.time))) return null;
    if (reminder === undefined) value.settings.reminder = { enabled: false, time: '20:00' };
    if (!Array.isArray(value.completedLessons) || !value.completedLessons.every((id) => isString(id) && catalogLessonById.has(id))) return null;
    if (!isCount(value.totalAnswers) || !isCount(value.totalCorrect) || value.totalCorrect > value.totalAnswers) return null;
    for (const [id, memory] of Object.entries(value.learned)) {
      if (!isKnownPhrase(id) || !isRecord(memory) || !isCount(memory.level) || memory.level > 5 || !isDate(memory.due) || !isDate(memory.introduced) || !isDate(memory.lastReviewed) || !isCount(memory.attempts) || !isCount(memory.correct) || memory.correct > memory.attempts) return null;
    }
    for (const [date, activity] of Object.entries(value.activity)) {
      if (!isDate(date) || !isRecord(activity) || !isCount(activity.steps) || !isCount(activity.sessions)) return null;
    }
    if (!Array.isArray(value.history) || value.history.length > 100 || !value.history.every((item) => isRecord(item) && isString(item.id) && isString(item.date) && !Number.isNaN(Date.parse(item.date)) && isString(item.title) && isMode(item.mode) && isCount(item.phrases) && isCount(item.answers) && isCount(item.correct) && item.correct <= item.answers)) return null;
    if (value.activeSession !== null && !validSession(value.activeSession)) return null;
    return value as unknown as Progress;
  } catch {
    return null;
  }
}
