import { defineConfig } from '@playwright/test';
import chromium, { inflate, setupLambdaEnvironment } from '@sparticuz/chromium';
import { resolve } from 'node:path';
import { tmpdir } from 'node:os';

// The serverless browser ships its own native libraries; no system install is needed.
await inflate(resolve('node_modules/@sparticuz/chromium/bin/al2023.tar.br'));
setupLambdaEnvironment(resolve(tmpdir(), 'al2023', 'lib'));

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  timeout: 45_000,
  expect: { timeout: 8_000 },
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:5173',
    viewport: { width: 1440, height: 1050 },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    launchOptions: {
      executablePath: await chromium.executablePath(),
      args: chromium.args.filter((arg) => !['--single-process', '--no-zygote', '--disable-web-security', '--allow-running-insecure-content'].includes(arg)),
      headless: true,
    },
  },
  webServer: {
    command: 'npm run dev -- --port 5173',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
