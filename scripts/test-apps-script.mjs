import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { randomUUID, createHash } from 'node:crypto';

function a1(range) {
  const m = /^([A-Z]+)(\d+)(?::([A-Z]+)(\d+))?$/.exec(range);
  if (!m) throw new Error('bad range ' + range);
  const col = (s) => [...s].reduce((n, c) => n * 26 + c.charCodeAt(0) - 64, 0);
  const r1 = Number(m[2]), c1 = col(m[1]);
  const r2 = m[4] ? Number(m[4]) : r1, c2 = m[3] ? col(m[3]) : c1;
  return { row: r1, col: c1, rows: r2 - r1 + 1, cols: c2 - c1 + 1 };
}
class Sheet {
  constructor(name) { this.name = name; this.values = []; }
  getLastRow() { return this.values.length; }
  appendRow(row) { this.values.push([...row]); }
  setFrozenRows() {}
  deleteRow(row) { this.values.splice(row - 1, 1); }
  getRange(row, col, rows = 1, cols = 1) {
    const r = typeof row === 'string' ? a1(row) : { row, col, rows, cols };
    const self = this;
    return {
      getValues() { return Array.from({ length: r.rows }, (_, i) => Array.from({ length: r.cols }, (_, j) => self.values[r.row - 1 + i]?.[r.col - 1 + j] ?? '')); },
      setValues(values) { values.forEach((row, i) => { const target = r.row - 1 + i; while (self.values.length <= target) self.values.push([]); row.forEach((v, j) => { self.values[target][r.col - 1 + j] = v; }); }); return this; }
    };
  }
}
class Book {
  constructor() { this.sheets = new Map(); }
  getId() { return 'test-book'; }
  getSheetByName(name) { return this.sheets.get(name) ?? null; }
  insertSheet(name) { const sheet = new Sheet(name); this.sheets.set(name, sheet); return sheet; }
}
const book = new Book();
const props = new Map();
const cache = new Map();
const context = {
  console,
  Logger: { log() {} },
  SpreadsheetApp: { getActiveSpreadsheet: () => book, openById: () => book },
  PropertiesService: { getScriptProperties: () => ({ getProperty: (k) => props.get(k) ?? null, setProperty: (k, v) => props.set(k, v) }) },
  CacheService: { getScriptCache: () => ({ get: (k) => cache.get(k) ?? null, put: (k, v) => cache.set(k, v) }) },
  LockService: { getScriptLock: () => ({ waitLock() {}, releaseLock() {} }) },
  Utilities: {
    getUuid: randomUUID,
    DigestAlgorithm: { SHA_256: 'SHA_256' },
    Charset: { UTF_8: 'UTF_8' },
    computeDigest: (_alg, value) => [...createHash('sha256').update(String(value)).digest()]
  },
  ContentService: { MimeType: { JSON: 'JSON' }, createTextOutput: (text) => ({ setMimeType() { return this; }, getContent: () => text }) }
};
vm.createContext(context);
vm.runInContext(readFileSync('google-apps-script/Code.gs', 'utf8'), context);
const call = (path, method = 'GET', body, token) => {
  const out = context.doPost({ postData: { contents: JSON.stringify({ path, method, body, token }) } });
  return JSON.parse(out.getContent());
};

assert.equal(call('/health').data.ok, true);
assert.equal(call('/setup-status').data.needsSetup, true);
context.setup();
const setupToken = props.get('SETUP_TOKEN');
assert.ok(setupToken.length >= 32);
assert.equal(call('/setup', 'POST', { setupToken: 'wrong', username: 'admin', name: 'Admin', password: 'long-password-1' }).status, 403);
const admin = call('/setup', 'POST', { setupToken, username: 'admin', name: 'Admin', password: 'long-password-1' });
assert.equal(admin.status, 201);
assert.equal(admin.data.user.role, 'admin');
assert.equal(call('/setup-status').data.needsSetup, false);
const adminToken = admin.data.token;
assert.equal(call('/me', 'GET', undefined, adminToken).data.levels.length, 10);
const member = call('/admin/members', 'POST', { username: 'sara', name: 'Sara', password: 'member-password-1' }, adminToken);
assert.equal(member.status, 201);
const login = call('/auth/login', 'POST', { username: 'sara', password: 'member-password-1' });
assert.equal(login.status, 200);
const memberToken = login.data.token;
assert.deepEqual(call('/me', 'GET', undefined, memberToken).data.levels, ['beginner-1']);
assert.equal(call('/content', 'GET', undefined, memberToken).data.lessons.length, 6);
const grant = call(`/admin/members/${member.data.id}/grants`, 'POST', { levelId: 'beginner-2', months: 1 }, adminToken);
assert.equal(grant.status, 201);
const after = call('/content', 'GET', undefined, memberToken);
assert.ok(after.data.levels.includes('beginner-2'));
assert.equal(after.data.lessons.length, 12);
const extended = call(`/admin/members/${member.data.id}/grants`, 'POST', { levelId: 'beginner-2', months: 2 }, adminToken);
assert.ok(extended.data.expiresAt > grant.data.expiresAt);
assert.equal(call(`/admin/grants/${grant.data.id}`, 'DELETE', undefined, adminToken).data.ok, true);
assert.deepEqual(call('/me', 'GET', undefined, memberToken).data.levels, ['beginner-1']);
assert.equal(call('/admin/members', 'GET', undefined, memberToken).status, 403);
assert.equal(call(`/admin/members/${member.data.id}`, 'PATCH', { active: false }, adminToken).data.ok, true);
assert.equal(call('/me', 'GET', undefined, memberToken).status, 401);
assert.equal(call('/auth/login', 'POST', { username: 'sara', password: 'member-password-1' }).status, 401);
assert.equal(call('/auth/login', 'POST', { username: 'admin', password: 'wrong-password' }).status, 401);
assert.equal(call('/auth/login', 'POST', { username: 'admin', password: 'long-password-1' }).status, 200);
console.log('Apps Script backend verified: setup, login, admin/member roles, timed grants, extension, revocation, disabling and content gating.');
