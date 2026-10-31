import test from 'node:test';
import assert from 'node:assert/strict';
import { openDb } from './db';
import { addMonthsClamped, activeLevelIds, entitledLessons } from './access';
import { hashPassword, createSession, sessionUser, verifyPassword } from './auth';

test('calendar months clamp month ends and extend from expiry', () => {
  const jan31 = Date.UTC(2026, 0, 31, 12);
  assert.equal(new Date(addMonthsClamped(jan31, 1)).toISOString().slice(0, 10), '2026-02-28');
  assert.equal(new Date(addMonthsClamped(Date.UTC(2028, 0, 31), 1)).toISOString().slice(0, 10), '2028-02-29');
  assert.equal(new Date(addMonthsClamped(jan31, 12)).toISOString().slice(0, 10), '2027-01-31');
});
test('password hashing and sessions are server-side', () => {
  const db = openDb(':memory:');
  const hash = hashPassword('a-long-secret-123');
  assert.ok(verifyPassword('a-long-secret-123', hash)); assert.ok(!verifyPassword('wrong', hash));
  db.prepare('INSERT INTO users(id,username,name,password_hash,role,created_at) VALUES(?,?,?,?,?,?)').run('u1', 'sara', 'Sara', hash, 'member', new Date().toISOString());
  const token = createSession(db, 'u1');
  assert.equal(sessionUser(db, token)?.id, 'u1'); assert.equal(sessionUser(db, 'bad'), null);
  db.prepare('UPDATE users SET active=0 WHERE id=?').run('u1'); assert.equal(sessionUser(db, token), null);
});
test('level access is free level plus unexpired grants; admin sees all', () => {
  const db = openDb(':memory:'); const now = Date.now();
  db.prepare('INSERT INTO users(id,username,name,password_hash,role,created_at) VALUES(?,?,?,?,?,?)').run('u1', 'sara', 'Sara', 'x', 'member', new Date().toISOString());
  db.prepare('INSERT INTO grants(id,user_id,level_id,starts_at,expires_at,created_by,created_at) VALUES(?,?,?,?,?,?,?)').run('g1', 'u1', 'advanced-1', now - 1000, now + 10000, 'admin', new Date().toISOString());
  db.prepare('INSERT INTO grants(id,user_id,level_id,starts_at,expires_at,created_by,created_at) VALUES(?,?,?,?,?,?,?)').run('g2', 'u1', 'professional', now - 2000, now - 1000, 'admin', new Date().toISOString());
  const user = { id: 'u1', role: 'member' };
  assert.deepEqual(activeLevelIds(db, user, now).sort(), ['advanced-1', 'beginner-1']);
  assert.equal(entitledLessons(db, user, now).length, 12);
  assert.equal(activeLevelIds(db, user, now + 20000).includes('advanced-1'), false);
  assert.equal(activeLevelIds(db, { id: 'admin', role: 'admin' }, now).length, 10);
});
