import { chromium as playwright } from '@playwright/test';
import chromium, { inflate, setupLambdaEnvironment } from '@sparticuz/chromium';
import { resolve } from 'node:path';
import { tmpdir } from 'node:os';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';

await inflate(resolve('node_modules/@sparticuz/chromium/bin/al2023.tar.br'));
setupLambdaEnvironment(resolve(tmpdir(), 'al2023', 'lib'));
const browser = await playwright.launch({
  executablePath: await chromium.executablePath(),
  args: chromium.args.filter((arg) => !['--single-process', '--no-zygote', '--disable-web-security', '--allow-running-insecure-content'].includes(arg)),
});
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
const page = await context.newPage();
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
page.on('requestfailed', (request) => errors.push(`Request failed: ${request.url()}`));
page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
try {
  await page.goto('http://127.0.0.1:4173/');
  await page.getByRole('button', { name: 'شروع ۵ دقیقه‌ای امروز' }).waitFor();
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.waitForFunction(() => !!navigator.serviceWorker.controller);
  const cached = await page.evaluate(async () => {
    const keys = await caches.keys();
    const cache = await caches.open(keys.find((key) => key.startsWith('ghadam-')));
    return (await cache.keys()).length;
  });
  assert.ok(cached >= 15, 'App shell, icons, fonts and scripts are precached');
  const manifest = await page.evaluate(async () => (await fetch('/manifest.webmanifest')).json());
  assert.equal(manifest.lang, 'fa');
  assert.equal(manifest.dir, 'rtl');
  assert.ok(manifest.icons.some((icon) => icon.sizes === '512x512'));
  await context.setOffline(true);
  await page.reload();
  await page.getByRole('button', { name: 'شروع ۵ دقیقه‌ای امروز' }).click({ timeout: 8000 });
  assert.equal(await page.locator('.new-phrase').textContent(), 'Hello!');
  await page.getByRole('button', { name: 'فهمیدم، بریم بعدی' }).click();
  assert.equal(await page.locator('.new-phrase').textContent(), 'How are you?');
  await page.reload();
  await page.getByRole('button', { name: 'ادامه از همان‌جایی که بودی' }).click();
  assert.equal(await page.locator('.new-phrase').textContent(), 'How are you?');
  await context.setOffline(false);
  await page.getByRole('button', { name: 'ذخیره و خروج' }).click();
  await page.getByRole('button', { name: 'به‌روزرسانی برنامه' }).click();
  await page.getByRole('button', { name: 'بررسی به‌روزرسانی' }).click();
  await page.getByText('همین حالا آخرین نسخه را داری؛ چیزی برای دانلود نیست.').waitFor();
  const swPath = resolve('dist/sw.js');
  const originalSw = readFileSync(swPath, 'utf8');
  try {
    writeFileSync(swPath, originalSw + '\n// production update test\n');
    await page.getByRole('button', { name: 'بررسی به‌روزرسانی' }).click();
    await page.getByText('نسخهٔ تازه آماده است. هر وقت خواستی، برنامه را به‌روز کن.').waitFor();
    const before = await page.evaluate(() => localStorage.getItem('ghadam-progress-v1'));
    await page.getByRole('button', { name: 'به‌روزرسانی و بازکردن برنامه' }).click();
    await page.waitForLoadState('load');
    await page.getByRole('button', { name: 'ادامه از همان‌جایی که بودی' }).waitFor();
    const after = await page.evaluate(() => localStorage.getItem('ghadam-progress-v1'));
    assert.equal(after, before, 'Update preserves saved progress');
  } finally {
    writeFileSync(swPath, originalSw);
  }
  await page.getByRole('button', { name: 'تنظیمات', exact: true }).first().click();
  await page.getByRole('button', { name: 'نصب روی موبایل و راهنمای افزودن به صفحهٔ اصلی' }).click();
  await page.getByRole('heading', { name: 'قدم روی موبایل تو' }).waitFor();
  await page.getByText('این نسخه وب‌اپ نصب‌شونده (PWA) است، نه فایل APK.').waitFor();
  assert.deepEqual(errors, []);
  console.log(`Production verified: ${cached} cached assets; offline reload, lessons, progress resume, in-app update without data loss, install guide; no runtime errors.`);
} finally {
  await browser.close();
}
