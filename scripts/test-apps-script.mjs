import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { randomUUID, createHash, createHmac } from 'node:crypto';

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
  deleteRows(row, count) { this.values.splice(row - 1, count); }
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
  getUrl() { return 'https://docs.google.com/spreadsheets/d/test-book/edit'; }
  getSheetByName(name) { return this.sheets.get(name) ?? null; }
  insertSheet(name) { const sheet = new Sheet(name); this.sheets.set(name, sheet); return sheet; }
}
const book = new Book();
let created = false;
const props = new Map();
const cache = new Map();
const context = {
  console,
  Logger: { log() {} },
  SpreadsheetApp: { getActiveSpreadsheet: () => null, openById: () => book, create: () => { created = true; return book; } },
  PropertiesService: { getScriptProperties: () => ({ getProperty: (k) => props.get(k) ?? null, setProperty: (k, v) => props.set(k, v) }) },
  CacheService: { getScriptCache: () => ({ get: (k) => cache.get(k) ?? null, put: (k, v) => cache.set(k, v) }) },
  LockService: { getScriptLock: () => ({ waitLock() {}, releaseLock() {} }) },
  Utilities: {
    getUuid: randomUUID,
    DigestAlgorithm: { SHA_256: 'SHA_256' },
    Charset: { UTF_8: 'UTF_8' },
    computeDigest: (_alg, value) => [...createHash('sha256').update(String(value)).digest()],
    computeHmacSha256Signature: (value, key) => [...createHmac('sha256', String(key)).update(String(value)).digest()]
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
assert.equal(call('/setup-status').status, 500, 'before setup the API asks you to run setup');
context.setup();
assert.equal(created, true, 'standalone Apps Script project creates its own spreadsheet');
assert.equal(props.get('SPREADSHEET_ID'), 'test-book');
assert.equal(call('/setup-status').data.needsSetup, true);
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

// A password saved by the first release (5000 sha256 rounds) still works once,
// then gets replaced by the fast HMAC format so later logins are instant.
const users = book.getSheetByName('Users');
const header = users.getRange(1, 1, 1, users.values[0].length).getValues()[0];
const adminRow = users.values.findIndex((row, i) => i > 0 && row[header.indexOf('username')] === 'admin');
let legacy = 'feedface:' + 'x';
{
  const salt = 'feedface';
  const secret = props.get('SECRET');
  let value = salt + ':' + 'long-password-1' + ':' + secret;
  for (let i = 0; i < 5000; i++) value = createHash('sha256').update(value).digest('hex');
  legacy = salt + ':' + value;
}
users.values[adminRow][header.indexOf('passwordHash')] = legacy;
assert.equal(call('/auth/login', 'POST', { username: 'admin', password: 'wrong-password' }).status, 401, 'old hash still rejects a wrong password');
const upgraded = call('/auth/login', 'POST', { username: 'admin', password: 'long-password-1' });
assert.equal(upgraded.status, 200, 'old password hash still logs in');
assert.ok(String(users.values[adminRow][header.indexOf('passwordHash')]).includes('$1$'), 'login rewrites the hash in the fast format');
assert.equal(call('/auth/login', 'POST', { username: 'admin', password: 'long-password-1' }).status, 200);

// resetAdmin clears accounts and hands out a fresh setup token.
context.resetAdmin();
assert.equal(call('/setup-status').data.needsSetup, true);
assert.notEqual(props.get('SETUP_TOKEN'), setupToken);
assert.equal(call('/setup', 'POST', { setupToken, username: 'admin', name: 'Admin', password: 'long-password-1' }).status, 403);
assert.equal(call('/setup', 'POST', { setupToken: props.get('SETUP_TOKEN'), username: 'admin', name: 'Admin', password: 'long-password-1' }).status, 201);
console.log('Apps Script backend verified: setup, login, admin/member roles, timed grants, extension, revocation, disabling, content gating, old-password upgrade and admin reset.');
