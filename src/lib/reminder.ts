import { LocalNotifications } from '@capacitor/local-notifications';
import { isNativeApp } from './native';
import type { Reminder } from './learning';
const ID = 7301;
export const reminderSupported = isNativeApp;
export async function reminderPermission() {
  if (!isNativeApp) return { display: 'denied' as const, exact: 'denied' as const };
  const display = (await LocalNotifications.checkPermissions()).display;
  const exact = (await LocalNotifications.checkExactNotificationSetting()).exact_alarm;
  return { display, exact };
}
export async function requestReminderPermission() {
  if (!isNativeApp) throw new Error('یادآور بسته‌شدن برنامه فقط در نسخهٔ اندروید کار می‌کند.');
  const display = (await LocalNotifications.requestPermissions()).display;
  if (display !== 'granted') throw new Error('اجازهٔ اعلان داده نشد. از تنظیمات اندروید اجازهٔ اعلان‌های قدم را فعال کن.');
  let exact = (await LocalNotifications.checkExactNotificationSetting()).exact_alarm;
  if (exact !== 'granted') { await LocalNotifications.changeExactNotificationSetting(); exact = (await LocalNotifications.checkExactNotificationSetting()).exact_alarm; }
  return { display, exact };
}
export async function applyReminder(reminder: Reminder) {
  if (!isNativeApp) return;
  await LocalNotifications.cancel({ notifications: [{ id: ID }] });
  if (!reminder.enabled) return;
  const [hour, minute] = reminder.time.split(':').map(Number);
  await LocalNotifications.createChannel({ id: 'ghadam-daily', name: 'یادآور روزانهٔ قدم', description: 'یک یادآوری آرام برای چند دقیقه انگلیسی', importance: 4, vibration: true, visibility: 1 });
  await LocalNotifications.schedule({ notifications: [{ id: ID, channelId: 'ghadam-daily', title: 'یک قدم کوچک برای امروز 🌱', body: 'هر وقت آماده‌ای، چند دقیقه انگلیسی تمرین کن. حتی یک سؤال هم کافی است.', largeBody: 'لازم نیست عالی باشی؛ فقط یک قدم کوچک بردار.', schedule: { on: { hour, minute }, repeats: true, allowWhileIdle: true }, autoCancel: true, extra: { route: 'today' } }] });
}
export async function testReminder() {
  if (!isNativeApp) throw new Error('اعلان آزمایشی فقط در اندروید است.');
  await LocalNotifications.schedule({ notifications: [{ id: ID + 1, channelId: 'ghadam-daily', title: 'یادآور قدم فعال است', body: 'این یک اعلان آزمایشی بود. سر ساعت انتخابی، یادآوری روزانه می‌رسد.', schedule: { at: new Date(Date.now() + 3000), allowWhileIdle: true } }] });
}
export async function initReminder(reminder: Reminder) {
  if (!isNativeApp) return;
  await LocalNotifications.addListener('localNotificationActionPerformed', () => { window.location.hash = 'today'; });
  if (reminder.enabled) { const permission = await reminderPermission(); if (permission.display === 'granted') await applyReminder(reminder); }
}
