import { useEffect, useState } from 'react';
import { ArrowLeft, KeyRound, LogOut, RefreshCw, Server, ShieldCheck, UserPlus } from 'lucide-react';
import { Modal } from './UI';
import { api, errorMessage, getApiBase, login, setApiBase, setToken } from '../lib/api';
import type { Membership } from '../hooks/useMembership';
import { levels } from '../data/catalog';
import { isNativeApp } from '../lib/native';

const faDate = (ms: number) => new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(ms));
export function AccountModal({ membership, onClose, onAdmin, notify }: { membership: Membership; onClose: () => void; onAdmin: () => void; notify: (message: string) => void }) {
  const [server, setServer] = useState(getApiBase());
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [needsSetup, setNeedsSetup] = useState(false);
  const [setupToken, setSetupToken] = useState('');
  const [name, setName] = useState('');
  useEffect(() => { if (!server) return; void api<{ needsSetup: boolean }>('/setup-status').then((r) => setNeedsSetup(r.needsSetup)).catch(() => {}); }, [server]);
  async function saveServer() { try { setApiBase(server); await membership.refresh(); notify('آدرس سرور ذخیره شد.'); } catch (error) { notify(errorMessage(error)); } }
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setBusy(true);
    try {
      let account;
      if (needsSetup) { const result = await api<{ token: string; user: { role: string } }>('/setup', { method: 'POST', body: JSON.stringify({ setupToken, username, name, password }) }); await setToken(result.token); account = result.user; }
      else account = await login(username, password);
      await membership.loggedIn(); notify('خوش آمدی به قدم.');
      if (account.role === 'admin') onAdmin(); else onClose();
    } catch (error) { notify(errorMessage(error)); } finally { setBusy(false); }
  }
  return <Modal title={membership.user ? 'حساب و دسترسی‌ها' : needsSetup ? 'راه‌اندازی حساب مدیر' : 'ورود به حساب قدم'} onClose={onClose} className="account-modal">
    {membership.user ? <>
      <div className="account-summary"><span className="stat-icon sage"><ShieldCheck size={23}/></span><div><strong>{membership.user.name}</strong><span>@{membership.user.username} · {membership.user.role === 'admin' ? 'مدیر' : 'عضو'}</span></div></div>
      <section className="settings-section"><h3>دسترسی‌های فعال</h3><div className="access-list">{levels.filter((level) => membership.hasLevel(level.id)).map((level) => { const grant = membership.grants.find((g) => g.levelId === level.id); return <div key={level.id}><strong>{level.title}</strong><span>{membership.user?.role === 'admin' || level.id === 'beginner-1' ? 'همیشه باز' : grant ? `تا ${faDate(grant.expiresAt)}` : 'فعال'}</span></div>; })}</div><p className="settings-hint">سطح‌های دیگر را مدیر می‌تواند برای ۱ تا ۳۶ ماه فعال کند. دسترسی پس از پایان زمان، در اتصال بعدی به سرور بسته می‌شود.</p></section>
      <div className="account-actions"><button className="button button-outline" onClick={() => void membership.refresh()} disabled={membership.syncing}><RefreshCw size={16}/>بررسی دوباره</button>{membership.user.role === 'admin' && <button className="button button-primary" onClick={() => { onClose(); onAdmin(); }}><UserPlus size={16}/>مدیریت اعضا</button>}<button className="text-button danger-text" onClick={() => void membership.logout().then(onClose).catch((e) => notify(errorMessage(e)))}><LogOut size={16}/>خروج از حساب</button></div>
    </> : <>
      <p className="modal-description">سطح مبتدی ۱ رایگان است. برای سطح‌های دیگر، حسابی که مدیر برایت ساخته وارد کن.</p>
      <label className="name-setting"><span><Server size={15}/>آدرس سرور یا لینک گوگل</span><input dir="ltr" value={server} placeholder="https://script.google.com/macros/s/.../exec" onChange={(event) => setServer(event.target.value)}/></label>
      <button className="text-button" onClick={() => void saveServer()}>ذخیره و بررسی سرور<ArrowLeft size={15}/></button>
      {needsSetup && <div className="privacy-note"><KeyRound size={20}/><p>این سرور تازه است. کد راه‌اندازی که هنگام نصب سرور ساخته شده وارد کن تا حساب مدیر خودت ساخته شود.</p></div>}
      <form onSubmit={(event) => void submit(event)} className="account-form">
        {needsSetup && <><label className="name-setting"><span>کد راه‌اندازی سرور</span><input dir="ltr" value={setupToken} onChange={(e) => setSetupToken(e.target.value)} required/></label><label className="name-setting"><span>نام نمایشی مدیر</span><input value={name} onChange={(e) => setName(e.target.value)} maxLength={60} required/></label></>}
        <label className="name-setting"><span>نام کاربری</span><input dir="ltr" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} minLength={3} maxLength={40} required/></label>
        <label className="name-setting"><span>رمز عبور</span><input dir="ltr" type="password" autoComplete={needsSetup ? 'new-password' : 'current-password'} value={password} onChange={(e) => setPassword(e.target.value)} minLength={10} maxLength={128} required/></label>
        <button className="button button-primary full-width" disabled={busy || !server}>{busy ? 'کمی صبر کن…' : needsSetup ? 'ساخت حساب مدیر' : 'ورود'}<ArrowLeft size={17}/></button>
      </form>
      {membership.error && <p className="form-error" role="alert">{membership.error}</p>}
      <small className="settings-hint">{isNativeApp ? 'رمز ورود در فضای امن اندروید نگهداری می‌شود.' : 'نشست وب با کوکی امن نگهداری می‌شود.'} پیشرفت تمرین جداگانه روی همین دستگاه می‌ماند.</small>
    </>}
  </Modal>;
}
