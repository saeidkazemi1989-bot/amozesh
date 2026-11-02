// Pure helpers for the server address. Kept apart from api.ts so they can be
// unit tested without the Capacitor runtime.

// Matches a Web App link with or without the protocol, even when it is pasted
// inside other text ("این لینک را بگذار: ...").
export const APPS_URL_PATTERN = /script\.google\.com\/macros\/s\/([A-Za-z0-9_-]+)\/(exec|dev)/i;

export function normalizeApiBase(value: string): string {
  // People paste the link with quotes, angle brackets, spaces or an extra
  // "?authuser=0" tail, so pull the Web App link out of whatever they pasted.
  const cleaned = String(value ?? '').trim()
    .replace(/^[\s<"'«([]+/, '')
    .replace(/[\s>"'»)\]]+$/, '')
    .replace(/[.,;]+$/, '');
  if (!cleaned) return '';
  const google = cleaned.match(APPS_URL_PATTERN);
  if (google) {
    if (google[2].toLowerCase() === 'dev') throw new Error('لینک /dev فقط برای ویرایشگر است؛ لینک /exec را از Manage deployments کپی کن.');
    return `https://script.google.com/macros/s/${google[1]}/exec`;
  }
  if (/docs\.google\.com|drive\.google\.com/i.test(cleaned)) throw new Error('این لینک Google Sheet است، نه لینک Web App. در Apps Script برو به Deploy → Manage deployments و لینک /exec را کپی کن.');
  if (/script\.googleusercontent\.com/i.test(cleaned)) throw new Error('این لینک خروجی گوگل است؛ لینک /exec را از Deploy → Manage deployments کپی کن.');
  let url: URL;
  try { url = new URL(/^[a-z]+:\/\//i.test(cleaned) ? cleaned : `https://${cleaned}`); }
  catch { throw new Error('آدرس معتبر نیست؛ باید با https:// شروع شود.'); }
  const localHttp = url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname);
  if (url.protocol !== 'https:' && !localHttp) throw new Error('آدرس سرور باید با https:// شروع شود.');
  if (url.hostname === 'script.google.com') throw new Error('لینک Web App گوگل معتبر نیست؛ از Manage deployments لینک /exec را کپی کن.');
  return `${url.origin}${url.pathname.replace(/\/+$/, '')}`;
}

export const isAppsScriptBase = (base: string) => {
  const value = String(base ?? '');
  return APPS_URL_PATTERN.test(value) && !/\/dev(?:[?#]|$)/i.test(value);
};
