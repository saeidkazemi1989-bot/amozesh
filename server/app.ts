import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit';
import { randomUUID } from 'node:crypto';
import type { DB } from './db';
import { audit, createSession, deleteSession, hashPassword, sessionUser, verifyPassword } from './auth';
import type { User } from './auth';
import { activeGrants, activeLevelIds, addMonthsClamped, entitledLessons, FREE_LEVEL } from './access';
import { levels, lessonCatalog } from '../src/data/catalog';

declare global { namespace Express { interface Request { user?: User; token?: string } } }
const LEVEL_IDS = new Set<string>(levels.map((level) => level.id));
const validPassword = (value: unknown): value is string => typeof value === 'string' && value.length >= 10 && value.length <= 128;
const validUsername = (value: unknown): value is string => typeof value === 'string' && /^[a-zA-Z0-9._-]{3,40}$/.test(value);
const validName = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0 && value.trim().length <= 60;

export function createApp(db: DB, options: { setupToken?: string; secureCookie?: boolean; trustProxy?: boolean } = {}) {
  const app = express();
  if (options.trustProxy) app.set('trust proxy', 1);
  app.disable('x-powered-by');
  app.use(helmet({ contentSecurityPolicy: { directives: { defaultSrc: ["'self'"], scriptSrc: ["'self'"], styleSrc: ["'self'", "'unsafe-inline'"], imgSrc: ["'self'", 'data:'], fontSrc: ["'self'"], connectSrc: ["'self'"], mediaSrc: ["'self'"], objectSrc: ["'none'"], frameAncestors: ["'self'"] } }, crossOriginEmbedderPolicy: false }));
  app.use(express.json({ limit: '32kb' }));
  app.use(cookieParser());
  app.use('/api', (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    const origin = req.headers.origin;
    const allowed = process.env.CORS_ORIGINS?.split(',').map((s) => s.trim()).filter(Boolean) ?? [];
    if (origin && (allowed.includes(origin) || origin === 'https://localhost' || origin === 'capacitor://localhost')) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
    }
    if (req.method === 'OPTIONS') { res.sendStatus(204); return; }
    // Cookie-authenticated writes must come from an allowed web origin; native uses bearer tokens.
    if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method) && !req.headers.authorization && origin && !allowed.includes(origin) && origin !== `https://${req.headers.host}` && origin !== `http://${req.headers.host}`) {
      res.status(403).json({ error: 'درخواست از این مبدأ مجاز نیست.' }); return;
    }
    next();
  });
  const loginLimiter = rateLimit({ windowMs: 15 * 60_000, limit: 20, standardHeaders: 'draft-7', legacyHeaders: false, message: { error: 'تلاش‌های زیاد؛ کمی بعد دوباره امتحان کن.' } });
  const apiLimiter = rateLimit({ windowMs: 60_000, limit: 240, standardHeaders: 'draft-7', legacyHeaders: false });
  app.use('/api', apiLimiter);
  const auth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const bearer = req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.slice(7) : undefined;
    const token = bearer ?? req.cookies?.ghadam_session;
    const user = sessionUser(db, token);
    if (!user) { res.status(401).json({ error: 'وارد حساب کاربری شو.' }); return; }
    req.user = user; req.token = token; next();
  };
  const admin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.user?.role !== 'admin') { res.status(403).json({ error: 'این بخش فقط برای مدیر است.' }); return; }
    next();
  };
  const setCookie = (res: express.Response, token: string) => res.cookie('ghadam_session', token, { httpOnly: true, sameSite: 'lax', secure: options.secureCookie ?? process.env.NODE_ENV === 'production', maxAge: 30 * 86400_000, path: '/' });

  app.get('/api/health', (_req, res) => { res.json({ ok: true, service: 'ghadam-membership' }); });
  app.get('/api/catalog', (_req, res) => { res.json({ levels, lessons: lessonCatalog, freeLevel: FREE_LEVEL }); });
  app.get('/api/setup-status', (_req, res) => {
    const row = db.prepare("SELECT COUNT(*) n FROM users WHERE role='admin'").get() as { n: number };
    res.json({ needsSetup: row.n === 0 });
  });
  app.post('/api/setup', loginLimiter, (req, res) => {
    const row = db.prepare("SELECT COUNT(*) n FROM users WHERE role='admin'").get() as { n: number };
    if (row.n > 0) { res.status(409).json({ error: 'حساب مدیر قبلاً ساخته شده است.' }); return; }
    if (!options.setupToken || req.body?.setupToken !== options.setupToken) { res.status(403).json({ error: 'کد راه‌اندازی درست نیست.' }); return; }
    const { username, name, password } = req.body ?? {};
    if (!validUsername(username) || !validName(name) || !validPassword(password)) { res.status(400).json({ error: 'نام کاربری انگلیسی ۳ تا ۴۰ نویسه، نام نمایشی و رمز حداقل ۱۰ نویسه لازم است.' }); return; }
    const id = randomUUID();
    db.prepare('INSERT INTO users(id,username,name,password_hash,role,created_at) VALUES(?,?,?,?,?,?)').run(id, username, name.trim(), hashPassword(password), 'admin', new Date().toISOString());
    audit(db, username, 'setup', {});
    const token = createSession(db, id); setCookie(res, token);
    res.status(201).json({ user: sessionUser(db, token), token });
  });
  app.post('/api/auth/login', loginLimiter, (req, res) => {
    const { username, password } = req.body ?? {};
    if (typeof username !== 'string' || typeof password !== 'string') { res.status(400).json({ error: 'نام کاربری و رمز را وارد کن.' }); return; }
    const row = db.prepare('SELECT * FROM users WHERE username=?').get(username) as Record<string, unknown> | undefined;
    if (!row || !row.active || !verifyPassword(password, String(row.password_hash))) { res.status(401).json({ error: 'نام کاربری یا رمز درست نیست، یا حساب غیرفعال است.' }); return; }
    const token = createSession(db, String(row.id)); setCookie(res, token);
    res.json({ user: sessionUser(db, token), token });
  });
  app.post('/api/auth/logout', auth, (req, res) => { deleteSession(db, req.token); res.clearCookie('ghadam_session'); res.json({ ok: true }); });
  app.get('/api/me', auth, (req, res) => {
    const user = req.user!;
    res.json({ user, serverTime: Date.now(), freeLevel: FREE_LEVEL, levels: activeLevelIds(db, user), grants: activeGrants(db, user.id).map((g) => ({ id: g.id, levelId: g.level_id, startsAt: g.starts_at, expiresAt: g.expires_at })) });
  });
  app.get('/api/content', auth, (req, res) => { res.json({ serverTime: Date.now(), levels: activeLevelIds(db, req.user!), lessons: entitledLessons(db, req.user!) }); });
  app.get('/api/access/:lessonId', auth, (req, res) => {
    const lesson = lessonCatalog.find((item) => item.id === req.params.lessonId);
    if (!lesson) { res.status(404).json({ error: 'درس پیدا نشد.' }); return; }
    const allowed = activeLevelIds(db, req.user!).includes(lesson.levelId);
    res.json({ allowed, levelId: lesson.levelId, serverTime: Date.now() });
  });
  app.post('/api/auth/password', auth, loginLimiter, (req, res) => {
    const { currentPassword, newPassword } = req.body ?? {};
    const row = db.prepare('SELECT password_hash FROM users WHERE id=?').get(req.user!.id) as { password_hash: string };
    if (typeof currentPassword !== 'string' || !verifyPassword(currentPassword, row.password_hash) || !validPassword(newPassword)) { res.status(400).json({ error: 'رمز فعلی یا رمز تازه معتبر نیست؛ رمز تازه حداقل ۱۰ نویسه باشد.' }); return; }
    db.prepare('UPDATE users SET password_hash=? WHERE id=?').run(hashPassword(newPassword), req.user!.id);
    db.prepare('DELETE FROM sessions WHERE user_id=?').run(req.user!.id);
    audit(db, req.user!.username, 'password.change', {});
    const token = createSession(db, req.user!.id); setCookie(res, token); res.json({ ok: true, token });
  });

  app.get('/api/admin/members', auth, admin, (_req, res) => {
    const users = db.prepare("SELECT id,username,name,active,created_at FROM users WHERE role='member' ORDER BY created_at DESC").all() as Record<string, unknown>[];
    const grants = db.prepare('SELECT * FROM grants ORDER BY created_at DESC').all() as Record<string, unknown>[];
    res.json({ members: users.map((u) => ({ id: u.id, username: u.username, name: u.name, active: !!u.active, createdAt: u.created_at, grants: grants.filter((g) => g.user_id === u.id).map((g) => ({ id: g.id, levelId: g.level_id, startsAt: g.starts_at, expiresAt: g.expires_at, revokedAt: g.revoked_at })) })), levels });
  });
  app.post('/api/admin/members', auth, admin, (req, res) => {
    const { username, name, password } = req.body ?? {};
    if (!validUsername(username) || !validName(name) || !validPassword(password)) { res.status(400).json({ error: 'نام کاربری انگلیسی ۳ تا ۴۰ نویسه، نام نمایشی و رمز حداقل ۱۰ نویسه لازم است.' }); return; }
    const id = randomUUID();
    try { db.prepare("INSERT INTO users(id,username,name,password_hash,role,created_at) VALUES(?,?,?,?, 'member',?)").run(id, username, name.trim(), hashPassword(password), new Date().toISOString()); }
    catch { res.status(409).json({ error: 'این نام کاربری قبلاً استفاده شده است.' }); return; }
    audit(db, req.user!.username, 'member.create', { id, username });
    res.status(201).json({ id, username, name: name.trim() });
  });
  app.patch('/api/admin/members/:id', auth, admin, (req, res) => {
    const target = db.prepare("SELECT id,username FROM users WHERE id=? AND role='member'").get(String(req.params.id)) as { id: string; username: string } | undefined;
    if (!target) { res.status(404).json({ error: 'عضو پیدا نشد.' }); return; }
    const { name, active, password } = req.body ?? {};
    if (name !== undefined && !validName(name)) { res.status(400).json({ error: 'نام معتبر نیست.' }); return; }
    if (active !== undefined && typeof active !== 'boolean') { res.status(400).json({ error: 'وضعیت معتبر نیست.' }); return; }
    if (password !== undefined && !validPassword(password)) { res.status(400).json({ error: 'رمز تازه حداقل ۱۰ نویسه باشد.' }); return; }
    if (name !== undefined) db.prepare('UPDATE users SET name=? WHERE id=?').run(name.trim(), target.id);
    if (active !== undefined) db.prepare('UPDATE users SET active=? WHERE id=?').run(active ? 1 : 0, target.id);
    if (password !== undefined) { db.prepare('UPDATE users SET password_hash=? WHERE id=?').run(hashPassword(password), target.id); db.prepare('DELETE FROM sessions WHERE user_id=?').run(target.id); }
    if (active === false) db.prepare('DELETE FROM sessions WHERE user_id=?').run(target.id);
    audit(db, req.user!.username, 'member.update', { id: target.id, name, active, passwordReset: password !== undefined });
    res.json({ ok: true });
  });
  app.post('/api/admin/members/:id/grants', auth, admin, (req, res) => {
    const target = db.prepare("SELECT id,username FROM users WHERE id=? AND role='member'").get(String(req.params.id)) as { id: string } | undefined;
    if (!target) { res.status(404).json({ error: 'عضو پیدا نشد.' }); return; }
    const { levelId, months } = req.body ?? {};
    if (typeof levelId !== 'string' || !LEVEL_IDS.has(levelId) || !Number.isInteger(months) || months < 1 || months > 36) { res.status(400).json({ error: 'سطح و مدت ۱ تا ۳۶ ماه را انتخاب کن.' }); return; }
    const now = Date.now();
    const current = activeGrants(db, target.id, now).find((g) => g.level_id === levelId);
    const startsAt = current ? current.starts_at : now;
    const base = current ? Math.max(now, current.expires_at) : now;
    const expiresAt = addMonthsClamped(base, months);
    let id: string;
    if (current) {
      id = current.id;
      db.prepare('UPDATE grants SET expires_at=? WHERE id=?').run(expiresAt, id);
    } else {
      id = randomUUID();
      db.prepare('INSERT INTO grants(id,user_id,level_id,starts_at,expires_at,created_by,created_at) VALUES(?,?,?,?,?,?,?)').run(id, target.id, levelId, startsAt, expiresAt, req.user!.username, new Date().toISOString());
    }
    audit(db, req.user!.username, current ? 'grant.extend' : 'grant.create', { memberId: target.id, levelId, months, expiresAt });
    res.status(201).json({ id, levelId, startsAt, expiresAt });
  });
  app.delete('/api/admin/grants/:id', auth, admin, (req, res) => {
    const grant = db.prepare('SELECT id,user_id,level_id FROM grants WHERE id=? AND revoked_at IS NULL').get(String(req.params.id)) as { id: string; user_id: string; level_id: string } | undefined;
    if (!grant) { res.status(404).json({ error: 'دسترسی پیدا نشد.' }); return; }
    db.prepare('UPDATE grants SET revoked_at=? WHERE id=?').run(Date.now(), grant.id);
    audit(db, req.user!.username, 'grant.revoke', grant);
    res.json({ ok: true });
  });
  app.get('/api/admin/audit', auth, admin, (_req, res) => { res.json({ entries: db.prepare('SELECT * FROM audit ORDER BY id DESC LIMIT 100').all() }); });
  app.use('/api', (_req, res) => { res.status(404).json({ error: 'این مسیر وجود ندارد.' }); });
  app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(error); res.status(500).json({ error: 'خطای سرور؛ کمی بعد دوباره تلاش کن.' });
  });
  return app;
}
