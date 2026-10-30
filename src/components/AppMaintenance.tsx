import { ArrowLeft, Check, Download, RefreshCw, ShieldCheck, Smartphone } from 'lucide-react';
import type { AppUpdate } from '../hooks/useAppUpdate';
import type { InstallApp } from '../hooks/useInstallApp';
import { Logo, Modal } from './UI';
import { ANDROID_APK_URL, isNativeApp } from '../lib/native';

export function UpdateSection({ update }: { update: AppUpdate }) {
  const busy = update.status === 'checking' || update.status === 'updating';
  if (isNativeApp) return <section className="settings-section maintenance-section" aria-labelledby="update-heading"><h3 id="update-heading">برنامه و به‌روزرسانی</h3><p>نسخهٔ {__APP_VERSION__} · نسخهٔ نصبی اندروید</p><div className="update-box"><p>درس‌ها داخل همین برنامه هستند و بدون اینترنت هم باز می‌شوند. برای نسخهٔ تازه، فایل نصبی جدید را روی همین برنامه نصب کن؛ پیشرفتت پاک نمی‌شود.</p><a className="button button-outline button-small" href={ANDROID_APK_URL} target="_blank" rel="noreferrer"><Download size={16}/>دریافت نسخهٔ تازهٔ اندروید</a><small><ShieldCheck size={13}/>درس‌ها، تنظیمات و پیشرفتت پاک نمی‌شوند.</small></div></section>;
  return <section className="settings-section maintenance-section" aria-labelledby="update-heading">
    <h3 id="update-heading">برنامه و به‌روزرسانی</h3>
    <p>نسخهٔ {__APP_VERSION__} · یک بار باز کن، بعد از همان آیکون ادامه بده.</p>
    <div className="update-box">
      <p role="status" aria-live="polite">{update.message}</p>
      {update.status === 'available'
        ? <button className="button button-primary button-small" onClick={update.applyUpdate}><RefreshCw size={16}/>به‌روزرسانی و بازکردن برنامه</button>
        : <button className="button button-outline button-small" disabled={busy || !update.supported} onClick={() => void update.checkForUpdate()}><RefreshCw size={16} className={busy ? 'spin' : ''}/>{busy ? 'کمی صبر کن…' : 'بررسی به‌روزرسانی'}</button>}
      <small><ShieldCheck size={13}/>درس‌ها، تنظیمات و پیشرفتت پاک نمی‌شوند.</small>
    </div>
  </section>;
}

export function InstallModal({ installer, onClose }: { installer: InstallApp; onClose: () => void }) {
  if (isNativeApp) return <Modal title="قدم روی موبایل تو" onClose={onClose}><div className="install-success" role="status"><Check size={22}/><strong>نسخهٔ اندروید نصب است.</strong><p>از همین آیکون «قدم» ادامه بده.</p></div><a className="button button-primary full-width" href={ANDROID_APK_URL} target="_blank" rel="noreferrer"><Download size={18}/>دریافت فایل نصبی اندروید</a></Modal>;
  return <Modal title="قدم روی موبایل تو" onClose={onClose} className="install-modal">
    <div className="install-hero"><Logo/><p>مثل یک برنامه، از صفحهٔ اصلی باز شود.</p></div>
    {installer.installed ? <div className="install-success" role="status"><Check size={22}/><strong>قدم نصب شده است.</strong><p>از آیکون «قدم» روی صفحهٔ اصلی وارد شو.</p></div> : <>
      {installer.canInstall && <button className="button button-primary full-width" onClick={() => void installer.install()}><Download size={18}/>نصب قدم روی این دستگاه</button>}
      {installer.outcome === 'dismissed' && <p className="install-note" role="status">نصب انجام نشد. هر وقت خواستی دوباره امتحان کن یا از راهنمای مرورگر استفاده کن.</p>}
      <div className="install-instructions">
        <section><h3><Smartphone size={18}/>اندروید · Chrome</h3><ol><li>همین صفحه را در Chrome باز کن.</li><li>منوی سه‌نقطهٔ مرورگر را باز کن.</li><li><strong>نصب برنامه</strong> یا <strong>افزودن به صفحهٔ اصلی</strong> را بزن.</li></ol></section>
        <section><h3><Smartphone size={18}/>آیفون · Safari</h3><ol><li>همین صفحه را در Safari باز کن.</li><li>دکمهٔ <strong>اشتراک‌گذاری</strong> را بزن.</li><li><strong>Add to Home Screen</strong> را انتخاب کن.</li></ol></section>
      </div>
      <p className="install-note">این نسخه وب‌اپ نصب‌شونده (PWA) است، نه فایل APK. پس از نصب، به‌روزرسانی از داخل خود برنامه انجام می‌شود و لازم نیست هر بار فایل تازه بگیری.</p>
    </>}
    <button className="text-button full-width" onClick={onClose}>برگشت به برنامه<ArrowLeft size={16}/></button>
  </Modal>;
}
