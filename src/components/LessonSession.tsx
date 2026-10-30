import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Check, CheckCircle2, ChevronLeft, Clock3, Eye, Lightbulb, LogOut, RotateCcw, Sparkles } from 'lucide-react';
import { phraseById } from '../data/curriculum';
import { advanceSession, applyStep, faNumber, isOrderCorrect, scrambledTokens } from '../lib/learning';
import type { Progress, Session, Step } from '../lib/learning';
import type { Speech } from '../hooks/useSpeech';
import { AudioButton, Logo, Reassurance } from './UI';
import { SmallPlant } from './Illustrations';

type Props = {
  session: Session;
  progress: Progress;
  speech: Speech;
  setProgress: React.Dispatch<React.SetStateAction<Progress>>;
  onExit: () => void;
  onComplete: (session: Session) => void;
};

export function LessonSession({ session, progress, speech, setProgress, onExit, onComplete }: Props) {
  const step = session.steps[session.index];
  return <div className="session-page" dir="rtl">
    <header className="session-header"><Logo small/><div className="session-header-middle"><span>{session.title}</span><div className="progress-track" role="progressbar" aria-label="پیشرفت تمرین" aria-valuemin={0} aria-valuemax={session.steps.length} aria-valuenow={session.answers.filter(Boolean).length}><span style={{ width: `${session.answers.filter(Boolean).length / session.steps.length * 100}%` }}/></div></div><button className="text-button exit-button" onClick={() => { speech.stop(); onExit(); }}><LogOut size={17}/><span>ذخیره و خروج</span></button></header>
    <main id="main-content" tabIndex={-1} className="session-main"><div className="session-meta"><span>{session.mode === 'review' ? 'مرور، نه امتحان' : session.mode === 'tiny' ? 'حتی یک قدم هم کافیه' : 'کم‌کم، با هم یاد می‌گیریم'}</span><span>قدم {faNumber(session.index + 1)} از {faNumber(session.steps.length)}</span></div>
      <PracticeCard key={`${session.id}-${step.id}`} step={step} session={session} progress={progress} speech={speech} setProgress={setProgress} onExit={onExit} onComplete={onComplete}/>
      <Reassurance/>
    </main>
  </div>;
}

function PracticeCard({ step, session, progress, speech, setProgress, onComplete }: Props & { step: Step }) {
  const phrase = phraseById.get(step.phraseId)!;
  const heading = useRef<HTMLHeadingElement>(null);
  const answer = session.answers[session.index];
  const bank = useMemo(() => scrambledTokens(phrase), [phrase]);
  const [selected, setSelected] = useState(answer?.correct ? phrase[step.exercise === 'listening' ? 'fa' : 'en'] : '');
  const [tokens, setTokens] = useState<number[]>(() => {
    if (!answer || step.exercise !== 'order') return [];
    const available = bank.map((_, index) => index);
    return phrase.en.split(' ').map((word) => {
      const index = available.find((item) => bank[item] === word)!;
      available.splice(available.indexOf(index), 1);
      return index;
    });
  });
  const [fallback, setFallback] = useState(false);
  const answered = !!answer;
  const isLearn = step.kind === 'learn';
  const order = step.exercise === 'order';
  const listening = step.exercise === 'listening';
  const ready = order ? tokens.length === bank.length : !!selected;
  const correct = order ? isOrderCorrect(tokens.map((i) => bank[i]), phrase) : selected === phrase[listening ? 'fa' : 'en'];

  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
    return () => speech.stop();
  }, [speech.stop]);
  useEffect(() => {
    if (listening && !speech.available && speech.ready) setFallback(true);
  }, [listening, speech.available, speech.ready]);

  function submit() {
    if (!ready || answered) return;
    speech.stop();
    setProgress((current) => applyStep(current, session, correct));
  }

  function next() {
    speech.stop();
    if (answered && session.index === session.steps.length - 1) onComplete(session);
    setProgress((current) => isLearn && !answered ? advanceSession(applyStep(current, session, true)) : advanceSession(current));
  }

  const title = isLearn ? 'فقط ببین و بشنو' : order ? 'کلمه‌ها رو کنار هم بچین' : listening ? 'بشنو و معنی رو پیدا کن' : 'کدوم جمله این معنی رو می‌ده؟';

  return <section className={`practice-card ${isLearn ? 'learn-card' : ''}`} aria-labelledby="exercise-title">
    <div className="exercise-label"><span className="label-dot"/>{isLearn ? 'آشنایی · بدون سؤال' : order ? 'تمرین · جمله‌سازی' : listening ? 'تمرین · شنیداری' : 'تمرین · معنی جمله'}</div>
    <h1 id="exercise-title" ref={heading} tabIndex={-1}>{title}</h1>
    {isLearn ? <>
      <div className="new-phrase" dir="ltr" lang="en">{phrase.en}</div>
      <AudioButton phrase={phrase} speech={speech} large showPronunciation={progress.settings.showPronunciation}/>
      <div className="learn-meaning"><span>به فارسی یعنی</span><h2>{phrase.fa}</h2></div>
      <div className="learning-tip"><Lightbulb size={20}/><p>{phrase.tip}</p></div>
      {!speech.available && speech.ready && <p className="audio-notice">صدای انگلیسی روی این مرورگر در دسترس نیست؛ نوشته و راهنمای تلفظ همچنان کار می‌کنند.</p>}
    </> : <>
      {order ? <p className="exercise-prompt">{phrase.fa}</p> : listening ? <div className="listening-prompt">
        <AudioButton phrase={phrase} speech={speech} large/>
        <p>روی دکمه بزن؛ می‌تونی هر چند بار خواستی گوش بدی.</p>
        <button className="text-button" onClick={() => setFallback(!fallback)}><Eye size={15}/>{fallback ? 'پنهان‌کردن متن' : 'صدا ندارم؛ متن را نشان بده'}</button>
        {fallback && <strong className="fallback-phrase" dir="ltr" lang="en">{phrase.en}</strong>}
      </div> : <p className="exercise-prompt">«{phrase.fa}»</p>}
      {order ? <div className="word-order">
        <div className={`word-answer ${answered ? answer.correct ? 'correct' : 'incorrect' : ''}`} aria-label="جملهٔ ساخته‌شده" dir="ltr" lang="en">
          {tokens.length === 0 && <span className="word-placeholder">کلمه‌ها را به ترتیب انتخاب کن</span>}
          {tokens.map((index, position) => <button key={`${index}-${position}`} className="word-chip selected" disabled={answered} onClick={() => setTokens(tokens.filter((_, i) => i !== position))} aria-label={`برداشتن ${bank[index]}`}>{bank[index]}</button>)}
        </div>
        <div className="word-bank" dir="ltr" lang="en">{bank.map((word, index) => <button key={index} className={`word-chip ${tokens.includes(index) ? 'used' : ''}`} disabled={tokens.includes(index) || answered} onClick={() => setTokens([...tokens, index])}>{word}</button>)}</div>
        {!answered && <button className="text-button clear-words" disabled={!tokens.length} onClick={() => setTokens([])}><RotateCcw size={15}/>از اول بچین</button>}
      </div> : <div className={`answer-options ${listening ? 'persian-options' : ''}`} dir={listening ? 'rtl' : 'ltr'} lang={listening ? 'fa' : 'en'}>
        {step.options.map((option, index) => <button key={option} disabled={answered} onClick={() => setSelected(option)} className={`answer-option ${selected === option ? 'selected' : ''} ${answered && option === phrase[listening ? 'fa' : 'en'] ? 'correct' : ''} ${answered && selected === option && !correct ? 'incorrect' : ''}`} aria-pressed={selected === option}>
          <span className="option-number" dir="ltr">{String.fromCharCode(65 + index)}</span><span>{option}</span>{answered && option === phrase[listening ? 'fa' : 'en'] && <CheckCircle2 size={20}/>}
        </button>)}
      </div>}
      {answered && <div className={`answer-feedback ${answer.correct ? 'positive' : 'gentle'}`} role="status"><span className="feedback-icon">{answer.correct ? <Check size={21}/> : <Lightbulb size={21}/>}</span><div><strong>{answer.correct ? 'درست بود! دیدی تونستی؟' : 'اشکالی نداره؛ با هم دیدیمش.'}</strong><p>{answer.correct ? 'لازم نیست کامل باشی؛ همین تمرین کوچک کمک می‌کنه.' : `جواب درست: ${phrase.en}`}</p>{listening && <span className="feedback-meaning">{phrase.fa}</span>}</div></div>}
      {listening && !answered && !fallback && !speech.available && speech.ready && <p className="audio-notice">پخش صدا در دسترس نیست. از «متن را نشان بده» استفاده کن.</p>}
    </>}
    <div className="exercise-actions">
      {isLearn ? <button className="button button-primary" onClick={next}>فهمیدم، بریم بعدی<ArrowLeft size={19}/></button> : answered ? <button className="button button-primary" onClick={next}>{session.index === session.steps.length - 1 ? 'دیدن نتیجه' : 'قدم بعدی'}<ArrowLeft size={19}/></button> : <button className="button button-primary" disabled={!ready} onClick={submit}>بررسی جواب<Check size={19}/></button>}
      <span>{isLearn ? 'عجله نکن؛ وقتی آماده‌ای ادامه بده.' : answered ? 'اشتباه‌کردن بخشی از یاد گرفتنه.' : 'نمره و جریمه‌ای در کار نیست.'}</span>
    </div>
  </section>;
}

export function Completion({ session, storageError, onHome, onLessons }: { session: Session; storageError: boolean; onHome: () => void; onLessons: () => void }) {
  const count = new Set(session.answers.filter(Boolean).map((answer) => answer.phraseId)).size;
  return <main id="main-content" tabIndex={-1} className="completion-page"><div className="completion-brand"><Logo/></div><div className="completion-card">
    <div className="completion-art"><SmallPlant/><span className="celebrate-dot dot-one"/><span className="celebrate-dot dot-two"/><Sparkles className="celebrate-star" size={27}/></div>
    <span className="eyebrow">یک قدم واقعی برداشتی</span><h1>{session.mode === 'tiny' ? 'همین یک قدم هم ارزشمند بود.' : 'آفرین به وقتی که برای خودت گذاشتی.'}</h1>
    <p>امروز {faNumber(count)} عبارت را {session.mode === 'lesson' ? 'دیدی و تمرین کردی' : 'تمرین کردی'}.<br/>قرار نیست همه‌چیز را همین حالا حفظ باشی؛ در مرورهای بعدی دوباره می‌بینیمشان.</p>
    <div className="completion-details"><span><CheckCircle2 size={19}/>{storageError ? 'این قدم انجام شد' : 'پیشرفتت ذخیره شد'}</span><span><Clock3 size={19}/>مرور بعدی: از فردا</span></div>
    <button className="button button-primary" onClick={onHome}>برگشت به امروز<ArrowLeft size={19}/></button>
    <button className="text-button" onClick={onLessons}>اگر دوست داشتی، درس‌ها را ببین<ChevronLeft size={17}/></button>
    <small>{storageError ? 'ذخیره‌سازی مرورگر در دسترس نیست؛ از تنظیمات فایل پشتیبان بگیر.' : 'برای امروز هم می‌توانی همین‌جا کافی بدانی.'}</small>
  </div><Reassurance/></main>;
}

