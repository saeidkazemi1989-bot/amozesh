import { randomBytes, scryptSync, timingSafeEqual, createHash } from 'node:crypto';
import type { DB } from './db';

const SESSION_MS = 30 * 86400_000;
export function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;
}
export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, 'hex');
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}
export const tokenHash = (token: string) => createHash('sha256').update(token).digest('hex');
export function createSession(db: DB, userId: string) {
  const token = randomBytes(32).toString('base64url');
  db.prepare('INSERT INTO sessions(token_hash,user_id,expires_at,created_at) VALUES(?,?,?,?)')
    .run(tokenHash(token), userId, Date.now() + SESSION_MS, new Date().toISOString());
  return token;
}
export function sessionUser(db: DB, token?: string) {
  if (!token) return null;
  const row = db.prepare(`SELECT u.id,u.username,u.name,u.role,u.active FROM sessions s JOIN users u ON u.id=s.user_id
    WHERE s.token_hash=? AND s.expires_at>?`).get(tokenHash(token), Date.now()) as Record<string, unknown> | undefined;
  if (!row || !row.active) return null;
  return { id: String(row.id), username: String(row.username), name: String(row.name), role: String(row.role) as 'admin' | 'member' };
}
export type User = NonNullable<ReturnType<typeof sessionUser>>;
export function deleteSession(db: DB, token?: string) { if (token) db.prepare('DELETE FROM sessions WHERE token_hash=?').run(tokenHash(token)); }
export function audit(db: DB, actor: string, action: string, detail: unknown) {
  db.prepare('INSERT INTO audit(at,actor,action,detail) VALUES(?,?,?,?)').run(new Date().toISOString(), actor, action, JSON.stringify(detail));
}
