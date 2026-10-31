import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import express from 'express';
import { openDb } from './db';
import { createApp } from './app';

const port = Number(process.env.PORT ?? 3001);
const db = openDb(process.env.DB_PATH ?? resolve('data/ghadam.sqlite'));
const app = createApp(db, { setupToken: process.env.SETUP_TOKEN, trustProxy: process.env.TRUST_PROXY === '1' });
const dist = resolve('dist');
if (existsSync(dist)) {
  app.use(express.static(dist, { maxAge: '1h', setHeaders: (res, path) => { if (path.endsWith('sw.js') || path.endsWith('index.html')) res.setHeader('Cache-Control', 'no-cache'); } }));
  app.get('/{*path}', (_req, res) => { res.sendFile(resolve(dist, 'index.html')); });
}
app.listen(port, '0.0.0.0', () => { console.log(`Ghadam membership API on http://0.0.0.0:${port}`); });
