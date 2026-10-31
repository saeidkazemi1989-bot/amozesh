import { useEffect, useState } from 'react';
import { Bell, Clock3, Smartphone } from 'lucide-react';
import { Toggle } from './UI';
import { applyReminder, reminderPermission, reminderSupported, requestReminderPermission, testReminder } from '../lib/reminder';
import type { Reminder } from '../lib/learning';

export function ReminderSettings({ reminder, onChange, notify }: { reminder: Reminder; onChange: (reminder: Reminder) => void; notify: (message: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [permission, setPermission] = useState<{ display: string; exact: string } | null>(null);
  useEffect(() => { if (reminderSupported) void reminderPermission().then(setPermission).catch(() => {}); }, []);
  async function enable(enabled: boolean) {
    if (!enabled) { onChange({ ...reminder, enabled: false }); await applyReminder({ ...reminder, enabled: false }); notify('یادآور روزانه خاموش شد.'); return; }
    setBusy(true);
    try { const result = await requestReminderPermission(); setPermission(result); onChange({ ...reminder, enabled: true }); await applyReminder({ ...reminder, enabled: true }); notify(result.exact === 'granted' ? 'یادآور دقیق فعال شد؛ حتی اگر برنامه بسته باشد.' : 'یادآور فعال شد، اما اندروید اجازهٔ ساعت دقیق نداده؛ ممکن است کمی دیرتر برسد.'); }
    catch (error) { notify(error instanceof Error ? error.message : 'فعال‌سازی یادآور ممکن نشد.'); }
    finally { setBusy(false); }
  }
  async function changeTime(time: string) {
    onChange({ ...reminder, time });
    if (reminder.enabled) { try { await applyReminder({ ...reminder, time }); } catch { notify('ذخیره شد، اما زمان‌بندی دوباره لازم است.'); } }
  }
  return <section className="settings-section reminder-section"><h3><Bell size={18}/>یادآور روزانه</h3><p>یک ساعت آرام برای خودت انتخاب کن؛ نه اجبار، فقط یادآوری.</p>
    {!reminderSupported && <div className="privacy-note"><Smartphone size={20}/><p>یادآور وقتی برنامه بسته است فقط در نسخهٔ اندروید کار می‌کند. فایل نصبی را از بخش به‌روزرسانی بگیر.</p></div>}
    <Toggle checked={reminder.enabled} onChange={() => void enable(!reminder.enabled)} label="یادآوری سر ساعت مشخص" description={reminderSupported ? 'حتی وقتی برنامه بسته است؛ با اجازهٔ اعلان اندروید.' : 'در نسخهٔ اندروید فعال می‌شود.'}/>
    <label className="reminder-time"><span><Clock3 size={16}/>ساعت یادآوری</span><input type="time" value={reminder.time} disabled={busy || !reminderSupported} onChange={(event) => void changeTime(event.target.value)} aria-label="ساعت یادآوری روزانه"/></label>
    {reminder.enabled && reminderSupported && <div className="reminder-actions"><button className="button button-outline button-small" disabled={busy} onClick={() => void testReminder().then(() => notify('اعلان آزمایشی تا چند ثانیه دیگر می‌رسد.')).catch((error) => notify(error.message))}>اعلان آزمایشی</button><small>{permission?.exact === 'granted' ? 'ساعت دقیق فعال است.' : 'برای ساعت دقیق، اجازهٔ «هشدارها و یادآورها» را در تنظیمات اندروید فعال کن.'}</small></div>}
    <small className="settings-hint">اگر گوشی خاموش شود یا اجازهٔ اعلان پس گرفته شود، یادآور نمی‌رسد. ساعت بر اساس منطقهٔ زمانی گوشی است.</small>
  </section>;
}
