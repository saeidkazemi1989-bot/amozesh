import { useState } from 'react';
import { ArrowLeft, BookOpen, Check, CheckCheck, ChevronLeft, Clock3, Coffee, Ear, Flag, Heart, Leaf, ListChecks, MessageCircle, Play, RotateCcw, Search, Sparkles, Sprout, Target, Hash, Users, UtensilsCrossed, CloudSun, Stethoscope, Plane, Phone, Palette, CalendarDays, GraduationCap, PawPrint, Shirt, Home, HandHelping, ChefHat, Bus, PartyPopper, Smartphone } from 'lucide-react';
import { allPhrases, lessons, lessonById } from '../data/curriculum';
import { lessonCatalog, levels, levelById, catalogPhraseIds } from '../data/catalog';
import type { Membership } from '../hooks/useMembership';
import { Lock, UserRound } from 'lucide-react';
import type { Lesson, Phrase } from '../data/curriculum';
import { dateKey, duePhrases, exerciseCount, faNumber, lastSevenDays, learnedCount, nextLesson, practiceDays } from '../lib/learning';
import type { Progress, SessionMode } from '../lib/learning';
import type { Speech } from '../hooks/useSpeech';
import { AudioButton, EmptyState, Reassurance } from './UI';
import { LearningIllustration, SmallPlant } from './Illustrations';

export type StartSession = (mode: SessionMode, lessonId?: string) => void;
export const LessonIcon = ({ icon, size = 24 }: { icon: Lesson['icon']; size?: number }) => {
  const icons = { hello: MessageCircle, user: Sprout, heart: Heart, coffee: Coffee, ear: Ear, map: Flag, home: BookOpen, sun: Sparkles, bag: ListChecks, clock: Clock3, smile: Heart, chat: MessageCircle, numbers: Hash, family: Users, food: UtensilsCrossed, weather: CloudSun, health: Stethoscope, travel: Plane, phone: Phone, hobby: Palette, calendar: CalendarDays, school: GraduationCap, animals: PawPrint, clothes: Shirt, house: Home, help: HandHelping, restaurant: ChefHat, transport: Bus, party: PartyPopper, tech: Smartphone };
  const Icon = icons[icon];
  return <Icon size={size} strokeWidth={1.7}/>;
};
const shortDate = (key: string) => new Intl.DateTimeFormat('fa-IR', { day: 'numeric', month: 'long' }).format(new Date(`${key}T12:00:00`));

export function Dashboard({ progress, onStart, onResume, navigate }: { progress: Progress; onStart: StartSession; onResume: () => void; navigate: (page: string) => void }) {
  const today = dateKey();
  const current = nextLesson(progress);
  const active = progress.activeSession;
  const completedToday = (progress.activity[today]?.sessions ?? 0) > 0;
  const learned = learnedCount(progress);
  const due = duePhrases(progress).length;
  const dailySteps = 3 + exerciseCount(progress.settings.goal);
  const stepsToday = progress.activity[today]?.steps ?? 0;
  const percent = completedToday ? 1 : Math.min(stepsToday / dailySteps, 1);
  const currentIntroduced = current.phrases.every((phrase) => !!progress.learned[phrase.id]);
  const recommendations = lessons.filter((lesson) => !progress.completedLessons.includes(lesson.id)).slice(0, 3);
  return <div className="page dashboard-page">
    <div className="page-heading"><div><div className="greeting-line"><h1>سلام{progress.settings.name ? `، ${progress.settings.name}` : '، خوش اومدی'} <span className="greeting-leaf"><Leaf size={25}/></span></h1></div><p>یه کم وقت برای خودت؛ بقیه‌اش کم‌کم درست می‌شه.</p></div><span className="level-pill"><span/>{levelById.get(current.levelId)?.title ?? 'انگلیسی از پایه'}</span></div>
    <section className="hero">
      <div className="hero-copy"><span className="hero-eyebrow"><Sprout size={16}/>یادگیری با قدم‌های کوچک</span><h2>انگلیسی،<br/>به اندازهٔ <span>امروزت.</span></h2><p>نه درس‌های طولانی، نه ترس از اشتباه.<br/>از صفر شروع کن و هر روز فقط چند دقیقه تمرین کن.</p>
        <button className="button button-primary hero-button" onClick={active ? onResume : () => onStart('lesson')}><Play size={17} fill="currentColor"/>{active ? 'ادامه از همان‌جایی که بودی' : `شروع ${faNumber(progress.settings.goal)} دقیقه‌ای امروز`}<ArrowLeft size={19}/></button>
        <span className="hero-note"><Check size={14}/>بدون دانش قبلی<em/>بدون فشار و جریمه</span>
      </div><div className="hero-art"><LearningIllustration/><span className="art-caption">از همین «سلام» شروع کنیم.</span></div>
    </section>
    <div className="dashboard-stats">
      <div><span className="stat-icon sage"><BookOpen size={21}/></span><div><strong>{faNumber(learned)} <small>عبارت</small></strong><span>باهاشون آشنا شدی</span></div></div>
      <div><span className="stat-icon peach"><Heart size={21}/></span><div><strong>{faNumber(practiceDays(progress))} <small>روز</small></strong><span>برای خودت وقت گذاشتی</span></div></div>
      <button onClick={() => navigate('review')}><span className="stat-icon yellow"><RotateCcw size={21}/></span><div><strong>{faNumber(due)} <small>مرور</small></strong><span>{due ? 'آماده برای یک یادآوری' : 'فعلاً مرور واجب نداری'}</span></div><ChevronLeft size={17}/></button>
    </div>
    <div className="today-grid">
      <section className="panel today-plan"><div className="section-heading"><h2><Target size={20}/>مسیر امروز</h2><span className="subtle-pill">فقط {faNumber(progress.settings.goal)} دقیقه</span></div>
        <button className="today-lesson" onClick={() => active ? onResume() : onStart('lesson', current.id)}><span className={`lesson-icon ${current.color}`}><LessonIcon icon={current.icon} size={27}/></span><span><small>درس {faNumber(lessons.indexOf(current) + 1)} · {current.subtitle}</small><strong>{current.title}</strong></span><span className="round-arrow"><ArrowLeft size={20}/></span></button>
        <div className="plan-steps"><div><span className={`plan-number ${currentIntroduced ? 'done' : 'current'}`}>{currentIntroduced ? <Check size={15}/> : '۱'}</span><div><strong>ببین و بشنو</strong><p>{faNumber(3)} عبارت کوتاه، با معنی و تلفظ فارسی</p></div><span className="plan-time">۱ دقیقه</span></div><div><span className="plan-number">۲</span><div><strong>یه تمرین کوچیک بکن</strong><p>معنی رو پیدا کن و جمله‌ها رو کنار هم بچین</p></div><span className="plan-time">{faNumber(progress.settings.goal === 3 ? 2 : progress.settings.goal === 5 ? 4 : 9)} دقیقه</span></div><div><span className={`plan-number ${completedToday ? 'done' : ''}`}>{completedToday ? <Check size={15}/> : '۳'}</span><div><strong>همین برای امروز کافیه</strong><p>پیشرفتت می‌مونه؛ فردا با یک مرور کوتاه ادامه بده</p></div><Heart size={17} className="plan-heart"/></div></div>
      </section>
      <section className="panel rhythm-panel"><div className="section-heading"><h2>هفتهٔ تو</h2><Leaf size={19}/></div><div className="rhythm-content"><div className="daily-ring" style={{ '--progress': `${percent * 100}%` } as React.CSSProperties}><div>{completedToday ? <CheckCheck size={31}/> : <Sprout size={31}/>}<span>{completedToday ? 'قدم امروزت رو برداشتی' : 'یه شروع کوچیک منتظرته'}</span></div></div><WeekDays progress={progress}/></div><p className="rhythm-note">{completedToday ? 'حتی اگر امروز فقط یک سؤال بوده، حساب می‌شود.' : 'لازم نیست هر روز عالی باشی. فقط هر وقت تونستی، برگرد.'}</p></section>
    </div>
    <section className="recommended-section"><div className="section-heading"><div><h2>قدم‌های بعدی</h2><p>چیزهایی که واقعاً به کارِ هر روزت می‌آیند.</p></div><button className="text-button" onClick={() => navigate('lessons')}>همهٔ درس‌ها<ChevronLeft size={17}/></button></div><div className="lesson-grid compact">{(recommendations.length ? recommendations : lessons.slice(0, 3)).map((lesson) => <LessonCard key={lesson.id} lesson={lesson} progress={progress} onStart={onStart} compact/>)}</div></section>
    <section className="tiny-banner"><span className="tiny-icon"><Coffee size={28} strokeWidth={1.5}/></span><div><h3>امروز حوصله‌ات کمه؟ اشکالی نداره.</h3><p>فقط یک سؤال بزن و برو. همون هم یک قدمه.</p></div><button className="button button-outline" onClick={() => onStart('tiny')}>فقط ۱ سؤال<ArrowLeft size={17}/></button></section>
    <div className="dashboard-footer"><Reassurance/></div>
  </div>;
}


export function WeekDays({ progress }: { progress: Progress }) {
  const today = dateKey();
  return <div className="week-days">{lastSevenDays().map((day) => {
    const done = (progress.activity[day]?.steps ?? 0) > 0;
    const weekday = new Intl.DateTimeFormat('fa-IR', { weekday: 'narrow' }).format(new Date(`${day}T12:00:00`));
    return <div key={day} className={`week-day ${day === today ? 'today' : ''} ${done ? 'done' : ''}`} title={`${shortDate(day)}: ${done ? 'تمرین انجام شد' : 'بدون تمرین'}`}><span>{weekday}</span><span className="day-dot">{done ? <Check size={13}/> : day === today ? <span/> : '·'}</span><small>{day === today ? 'امروز' : '\u00a0'}</small></div>;
  })}</div>;
}

export function LessonCard({ lesson, progress, onStart, compact = false }: { lesson: Lesson; progress: Progress; onStart: StartSession; compact?: boolean }) {
  const completed = progress.completedLessons.includes(lesson.id);
  const learned = lesson.phrases.filter((phrase) => progress.learned[phrase.id]).length;
  const current = nextLesson(progress).id === lesson.id;
  return <button className={`lesson-card ${compact ? 'compact' : ''} ${current ? 'is-current' : ''}`} onClick={() => onStart('lesson', lesson.id)}>
    <div className="lesson-card-top"><span className={`lesson-icon ${lesson.color}`}><LessonIcon icon={lesson.icon}/></span><span className={`lesson-state ${completed ? 'completed' : current ? 'current' : ''}`}>{completed ? <><Check size={13}/>انجام‌شده</> : current ? 'قدم بعدی تو' : `درس ${faNumber(lessons.indexOf(lesson) + 1)}`}</span></div>
    <h3>{lesson.title}</h3><p>{lesson.subtitle}</p><div className="lesson-card-bottom"><span><BookOpen size={14}/>{faNumber(lesson.phrases.length)} عبارت</span><span>{completed ? 'دوباره تمرین کن' : learned ? `${faNumber(learned)} عبارت آشنا` : 'از صفرِ صفر'}<ArrowLeft size={16}/></span></div>
    {!compact && learned > 0 && <div className="progress-track lesson-progress"><span style={{ width: `${learned / lesson.phrases.length * 100}%` }}/></div>}
  </button>;
}

export function LessonsPage({ progress, onStart, membership, onAccount }: { progress: Progress; onStart: StartSession; membership: Membership; onAccount: () => void }) {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const filtered = lessonCatalog.filter((lesson) => {
    const full = lessonById.get(lesson.id);
    const haystack = `${lesson.title} ${lesson.subtitle} ${full?.phrases.map((p) => `${p.en} ${p.fa}`).join(' ') ?? ''}`.toLowerCase();
    const matches = haystack.includes(query.trim().toLowerCase());
    const levelMatches = levelFilter === 'all' || lesson.levelId === levelFilter;
    return matches && levelMatches && (filter === 'all' || (filter === 'done' ? progress.completedLessons.includes(lesson.id) : !progress.completedLessons.includes(lesson.id)));
  });
  return <div className="page"><PageHeading eyebrow="یک مسیر ساده، از صفر" title="هر درس، یک قدم کوچک." description="لازم نیست چیزی از قبل بلد باشی. هر درس را که دوست داری انتخاب کن."/>
    <div className="info-banner"><BookOpen size={22}/><div><strong>{faNumber(lessonCatalog.length)} درس کوتاه · {faNumber(catalogPhraseIds.size)} عبارت کاربردی</strong><span>مبتدی ۱ رایگان است؛ سطح‌های دیگر را مدیر برایت فعال می‌کند. بدون عجله و بدون جریمه.</span></div><span className="info-goal"><Clock3 size={16}/>{faNumber(progress.settings.goal)} دقیقه در روز</span></div>
    <div className="level-strip" aria-label="سطح‌های یادگیری"><button className={levelFilter === 'all' ? 'active' : ''} aria-pressed={levelFilter === 'all'} onClick={() => setLevelFilter('all')}>همهٔ سطح‌ها</button>{levels.map((level) => <button key={level.id} className={levelFilter === level.id ? 'active' : ''} aria-pressed={levelFilter === level.id} onClick={() => setLevelFilter(level.id)}>{membership.hasLevel(level.id) ? null : <Lock size={12}/>} {level.title}</button>)}</div>
    <div className="list-toolbar"><div className="segmented-control" aria-label="فیلتر درس‌ها">{[['all', 'همهٔ درس‌ها'], ['new', 'هنوز نخوانده‌ام'], ['done', 'انجام‌شده']].map(([id, label]) => <button key={id} aria-pressed={filter === id} className={filter === id ? 'active' : ''} onClick={() => setFilter(id)}>{label}</button>)}</div><label className="search-field"><Search size={18}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="جست‌وجوی موضوع یا عبارت…" aria-label="جست‌وجوی درس‌ها"/></label></div>
    {filtered.length ? <div className="level-groups">{(levelFilter === 'all' ? levels.map((l) => l.id) : [levelFilter]).map((levelId) => { const items = filtered.filter((l) => l.levelId === levelId); if (!items.length) return null; const level = levelById.get(levelId)!; const unlocked = membership.hasLevel(levelId); return <section key={levelId} className="level-group"><div className="level-group-heading"><div><h2>{level.title}</h2><p>{level.description}</p></div><span className={unlocked ? 'level-open' : 'level-locked'}>{unlocked ? 'باز' : 'نیاز به فعال‌سازی'}</span></div><div className="lesson-grid full">{items.map((meta) => { const lesson = lessonById.get(meta.id); return lesson ? <LessonCard key={meta.id} lesson={lesson} progress={progress} onStart={onStart}/> : <button key={meta.id} className="lesson-card locked-lesson" onClick={onAccount}><div className="lesson-card-top"><span className={`lesson-icon ${meta.color}`}><LessonIcon icon={meta.icon}/></span><span className="lesson-state"><Lock size={13}/>قفل</span></div><h3>{meta.title}</h3><p>{meta.subtitle}</p><div className="lesson-card-bottom"><span><BookOpen size={14}/>{faNumber(meta.phraseIds.length)} عبارت</span><span>فعال‌سازی از طرف مدیر<UserRound size={16}/></span></div></button>; })}</div></section>; })}</div> : <EmptyState title={filter === 'done' ? 'اولین درست منتظر توست.' : 'اینجا چیزی پیدا نشد.'} description={filter === 'done' ? 'هر وقت یک درس را تا آخر بروی، اینجا نشانش می‌دهیم.' : 'یک واژهٔ دیگر امتحان کن یا همهٔ درس‌ها را ببین.'} action="دیدن همهٔ درس‌ها" onAction={() => { setFilter('all'); setQuery(''); }}/>}
    <div className="audio-help"><Ear size={17}/><p>تلفظ‌ها با صدای انگلیسی مرورگر پخش می‌شوند. اگر صدا در دسترس نبود، راهنمای فارسیِ تلفظ همیشه کنار عبارت است.</p></div>
  </div>;
}

export function PageHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="page-heading inner-page-heading"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div></div>;
}

export function ReviewPage({ progress, speech, onStart }: { progress: Progress; speech: Speech; onStart: StartSession }) {
  const [showAll, setShowAll] = useState(false);
  const [query, setQuery] = useState('');
  const due = duePhrases(progress);
  const learnedIds = Object.keys(progress.learned);
  const visible = (showAll ? learnedIds.map((id) => allPhrases.find((phrase) => phrase.id === id)).filter((p): p is Phrase => !!p) : due).filter((phrase) => `${phrase.en} ${phrase.fa}`.toLowerCase().includes(query.toLowerCase().trim()));
  const nextDue = Object.values(progress.learned).map((memory) => memory.due).sort()[0];
  return <div className="page"><PageHeading eyebrow="یادآوری، نه امتحان" title="چیزهای آشنا رو دوباره ببین." description="فاصله‌دار مرور می‌کنیم تا عبارت‌ها کم‌کم در ذهنت بمانند؛ نه با حفظ‌کردنِ یک‌باره."/>
    <section className="review-hero"><div className="review-hero-icon"><RotateCcw size={35} strokeWidth={1.5}/></div><div><span className="eyebrow">مرورهای امروز</span><h2>{due.length ? `${faNumber(due.length)} عبارت آمادهٔ یادآوری‌اند.` : learnedIds.length ? 'فعلاً مرور واجبی نداری.' : 'اول یک قدم، بعد یک مرور.'}</h2><p>{due.length ? 'چند سؤال ساده؛ اگر یادت نبود، با هم دوباره می‌بینیم.' : learnedIds.length ? `نزدیک‌ترین مرور: ${shortDate(nextDue)}. اگر دوست داری، می‌توانی مرور آزاد داشته باشی.` : 'بعد از اولین تمرین، عبارت‌های آشنا اینجا جمع می‌شوند.'}</p></div><button className="button button-primary" onClick={() => onStart(learnedIds.length ? 'review' : 'lesson')}>{due.length ? 'شروع مرور' : learnedIds.length ? 'مرور آزاد' : 'شروع اولین درس'}<ArrowLeft size={18}/></button></section>
    <div className="review-explainer"><span><span className="mini-number">۱</span>آشنا می‌شی</span><ChevronLeft size={17}/><span><span className="mini-number">۲</span>فردا مرور می‌کنی</span><ChevronLeft size={17}/><span><span className="mini-number">۳</span>فاصله‌ها بیشتر می‌شه</span><p>با پاسخ درست، فاصلهٔ مرور بیشتر می‌شود. اگر سخت بود، زودتر دوباره می‌بینیمش.</p></div>
    <div className="list-toolbar"><div className="segmented-control"><button className={!showAll ? 'active' : ''} aria-pressed={!showAll} onClick={() => setShowAll(false)}>آمادهٔ مرور <span>{faNumber(due.length)}</span></button><button className={showAll ? 'active' : ''} aria-pressed={showAll} onClick={() => setShowAll(true)}>همهٔ عبارت‌های آشنا <span>{faNumber(learnedIds.length)}</span></button></div>{learnedIds.length > 0 && <label className="search-field"><Search size={18}/><input placeholder="پیدا کردن عبارت…" aria-label="جست‌وجوی عبارت‌ها" value={query} onChange={(event) => setQuery(event.target.value)}/></label>}</div>
    {visible.length ? <div className="phrase-list">{visible.map((phrase) => <div className="phrase-row" key={phrase.id}><AudioButton phrase={phrase} speech={speech}/><div className="phrase-row-text"><strong dir="ltr">{phrase.en}</strong><span>{phrase.fa}</span></div><span className={`review-status ${progress.learned[phrase.id]?.due <= dateKey() ? 'due' : ''}`}>{progress.learned[phrase.id]?.due <= dateKey() ? 'آمادهٔ مرور' : `مرور: ${shortDate(progress.learned[phrase.id].due)}`}</span></div>)}</div> : <EmptyState title={query ? 'این عبارت را پیدا نکردیم.' : showAll ? 'کلمه‌ها کم‌کم از راه می‌رسند.' : 'ذهنت فعلاً می‌تواند استراحت کند.'} description={query ? 'املای عبارت را بررسی کن یا جست‌وجو را پاک کن.' : learnedIds.length ? 'مرور بعدی را برایت نگه می‌داریم. وقفه افتادن هم اشکالی ندارد.' : 'با درس «سلام و احوال‌پرسی» شروع کن؛ فقط چند دقیقه طول می‌کشد.'} action={query ? 'پاک‌کردن جست‌وجو' : learnedIds.length ? 'یک مرور آزاد' : 'شروع اولین درس'} onAction={() => query ? setQuery('') : onStart(learnedIds.length ? 'review' : 'lesson')}/>}
    <Reassurance/>
  </div>;
}

export function ProgressPage({ progress, onStart }: { progress: Progress; onStart: StartSession }) {
  const learned = learnedCount(progress);
  const days = practiceDays(progress);
  const week = lastSevenDays();
  const max = Math.max(5, ...week.map((day) => progress.activity[day]?.steps ?? 0));
  const milestones = [
    { title: 'اولین قدم', description: 'یک تمرین را شروع کردی', done: learned > 0, icon: Sprout },
    { title: 'یک سلامِ تازه', description: 'اولین درس را تمام کردی', done: progress.completedLessons.length > 0, icon: MessageCircle },
    { title: 'یک دوستِ کوچک', description: 'با ۱۰ عبارت آشنا شدی', done: learned >= 10, icon: Heart },
    { title: 'وقت برای خودت', description: 'در ۷ روز مختلف تمرین کردی', done: days >= 7, icon: Coffee },
  ];
  return <div className="page"><PageHeading eyebrow="فقط با دیروزِ خودت مقایسه کن" title="این، مسیرِ تو تا اینجاست." description="اینجا تعداد روزهای پشت‌سرهم مهم نیست؛ هر روزی که برای خودت گذاشتی مهم است."/>
    <div className="progress-stat-grid"><div className="panel"><span className="stat-icon sage"><BookOpen size={23}/></span><strong>{faNumber(learned)}<small> / {faNumber(catalogPhraseIds.size)}</small></strong><span>عبارت آشنا</span><div className="progress-track"><span style={{ width: `${learned / catalogPhraseIds.size * 100}%` }}/></div></div><div className="panel"><span className="stat-icon peach"><Heart size={23}/></span><strong>{faNumber(days)}</strong><span>روز تمرین، با ریتم خودت</span></div><div className="panel"><span className="stat-icon yellow"><CheckCheck size={23}/></span><strong>{faNumber(progress.completedLessons.length)}<small> / {faNumber(lessonCatalog.length)}</small></strong><span>درس کامل‌شده</span></div></div>
    <div className="progress-page-grid"><section className="panel activity-panel"><div className="section-heading"><h2>هفتهٔ اخیر</h2><span className="subtle-pill">قدم‌های کوچک هم حساب‌اند</span></div><div className="activity-chart" role="img" aria-label={week.map((day) => `${shortDate(day)}: ${faNumber(progress.activity[day]?.steps ?? 0)} قدم`).join('، ')}>{week.map((day) => <div key={day}><span className="bar-count">{faNumber(progress.activity[day]?.steps ?? 0)}</span><div className="chart-bar-track"><span className={`chart-bar ${day === dateKey() ? 'today' : ''}`} style={{ height: `${Math.max(4, (progress.activity[day]?.steps ?? 0) / max * 100)}%` }}/></div><span>{new Intl.DateTimeFormat('fa-IR', { weekday: 'short' }).format(new Date(`${day}T12:00:00`))}</span></div>)}</div><p className="chart-caption">تعداد قدم‌های انجام‌شده، نه دقیقه و نه نمره.</p></section><section className="panel milestones-panel"><div className="section-heading"><h2>چیزهای کوچکِ ارزشمند</h2><Sparkles size={19}/></div>{milestones.map(({ title, description, done, icon: Icon }) => <div key={title} className={`milestone ${done ? 'earned' : ''}`}><span><Icon size={23}/></span><div><strong>{title}</strong><p>{description}</p></div>{done && <Check size={18}/>}</div>)}</section></div>
    <section className="panel history-panel"><div className="section-heading"><h2>آخرین تمرین‌ها</h2><Clock3 size={19}/></div>{progress.history.length ? <div className="history-list">{progress.history.slice(0, 8).map((item) => <div className="history-row" key={item.id}><span className="history-check"><Check size={18}/></span><div><strong>{item.title}</strong><span>{new Intl.DateTimeFormat('fa-IR', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(item.date))}</span></div><span>{faNumber(item.phrases)} عبارت · {item.mode === 'tiny' ? 'یک قدم کوچک' : item.mode === 'review' ? 'مرور' : 'درس'}</span></div>)}</div> : <EmptyState title="داستان تو از اولین قدم شروع می‌شه." description="هر تمرینی که تا آخر بروی، اینجا ثبت می‌شود." action="بزن بریم" onAction={() => onStart('lesson')}/>}</section>
    <div className="growth-note"><SmallPlant/><div><h3>رشد کردن همیشه با چشم دیده نمی‌شه.</h3><p>همین که دوباره برگشتی، یعنی داری راه خودت رو پیدا می‌کنی.</p></div></div>

  </div>;
}
