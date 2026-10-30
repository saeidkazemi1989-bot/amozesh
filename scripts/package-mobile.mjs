import { mkdirSync, readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const release = resolve(root, 'release');
mkdirSync(release, { recursive: true });
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const file = resolve(release, `ghadam-mobile-pwa-${pkg.version}.zip`);
writeFileSync(resolve(root, 'dist', 'MOBILE-INSTALL.fa.txt'), `قدم — راهنمای نصب موبایل

این بسته یک وب‌اپ نصب‌شونده (PWA) است، نه فایل APK.

روش سادهٔ نصب:
۱. نشانی میزبانی‌شدهٔ برنامه را در Chrome اندروید یا Safari آیفون باز کنید.
۲. در اندروید: منوی سه‌نقطه > نصب برنامه / افزودن به صفحهٔ اصلی.
۳. در آیفون: اشتراک‌گذاری > Add to Home Screen.
۴. بعد از نصب، از آیکون «قدم» وارد شوید.

به‌روزرسانی:
داخل برنامه دکمهٔ «به‌روزرسانی برنامه» را بزنید و «بررسی به‌روزرسانی» را انتخاب کنید.
پیشرفت شما در همان مرورگر ذخیره می‌شود و با به‌روزرسانی پاک نمی‌شود.

این پوشهٔ dist برای انتشار روی یک میزبان وب استاتیک با HTTPS است.
`);
execFileSync('zip', ['-q', '-r', file, '.'], { cwd: resolve(root, 'dist') });
copyFileSync(file, resolve(release, 'ghadam-mobile-pwa.zip'));
console.log(file);
