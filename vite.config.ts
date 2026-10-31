import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8')) as { version: string };

function offlineApp(): Plugin {
  return {
    name: 'ghadam-offline',
    apply: 'build' as const,
    generateBundle(_options: unknown, bundle: Record<string, { type: string }>) {
      const files = Object.keys(bundle).filter((file) => !file.endsWith('.map'));
      const version = createHash('sha256').update(files.join('|')).digest('hex').slice(0, 12);
      const assets = ['/', '/index.html', '/favicon.svg', '/manifest.webmanifest', '/icon-180.png', '/icon-192.png', '/icon-512.png', ...files.map((file) => `/${file}`)];
      this.emitFile({
        type: 'asset',
        fileName: 'sw.js',
        source: `
const CACHE = 'ghadam-${version}';
const ASSETS = ${JSON.stringify([...new Set(assets)])};
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const oldKeys = (await caches.keys()).filter((key) => key.startsWith('ghadam-') && key !== CACHE);
    const oldCaches = await Promise.all(oldKeys.map((key) => caches.open(key)));
    await Promise.all(ASSETS.map(async (asset) => {
      // Reuse unchanged, content-hashed assets instead of downloading them again.
      if (asset.startsWith('/assets/')) {
        for (const old of oldCaches) {
          const hit = await old.match(asset, { ignoreVary: true });
          if (hit) { await cache.put(asset, hit); return; }
        }
      }
      const response = await fetch(asset, { cache: 'reload' });
      if (!response.ok) throw new Error('Could not cache ' + asset);
      await cache.put(asset, response);
    }));
  })());
});
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith('ghadam-') && key !== CACHE).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  if (new URL(event.request.url).pathname.startsWith('/api/')) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.match('/index.html', { ignoreVary: true })));
    return;
  }
  // Vite's preview server sends Vary: Origin. Module and font requests include
  // Origin, while precache requests do not. This cache contains only our own
  // same-origin, versioned app assets, so matching across Origin is intentional.
  event.respondWith(caches.match(event.request, { ignoreVary: true }).then((cached) => cached || fetch(event.request).then((response) => {
    if (response.ok) { const copy = response.clone(); event.waitUntil(caches.open(CACHE).then((cache) => cache.put(event.request, copy))); }
    return response;
  })));
});
`,
      });
    },
  };
}

export default defineConfig({
  define: { __APP_VERSION__: JSON.stringify(packageJson.version) },
  plugins: [react(), offlineApp()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
    proxy: { '/api': { target: 'http://127.0.0.1:3001', changeOrigin: false } },
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: true,
    proxy: { '/api': { target: 'http://127.0.0.1:3001', changeOrigin: false } },
  },
});
