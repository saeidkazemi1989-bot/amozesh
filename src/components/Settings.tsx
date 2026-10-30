import { useRef, useState } from 'react';
import { Check, Download, HardDrive, ShieldCheck, Smartphone, Trash2, Upload } from 'lucide-react';
import { createProgress, dateKey, faNumber, parseProgress } from '../lib/learning';
import type { Goal, Progress } from '../lib/learning';
import { Modal, Toggle } from './UI';
import { UpdateSection } from './AppMaintenance';
import type { AppUpdate } from '../hooks/useAppUpdate';

export function Settings({ progress, setProgress, onClose, notify, update, onInstall }: { progress: Progress; setProgress: React.Dispatch<React.SetStateAction<Progress>>; onClose: () => void; notify: (message: string) => void; update: AppUpdate; onInstall: () => void }) {
  const [confirmReset, setConfirmReset] = useState(false);
  const [imported, setImported] = useState<Progress | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const updateSettings = (patch: Partial<Progress['settings']>) => setProgress((current) => ({ ...current, settings: { ...current.settings, ...patch } }));

  function exportData() {
    const url = URL.createObjectURL(new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `ghadam-progress-${dateKey()}.json`;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    notify('فایل پشتیبان پیشرفتت آماده شد.');
  }

  async function importData(file?: File) {
    if (!file) return;
    if (file.size > 2_000_000) { notify('این فایل مناسب نیست؛ فایل پشتیبان JSON کمتر از ۲ مگابایت انتخاب کن.'); return; }
    try {
      const data = parseProgress(await file.text());
      if (data) setImported(data);
      else notify('این فایل، پشتیبان معتبرِ قدم نیست. پیشرفت فعلی‌ات تغییری نکرد.');
    } catch { notify('خواندن فایل ممکن نشد. فایل پشتیبان را دوباره انتخاب کن.'); }
    if (fileInput.current) fileInput.current.value = '';
  }

  return <Modal title="به شیوهٔ خودت" onClose={onClose} className="settings-modal"><p className="modal-description">اینجا تو تصمیم می‌گیری؛ کم‌کردن تمرین هم یک انتخاب درست است.</p>
    <section className="settings-section"><h3>زمانِ روزانه‌ات</h3><p>یک زمان تقریبی، نه یک ضرب‌الاجل.</p><div className="goal-options">{([3, 5, 10] as Goal[]).map((goal) => <button key={goal} className={progress.settings.goal === goal ? 'selected' : ''} aria-pressed={progress.settings.goal === goal} onClick={() => updateSettings({ goal })}><strong>{faNumber(goal)}<small> دقیقه</small></strong><span>{goal === 3 ? 'خیلی سبک' : goal === 5 ? 'متعادل · پیشنهادی' : 'کمی بیشتر'}</span>{progress.settings.goal === goal && <Check size={15}/>}</button>)}</div><small className="settings-hint">تغییر زمان روی تمرین‌های بعدی اعمال می‌شود.</small></section>
    <section className="settings-section"><label className="name-setting"><span>دوست داری چی صدات کنیم؟ <small>(اختیاری)</small></span><input maxLength={40} value={progress.settings.name} placeholder="اسم کوچکت" onChange={(event) => updateSettings({ name: event.target.value })}/></label><Toggle checked={progress.settings.showPronunciation} onChange={() => updateSettings({ showPronunciation: !progress.settings.showPronunciation })} label="راهنمای فارسیِ تلفظ" description="خواندن تقریبی عبارت‌ها با حروف فارسی، زیر بخش یادگیری."/><Toggle checked={progress.settings.slowAudio} onChange={() => updateSettings({ slowAudio: !progress.settings.slowAudio })} label="پخش آهسته‌تر صدا" description="کمی آرام‌تر بشنو تا کلمه‌ها را راحت‌تر تشخیص بدهی."/></section>
    <UpdateSection update={update}/>
    <section className="settings-section"><button className="button button-outline full-width" onClick={onInstall}><Smartphone size={17}/>نصب روی موبایل و راهنمای افزودن به صفحهٔ اصلی</button></section>
    <section className="settings-section"><h3>پیشرفتت، پیش خودت</h3><div className="privacy-note"><ShieldCheck size={22}/><p>بدون حساب کاربری. پیشرفت فقط در همین مرورگر ذخیره می‌شود. برای نگهداری یا انتقال به دستگاه دیگر، فایل پشتیبان بگیر. پخش صدا از قابلیت انگلیسی مرورگر استفاده می‌کند.</p></div><div className="backup-actions"><button className="button button-outline" onClick={exportData}><Download size={17}/>دریافت پشتیبان</button><button className="button button-outline" onClick={() => fileInput.current?.click()}><Upload size={17}/>بازگردانی پشتیبان</button><input ref={fileInput} type="file" accept=".json,application/json" className="sr-only" tabIndex={-1} aria-label="انتخاب فایل پشتیبان" onChange={(event) => void importData(event.target.files?.[0])}/></div>
      {imported && <div className="inline-confirm"><strong>پیشرفت فعلی با فایل پشتیبان جایگزین شود؟</strong><p>فایل شامل {faNumber(Object.keys(imported.learned).length)} عبارت آشنا و {faNumber(imported.completedLessons.length)} درس کامل‌شده است.</p><div><button className="button button-primary button-small" onClick={() => { setProgress(imported); setImported(null); notify('پیشرفتت از فایل پشتیبان بازگردانی شد.'); onClose(); }}>بله، بازگردانی کن</button><button className="text-button" onClick={() => setImported(null)}>انصراف</button></div></div>}
      {!confirmReset ? <button className="text-button danger-text" onClick={() => setConfirmReset(true)}><Trash2 size={15}/>پاک‌کردن پیشرفت و شروع تازه</button> : <div className="inline-confirm danger-confirm"><strong>همهٔ عبارت‌ها و سابقهٔ تمرین پاک شوند؟</strong><p>این کار برگشت‌پذیر نیست. اگر لازم داری، اول پشتیبان بگیر.</p><div><button className="button button-danger button-small" onClick={() => { setProgress(createProgress()); notify('یک شروع تازه آماده است. هر وقت خواستی، بردار اولین قدم را.'); onClose(); }}>بله، از صفر شروع می‌کنم</button><button className="text-button" onClick={() => setConfirmReset(false)}>نه، نگهش دار</button></div></div>}
    </section><div className="settings-footer"><HardDrive size={14}/>تنظیمات به‌صورت خودکار در همین دستگاه ذخیره می‌شوند.</div>
  </Modal>;
}
