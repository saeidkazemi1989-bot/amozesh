import type { DB } from './db';
import { lessons } from './content/curriculum';
import { levels } from './levels';

export const FREE_LEVEL = 'beginner-1';
export function activeGrants(db: DB, userId: string, now = Date.now()) {
  return db.prepare(`SELECT id,level_id,starts_at,expires_at FROM grants
    WHERE user_id=? AND revoked_at IS NULL AND starts_at<=? AND expires_at>? ORDER BY level_id`).all(userId, now, now) as { id: string; level_id: string; starts_at: number; expires_at: number }[];
}
export function activeLevelIds(db: DB, user: { id: string; role: string }, now = Date.now()) {
  if (user.role === 'admin') return levels.map((level) => level.id);
  return [...new Set([FREE_LEVEL, ...activeGrants(db, user.id, now).map((grant) => grant.level_id)])];
}
export function entitledLessons(db: DB, user: { id: string; role: string }, now = Date.now()) {
  const allowed = new Set(activeLevelIds(db, user, now));
  return lessons.filter((lesson) => allowed.has(lesson.levelId));
}
export function addMonthsClamped(start: number, months: number) {
  const date = new Date(start);
  const day = date.getUTCDate();
  date.setUTCDate(1); date.setUTCMonth(date.getUTCMonth() + months);
  const last = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  date.setUTCDate(Math.min(day, last));
  return date.getTime();
}
