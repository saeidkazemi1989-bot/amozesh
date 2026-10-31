import test from 'node:test';
import assert from 'node:assert/strict';
import { openDb } from './db';
import { createApp } from './app';

async function withServer(fn: (base: string) => Promise<void>) {
  const db = openDb(':memory:');
  const app = createApp(db, { setupToken: 'setup-secret-123', secureCookie: false });
  const server = app.listen(0, '127.0.0.1');
  await new Promise<void>((resolve) => server.once('listening', resolve));
  const address = server.address(); const port = typeof address === 'object' && address ? address.port : 0;
  try { await fn(`http://127.0.0.1:${port}`); } finally { server.closeAllConnections(); await new Promise<void>((resolve) => server.close(() => resolve())); db.close(); }
}
async function json(base: string, path: string, method = 'GET', body?: unknown, token?: string) {
  const response = await fetch(base + path, { method, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: body === undefined ? undefined : JSON.stringify(body) });
  return { status: response.status, data: await response.json() as Record<string, any> };
}
test('setup, member creation, timed grant, content gating and revocation work end to end', async () => {
  await withServer(async (base) => {
    assert.equal((await json(base, '/api/setup-status')).data.needsSetup, true);
    const setup = await json(base, '/api/setup', 'POST', { setupToken: 'setup-secret-123', username: 'admin', name: 'Manager', password: 'admin-password-123' });
    assert.equal(setup.status, 201); const admin = setup.data.token;
    assert.equal((await json(base, '/api/setup', 'POST', { setupToken: 'setup-secret-123', username: 'other', name: 'X', password: 'password-12345' })).status, 409);
    const member = await json(base, '/api/admin/members', 'POST', { username: 'sara', name: 'Sara', password: 'member-password-123' }, admin);
    assert.equal(member.status, 201);
    const login = await json(base, '/api/auth/login', 'POST', { username: 'sara', password: 'member-password-123' });
    const token = login.data.token;
    const before = await json(base, '/api/content', 'GET', undefined, token);
    assert.equal(before.data.lessons.length, 6);
    assert.equal((await json(base, '/api/admin/members', 'GET', undefined, token)).status, 403);
    const grant = await json(base, `/api/admin/members/${member.data.id}/grants`, 'POST', { levelId: 'advanced-1', months: 2 }, admin);
    assert.equal(grant.status, 201); assert.ok(grant.data.expiresAt > Date.now() + 50 * 86400_000);
    const after = await json(base, '/api/content', 'GET', undefined, token);
    assert.equal(after.data.lessons.length, 12);
    assert.equal((await json(base, '/api/access/work-email', 'GET', undefined, token)).data.allowed, true);
    assert.equal((await json(base, '/api/access/leadership', 'GET', undefined, token)).data.allowed, false);
    await json(base, `/api/admin/grants/${grant.data.id}`, 'DELETE', undefined, admin);
    assert.equal((await json(base, '/api/access/work-email', 'GET', undefined, token)).data.allowed, false);
    await json(base, `/api/admin/members/${member.data.id}`, 'PATCH', { active: false }, admin);
    assert.equal((await json(base, '/api/me', 'GET', undefined, token)).status, 401);
  });
});
