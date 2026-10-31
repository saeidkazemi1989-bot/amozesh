import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { phraseById } from '../src/data/curriculum';
import { lessonCatalog } from '../src/data/catalog';
import { createProgress, dateKey, STORAGE_KEY } from '../src/lib/learning';
import type { Progress } from '../src/lib/learning';

async function saved(page: Page): Promise<Progress> {
  return page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), STORAGE_KEY);
}
async function answerCurrent(page: Page, wrong = false, stay = false) {
  const progress = await saved(page);
  const session = progress.activeSession!;
  const step = session.steps[session.index];
  const phrase = phraseById.get(step.phraseId)!;
  if (step.kind === 'learn') {
    await page.getByRole('button', { name: 'فهمیدم، بریم بعدی' }).click();
    return;
  }
  if (step.exercise === 'order') {
    const words = wrong ? [...phrase.en.split(' ')].reverse() : phrase.en.split(' ');
    for (const word of words) await page.locator('.word-bank button:not(:disabled)').filter({ hasText: new RegExp(`^${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`) }).first().click();
  } else {
    const answer = step.exercise === 'meaning' ? phrase.en : phrase.fa;
    const choice = wrong ? step.options.find((option) => option !== answer)! : answer;
    await page.locator('.answer-option').filter({ hasText: choice }).click();
  }
  await page.getByRole('button', { name: 'بررسی جواب' }).click();
  await expect(page.locator('.answer-feedback')).toBeVisible();
  if (!wrong && !stay) await page.getByRole('button', { name: session.index === session.steps.length - 1 ? 'دیدن نتیجه' : 'قدم بعدی' }).click();
}

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
});

test('Persian dashboard is usable on a small phone without horizontal overflow', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'سلام، خوش اومدی' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'شروع ۵ دقیقه‌ای امروز' })).toBeVisible();
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('.mobile-nav').getByRole('button', { name: 'درس‌ها' }).click();
  await expect(page.getByRole('heading', { name: 'هر درس، یک قدم کوچک.' })).toBeVisible();
  await page.locator('.mobile-nav').getByRole('button', { name: 'مرور من' }).click();
  await expect(page.getByRole('heading', { name: 'اول یک قدم، بعد یک مرور.' })).toBeVisible();
});

test('a complete first lesson teaches, listens without audio, builds a sentence and persists', async ({ page }) => {
  await page.getByRole('button', { name: 'شروع ۵ دقیقه‌ای امروز' }).click();
  await expect(page.locator('.new-phrase')).toHaveText('Hello!');
  await answerCurrent(page);
  await expect(page.locator('.new-phrase')).toHaveText('How are you?');
  await answerCurrent(page);
  await answerCurrent(page);
  await answerCurrent(page);
  await expect(page.getByRole('heading', { name: 'بشنو و معنی رو پیدا کن' })).toBeVisible();
  await expect(page.locator('.fallback-phrase')).toHaveText('How are you?');
  await answerCurrent(page);
  await expect(page.getByRole('heading', { name: 'کلمه‌ها رو کنار هم بچین' })).toBeVisible();
  await answerCurrent(page);
  await expect(page.getByRole('heading', { name: 'آفرین به وقتی که برای خودت گذاشتی.' })).toBeVisible();
  const progress = await saved(page);
  expect(progress.completedLessons).toEqual(['hello']);
  expect(Object.keys(progress.learned)).toHaveLength(3);
  expect(progress.history[0].correct).toBe(3);
  await page.getByRole('button', { name: 'برگشت به امروز' }).click();
  await page.reload();
  await expect(page.getByText('قدم امروزت رو برداشتی', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'شروع ۵ دقیقه‌ای امروز' })).toBeVisible();
  expect((await saved(page)).completedLessons).toEqual(['hello']);
});

test('a wrong answer teaches gently and a saved lesson resumes after reload', async ({ page }) => {
  await page.getByRole('button', { name: 'شروع ۵ دقیقه‌ای امروز' }).click();
  await answerCurrent(page);
  await page.getByRole('button', { name: 'ذخیره و خروج' }).click();
  await page.getByRole('button', { name: 'ادامه از همان‌جایی که بودی' }).click();
  await expect(page.locator('.new-phrase')).toHaveText('How are you?');
  await page.reload();
  await page.getByRole('button', { name: 'ادامه از همان‌جایی که بودی' }).click();
  await expect(page.locator('.new-phrase')).toHaveText('How are you?');
  await answerCurrent(page);
  await answerCurrent(page);
  // Make the ordering branch deterministic, independently of the random exercise order.
  await page.evaluate((key) => {
    const progress = JSON.parse(localStorage.getItem(key)!);
    progress.activeSession.steps[progress.activeSession.index].phraseId = 'hello-2';
    progress.activeSession.steps[progress.activeSession.index].exercise = 'order';
    progress.activeSession.steps[progress.activeSession.index].options = [];
    localStorage.setItem(key, JSON.stringify(progress));
  }, STORAGE_KEY);
  await page.reload();
  await page.getByRole('button', { name: 'ادامه از همان‌جایی که بودی' }).click();
  await answerCurrent(page, true);
  await expect(page.getByText('اشکالی نداره؛ با هم دیدیمش.')).toBeVisible();
  await expect.poll(async () => (await saved(page)).activeSession?.answers.length).toBe(4);
  await page.reload();
  await page.getByRole('button', { name: 'ادامه از همان‌جایی که بودی' }).click();
  await expect(page.locator('.word-answer .word-chip')).toHaveCount(3);
  await expect(page.getByText('اشکالی نداره؛ با هم دیدیمش.')).toBeVisible();
  expect((await saved(page)).completedLessons).toHaveLength(0);
  expect((await saved(page)).totalCorrect).toBe(0);
});

test('one-question mode is a real session but does not mark a lesson complete', async ({ page }) => {
  await page.getByRole('button', { name: 'فقط ۱ سؤال', exact: true }).click();
  await expect(page.getByText('قدم ۱ از ۱', { exact: true })).toBeVisible();
  await answerCurrent(page);
  await expect(page.getByRole('heading', { name: 'همین یک قدم هم ارزشمند بود.' })).toBeVisible();
  const progress = await saved(page);
  expect(progress.history).toHaveLength(1);
  expect(progress.history[0].mode).toBe('tiny');
  expect(progress.completedLessons).toHaveLength(0);
});

test('lesson search, filters and previews work', async ({ page }) => {
  await page.goto('/#lessons');
  await expect(page.locator('.lesson-card')).toHaveCount(lessonCatalog.length);
  await page.getByRole('textbox', { name: 'جست‌وجوی درس‌ها' }).fill('قهوه');
  await expect(page.locator('.lesson-card')).toHaveCount(1);
  await page.locator('.lesson-card').click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('.preview-phrases')).toContainText('A coffee, please.');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('textbox', { name: 'جست‌وجوی درس‌ها' }).fill('');
  await page.getByRole('button', { name: 'انجام‌شده', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'اولین درست منتظر توست.' })).toBeVisible();
});

test('settings, backup and intentional reset work', async ({ page }) => {
  await page.getByRole('button', { name: 'تنظیمات', exact: true }).first().click();
  await page.getByRole('button', { name: /۳.*دقیقه.*خیلی سبک/ }).click();
  await page.getByRole('textbox', { name: /دوست داری چی صدات کنیم/ }).fill('سارا');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'دریافت پشتیبان' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/^ghadam-progress-.*\.json$/);
  await page.getByRole('button', { name: 'بستن', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'سلام، سارا' })).toBeVisible();
  expect((await saved(page)).settings.goal).toBe(3);
  await page.getByRole('button', { name: 'تنظیمات', exact: true }).first().click();
  await page.getByRole('button', { name: 'پاک‌کردن پیشرفت و شروع تازه' }).click();
  await page.getByRole('button', { name: 'نه، نگهش دار' }).click();
  expect((await saved(page)).settings.name).toBe('سارا');
  await page.getByRole('button', { name: 'پاک‌کردن پیشرفت و شروع تازه' }).click();
  await page.getByRole('button', { name: 'بله، از صفر شروع می‌کنم' }).click();
  expect((await saved(page)).settings.name).toBe('');
});

test('a backup can be restored only after confirmation, and invalid files are harmless', async ({ page }) => {
  const backup = createProgress();
  backup.settings.name = 'مریم';
  backup.completedLessons = ['hello'];
  for (const id of ['hello-1', 'hello-2', 'hello-3']) backup.learned[id] = { level: 1, due: dateKey(), introduced: dateKey(), lastReviewed: dateKey(), attempts: 1, correct: 1 };
  await page.getByRole('button', { name: 'تنظیمات', exact: true }).first().click();
  await page.getByLabel('انتخاب فایل پشتیبان').setInputFiles({ name: 'backup.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(backup)) });
  await expect(page.getByText('پیشرفت فعلی با فایل پشتیبان جایگزین شود؟')).toBeVisible();
  expect((await saved(page)).settings.name).toBe('');
  await page.getByRole('button', { name: 'بله، بازگردانی کن' }).click();
  await expect(page.getByRole('heading', { name: 'سلام، مریم' })).toBeVisible();
  expect(Object.keys((await saved(page)).learned)).toHaveLength(3);
  await page.getByRole('button', { name: 'تنظیمات', exact: true }).first().click();
  await page.getByLabel('انتخاب فایل پشتیبان').setInputFiles({ name: 'invalid.json', mimeType: 'application/json', buffer: Buffer.from('{"version":100}') });
  await expect(page.getByText('این فایل، پشتیبان معتبرِ قدم نیست. پیشرفت فعلی‌ات تغییری نکرد.')).toBeVisible();
  expect((await saved(page)).settings.name).toBe('مریم');
});

test('due reviews are available after a break and schedule the next review', async ({ page }) => {
  const progress = createProgress();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const due = dateKey(yesterday);
  for (const id of ['hello-1', 'hello-2', 'hello-3']) progress.learned[id] = { level: 1, due, introduced: due, lastReviewed: due, attempts: 1, correct: 1 };
  await page.evaluate(({ key, value }) => localStorage.setItem(key, JSON.stringify(value)), { key: STORAGE_KEY, value: progress });
  await page.goto('/#review');
  await page.reload();
  await expect(page.getByRole('heading', { name: '۳ عبارت آمادهٔ یادآوری‌اند.' })).toBeVisible();
  await page.getByRole('button', { name: 'شروع مرور', exact: true }).click();
  for (let i = 0; i < 3; i++) await answerCurrent(page);
  await expect(page.getByRole('heading', { name: 'آفرین به وقتی که برای خودت گذاشتی.' })).toBeVisible();
  const result = await saved(page);
  expect(result.history[0].mode).toBe('review');
  expect(Object.values(result.learned).every((memory) => memory.due > dateKey())).toBe(true);
  expect(result.completedLessons).toHaveLength(0);
});

test('mobile lessons, every exercise, feedback and completion stay readable and accessible', async ({ page }) => {
  test.setTimeout(90_000);
  await page.setViewportSize({ width: 390, height: 844 });
  async function audit(label: string) {
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow: ${label}`).toBe(true);
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(result.violations, `Accessibility: ${label}`).toEqual([]);
  }
  await page.getByRole('button', { name: 'شروع ۵ دقیقه‌ای امروز' }).click();
  await audit('mobile learning');
  for (let i = 0; i < 3; i++) await answerCurrent(page);
  for (const exercise of ['meaning', 'listening', 'order']) {
    await page.evaluate(({ key, exercise }) => {
      const progress = JSON.parse(localStorage.getItem(key)!);
      const step = progress.activeSession.steps[progress.activeSession.index];
      step.phraseId = 'hello-2';
      step.exercise = exercise;
      step.options = exercise === 'order' ? [] : exercise === 'meaning' ? ['How are you?', 'Hello!', "I'm fine, thank you."] : ['حالت چطوره؟', 'سلام!', 'خوبم، ممنون.'];
      localStorage.setItem(key, JSON.stringify(progress));
    }, { key: STORAGE_KEY, exercise });
    await page.reload();
    await page.getByRole('button', { name: 'ادامه از همان‌جایی که بودی' }).click();
    await audit(`mobile ${exercise}`);
    await answerCurrent(page, false, true);
    await audit(`mobile ${exercise} positive feedback`);
    await page.getByRole('button', { name: exercise === 'order' ? 'دیدن نتیجه' : 'قدم بعدی' }).click();
  }
  await audit('mobile completion');
  expect(await page.locator('.celebrate-star').evaluate((element) => element.getBoundingClientRect().width)).toBeLessThan(50);
  await page.screenshot({ path: 'test-results/completion-mobile.png', fullPage: true });
  await page.getByRole('button', { name: 'برگشت به امروز' }).click();
  await page.getByRole('button', { name: 'تنظیمات', exact: true }).click();
  await audit('mobile settings');
  await page.getByRole('button', { name: 'بستن', exact: true }).click();
  await page.getByRole('button', { name: 'راهنمای برنامه' }).click();
  await audit('mobile help');
});

test('core pages and a learning card have no automated WCAG A/AA violations', async ({ page }) => {
  for (const route of ['today', 'lessons', 'review', 'progress']) {
    await page.goto(`/#${route}`);
    await expect(page.locator('.page')).toBeVisible();
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(result.violations, `Accessibility: ${route}`).toEqual([]);
  }
  await page.goto('/#today');
  await page.getByRole('button', { name: 'شروع ۵ دقیقه‌ای امروز' }).click();
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(result.violations).toEqual([]);
});

test('levels are grouped, locked levels open the account dialog, and reminder settings are present', async ({ page }) => {
  await page.goto('/#lessons');
  await expect(page.locator('.level-strip button')).toHaveCount(11);
  await expect(page.locator('.level-group')).toHaveCount(10);
  await page.locator('.locked-lesson').first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('heading', { name: /ورود به حساب قدم|راه‌اندازی حساب مدیر/ })).toBeVisible();
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'تنظیمات', exact: true }).first().click();
  await expect(page.getByRole('switch', { name: 'یادآوری سر ساعت مشخص' })).toBeVisible();
  await expect(page.getByLabel('ساعت یادآوری روزانه')).toHaveValue('20:00');
});

test('the direct management link opens sign-in instead of an empty admin page', async ({ page }) => {
  await page.goto('/#admin');
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('heading', { name: /ورود به حساب قدم|راه‌اندازی حساب مدیر/ })).toBeVisible();
  await expect(page.getByRole('button', { name: 'ورود', exact: true })).toBeVisible();
});
