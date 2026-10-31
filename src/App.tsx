import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, BookOpen, CalendarDays, ChartNoAxesCombined, Check, ChevronLeft, CircleHelp, House, Leaf, RefreshCw, RotateCcw, Settings2, ShieldCheck, Sparkles, UserRound, X } from 'lucide-react';
import { lessonById } from './data/curriculum';
import { createSession, duePhrases, faNumber, nextLesson } from './lib/learning';
import type { Progress, Session, SessionMode } from './lib/learning';
import { useProgress } from './hooks/useProgress';
import { useSpeech } from './hooks/useSpeech';
import { Dashboard, LessonsPage, ProgressPage, ReviewPage } from './components/Pages';
import { Completion, LessonSession } from './components/LessonSession';
import { AudioButton, Logo, Modal } from './components/UI';
import { Settings } from './components/Settings';
import { SmallPlant } from './components/Illustrations';
import { useAppUpdate } from './hooks/useAppUpdate';
import { useInstallApp } from './hooks/useInstallApp';
import { InstallModal, UpdateSection } from './components/AppMaintenance';
import { App as CapApp } from '@capacitor/app';
import { isNativeApp } from './lib/native';
import { useMembership } from './hooks/useMembership';
import { AccountModal } from './components/Account';
import { AdminPage } from './components/Admin';
import { initReminder } from './lib/reminder';

type Page = 'today' | 'lessons' | 'review' | 'progress' | 'session' | 'admin';
const pages = [
  { id: 'today' as const, label: 'امروز', icon: House },
  { id: 'lessons' as const, label: 'درس‌ها', icon: BookOpen },
  { id: 'review' as const, label: 'مرور من', icon: RotateCcw },
  { id: 'progress' as const, label: 'پیشرفت من', icon: ChartNoAxesCombined },
];
const getPage = (): Page => {
  const hash = window.location.hash.slice(1);
  if (hash === 'admin') return 'admin';
  return pages.some((page) => page.id === hash) ? hash as Page : 'today';
};

export default function App() {
  const { progress, setProgress, storageError, initialNotice } = useProgress();
  const speech = useSpeech(progress.settings.slowAudio);
  const update = useAppUpdate();
  const installer = useInstallApp();
  const membership = useMembership(setProgress);
  const [accountOpen, setAccountOpen] = useState(false);
  const [maintenanceOpen, setMaintenanceOpen] = useState(false);
  const [installOpen, setInstallOpen] = useState(false);
  const [page, setPage] = useState<Page>(getPage);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [pending, setPending] = useState<{ mode: SessionMode; lessonId?: string } | null>(null);
  const [completed, setCompleted] = useState<Session | null>(null);
  const [toast, setToast] = useState(initialNotice);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const due = duePhrases(progress).length;
  const preview = previewId ? lessonById.get(previewId) : null;

  useEffect(() => {
    const change = () => { setPage(getPage()); setCompleted(null); window.scrollTo({ top: 0, behavior: 'instant' }); };
    window.addEventListener('hashchange', change);
    return () => window.removeEventListener('hashchange', change);
  }, []);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [page]);
  useEffect(() => {
    const openShortcut = () => {
      if (window.location.hash === '#install') setInstallOpen(true);
      if (window.location.hash === '#update') setMaintenanceOpen(true);
    };
    openShortcut();
    window.addEventListener('hashchange', openShortcut);
    return () => window.removeEventListener('hashchange', openShortcut);
  }, []);
  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);
  useEffect(() => { void initReminder(progress.settings.reminder).catch(() => {}); }, []);
  useEffect(() => { if (page === 'admin' && membership.ready && membership.user?.role !== 'admin') navigate('today'); }, [page, membership.ready, membership.user]);
  useEffect(() => { if (membership.ready && progress.activeSession?.lessonId && !membership.canLesson(progress.activeSession.lessonId)) { setProgress((current) => ({ ...current, activeSession: null })); if (page === 'session') navigate('today'); } }, [membership.ready, membership.revision, progress.activeSession?.lessonId, page]);

  function notify(message: string) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(''), 5500);
  }
  function navigate(next: string) {
    setPage(next as Page);
    setCompleted(null);
    window.location.hash = next;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  function launch(mode: SessionMode, lessonId?: string) {
    if (mode === 'lesson' && lessonId && !membership.canLesson(lessonId)) { setAccountOpen(true); notify('این سطح هنوز فعال نیست؛ از حساب کاربری، دسترسی را بررسی کن.'); return; }
    speech.stop();
    setCompleted(null);
    setPreviewId(null);
    setPending(null);
    setProgress((current: Progress) => ({ ...current, activeSession: createSession(mode, current, lessonId) }));
    setPage('session');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  function start(mode: SessionMode, lessonId?: string) {
    if (progress.activeSession) { setPreviewId(null); setPending({ mode, lessonId }); return; }
    if (mode === 'lesson' && lessonId) { setPreviewId(lessonId); return; }
    launch(mode, lessonId);
  }
  function resume() {
    setCompleted(null);
    setPending(null);
    setPage('session');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  useEffect(() => {
    if (!isNativeApp) return;
    const listener = CapApp.addListener('backButton', () => {
      if (accountOpen) setAccountOpen(false);
      else if (settingsOpen) setSettingsOpen(false);
      else if (installOpen) setInstallOpen(false);
      else if (maintenanceOpen) setMaintenanceOpen(false);
      else if (helpOpen) setHelpOpen(false);
      else if (previewId) setPreviewId(null);
      else if (pending) setPending(null);
      else if (page === 'session') navigate('today');
      else if (page !== 'today') navigate('today');
      else void CapApp.exitApp();
    });
    return () => { void listener.then((handle) => handle.remove()); };
  }, [settingsOpen, installOpen, maintenanceOpen, helpOpen, previewId, pending, page, accountOpen]);
  const pageLabel = pages.find((item) => item.id === page)?.label ?? 'تمرین امروز';

  return <>
    <a className="skip-link" href="#main-content" onClick={(event) => { event.preventDefault(); document.getElementById('main-content')?.focus(); }}>رفتن به محتوای اصلی</a>
    {page === 'session' && progress.activeSession && (!progress.activeSession.lessonId || membership.canLesson(progress.activeSession.lessonId)) ? <LessonSession session={progress.activeSession} progress={progress} speech={speech} setProgress={setProgress} onExit={() => navigate('today')} onComplete={setCompleted}/> : completed ? <Completion session={completed} storageError={storageError} onHome={() => navigate('today')} onLessons={() => navigate('lessons')}/> : <div className="app-shell">
      <aside className="sidebar"><button className="brand-button" aria-label="قدم؛ صفحهٔ امروز" onClick={() => navigate('today')}><Logo/></button><span className="nav-caption">مسیر کوچکِ یادگیری تو</span><nav aria-label="منوی اصلی" className="desktop-nav">{pages.map(({ id, label, icon: Icon }) => <button key={id} className={page === id ? 'active' : ''} aria-current={page === id ? 'page' : undefined} onClick={() => navigate(id)}><Icon size={21} strokeWidth={1.7}/><span>{label}</span>{id === 'review' && due > 0 ? <span className="nav-badge">{faNumber(due)}</span> : page === id ? <span className="nav-active-dot"/> : null}</button>)}</nav>
        <div className="sidebar-bottom"><div className="sidebar-note"><SmallPlant/><h3>آهسته هم، جلو رفتنه.</h3><p>قرار نیست شبیه کسی باشی.<br/>این مسیر، فقط برای خودته.</p></div><button className="sidebar-settings" onClick={() => setSettingsOpen(true)}><Settings2 size={19}/>تنظیمات<ChevronLeft size={16}/></button><span className="local-note"><ShieldCheck size={14}/>پیشرفتت در همین دستگاه می‌مونه</span></div>
      </aside>
      <div className="main-shell"><header className="topbar"><div className="desktop-breadcrumb"><span>فضای یادگیری تو</span><ChevronLeft size={14}/><strong>{pageLabel}</strong></div><button className="mobile-brand brand-button" onClick={() => navigate('today')} aria-label="صفحهٔ امروز"><Logo small/></button><div className="topbar-actions"><span className="date-label"><CalendarDays size={16}/>{new Intl.DateTimeFormat('fa-IR', { day: 'numeric', month: 'long' }).format(new Date())}</span><span className="topbar-divider"/><button className={`icon-button update-button ${update.status === 'available' ? 'has-update' : ''}`} title="به‌روزرسانی برنامه" aria-label="به‌روزرسانی برنامه" onClick={() => setMaintenanceOpen(true)}><RefreshCw size={19}/>{update.status === 'available' && <i/>}</button><button className="icon-button help-button" title="قدم چطور کار می‌کند؟" aria-label="راهنمای برنامه" onClick={() => setHelpOpen(true)}><CircleHelp size={20}/></button><button className="icon-button mobile-settings" aria-label="تنظیمات" onClick={() => setSettingsOpen(true)}><Settings2 size={20}/></button><button className="icon-button" aria-label="حساب کاربری و دسترسی‌ها" title="حساب و سطح‌ها" onClick={() => setAccountOpen(true)}><UserRound size={20}/></button><button className="profile-button" aria-label="تنظیمات شخصی" onClick={() => setSettingsOpen(true)}>{progress.settings.name.trim().slice(0, 1) || <Leaf size={20}/>}</button></div></header>
        <main id="main-content" tabIndex={-1}>
          {storageError && <div className="storage-warning" role="alert">ذخیره‌سازی مرورگر در دسترس نیست. برای از دست نرفتن پیشرفت، از تنظیمات پشتیبان بگیر.</div>}
          {page === 'today' && <Dashboard progress={progress} onStart={start} onResume={resume} navigate={navigate}/>}
          {page === 'lessons' && <LessonsPage progress={progress} onStart={start} membership={membership} onAccount={() => setAccountOpen(true)}/>}
          {page === 'admin' && membership.user?.role === 'admin' && <AdminPage notify={notify} onExit={() => navigate('today')}/>}
          {page === 'review' && <ReviewPage progress={progress} speech={speech} onStart={start}/>}
          {page === 'progress' && <ProgressPage progress={progress} onStart={start}/>}
          <footer className="app-footer"><span>قَدَم · انگلیسی، کم‌کم</span><span>با احترام به ریتمِ تو <HeartLeaf/></span></footer>
        </main>
      </div>
      <nav className="mobile-nav" aria-label="منوی اصلی موبایل">{pages.map(({ id, label, icon: Icon }) => <button key={id} className={page === id ? 'active' : ''} aria-current={page === id ? 'page' : undefined} onClick={() => navigate(id)}><span><Icon size={21}/>{id === 'review' && due > 0 && <i/>}</span>{label}</button>)}</nav>
    </div>}
    {settingsOpen && <Settings progress={progress} setProgress={setProgress} onClose={() => setSettingsOpen(false)} notify={notify} update={update} onInstall={() => { setSettingsOpen(false); setInstallOpen(true); }} onAccount={() => { setSettingsOpen(false); setAccountOpen(true); }}/>
    }
    {accountOpen && <AccountModal membership={membership} onClose={() => setAccountOpen(false)} onAdmin={() => navigate('admin')} notify={notify}/>}
    {maintenanceOpen && <Modal title="به‌روزرسانی قدم" onClose={() => setMaintenanceOpen(false)}><UpdateSection update={update}/><button className="button button-outline full-width" onClick={() => { setMaintenanceOpen(false); setInstallOpen(true); }}>نصب روی موبایل</button></Modal>}
    {installOpen && <InstallModal installer={installer} onClose={() => setInstallOpen(false)}/>}
    {preview && <Modal title={preview.title} onClose={() => setPreviewId(null)} className="lesson-preview-modal"><div className="preview-meta"><span><BookOpen size={16}/>{faNumber(preview.phrases.length)} عبارت کاربردی</span><span><Sparkles size={16}/>از صفرِ صفر</span></div><p className="modal-description">اول با عبارت‌ها آشنا می‌شی، بعد چند تمرین ساده انجام می‌دی. نه امتحان، نه عجله.</p><div className="preview-phrases">{preview.phrases.map((phrase) => <div key={phrase.id}><AudioButton phrase={phrase} speech={speech}/><div><strong dir="ltr">{phrase.en}</strong><span>{phrase.fa}</span>{progress.settings.showPronunciation && <small>{phrase.pronunciation}</small>}</div></div>)}</div>{!speech.available && speech.ready && <p className="audio-notice">پخش صدا در این مرورگر در دسترس نیست؛ راهنمای نوشتاری تلفظ را داریم.</p>}<button className="button button-primary full-width" onClick={() => launch('lesson', preview.id)}>شروع {faNumber(progress.settings.goal)} دقیقه تمرین<ArrowLeft size={18}/></button><small className="preview-footnote">هر وقت خواستی، می‌توانی ذخیره کنی و بیرون بروی.</small></Modal>}
    {pending && <Modal title="یه تمرین نیمه‌تمام داری" onClose={() => setPending(null)}><p className="modal-description">«{progress.activeSession?.title}» را تا اینجا ذخیره کرده‌ای. دوست داری ادامه‌اش بدهی یا تمرین تازه‌ای شروع کنی؟</p><div className="pending-note"><Leaf size={21}/><p>قدم‌هایی که تا الان برداشتی ذخیره شده‌اند. با شروع تمرین جدید، فقط بخش ناتمامِ قبلی جایگزین می‌شود.</p></div><div className="modal-actions"><button className="button button-primary" onClick={resume}>ادامهٔ تمرین قبلی<ArrowLeft size={18}/></button><button className="button button-outline" onClick={() => launch(pending.mode, pending.lessonId)}>شروع تمرین تازه</button></div></Modal>}
    {helpOpen && <Modal title="کم‌کم، با هم یاد می‌گیریم" onClose={() => setHelpOpen(false)}><p className="modal-description">قدم برای روزهایی ساخته شده که انرژی یا حوصلهٔ زیادی نداری. لازم نیست زبان‌آموز کاملی باشی.</p><div className="help-steps"><div><span>۱</span><div><h3>ببین، بشنو، بفهم</h3><p>هر درس فقط چند عبارت کوتاه دارد. معنی و راهنمای فارسیِ تلفظ کنارشان است.</p></div></div><div><span>۲</span><div><h3>با اشتباه‌کردن تمرین کن</h3><p>جواب درست را انتخاب کن یا کلمه‌ها را بچین. اگر اشتباه بود، جواب را با هم می‌بینیم؛ امتیازی کم نمی‌شود.</p></div></div><div><span>۳</span><div><h3>ولش کن، بعداً برگرد</h3><p>پیشرفتت ذخیره می‌شود. مرورهای کوتاه در روزهای بعد کمک می‌کنند عبارت‌ها یادت بمانند.</p></div></div></div><div className="help-kind-note"><Leaf size={21}/><p>مدرک تحصیلی‌ات نقطهٔ شروع یادگیری زبان را تعیین نمی‌کند. از هر سطحی که هستی، می‌توانی شروع کنی.</p></div><button className="button button-primary full-width" onClick={() => { setHelpOpen(false); progress.activeSession ? resume() : start('lesson', nextLesson(progress).id); }}>خب، یک قدم برمی‌داریم<ArrowLeft size={18}/></button></Modal>}
    {toast && <div className="toast" role="status"><Check size={18}/><span>{toast}</span><button aria-label="بستن پیام" onClick={() => setToast('')}><X size={17}/></button></div>}
  </>;
}

function HeartLeaf() { return <Leaf size={13}/>; }
