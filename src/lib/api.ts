import { SecureStorage } from '@aparajita/capacitor-secure-storage';
import { CapacitorHttp } from '@capacitor/core';
import { isNativeApp } from './native';
import type { Lesson } from '../data/types';

export type Account = { id: string; username: string; name: string; role: 'admin' | 'member' };
export type Grant = { id: string; levelId: string; startsAt: number; expiresAt: number; revokedAt?: number | null };
export type Member = { id: string; username: string; name: string; active: boolean; createdAt: string; grants: Grant[] };
export type Me = { user: Account; serverTime: number; freeLevel: string; levels: string[]; grants: Grant[] };
const URL_KEY = 'ghadam-api-url';
const TOKEN_KEY = 'ghadam-session';
const APPS_TOKEN_KEY = 'ghadam-apps-session';
export function normalizeApiBase(value: string): string {
  const trimmed = value.trim().replace(/\/+$/, '');
  if (!trimmed) return '';
  let url: URL;
  try { url = new URL(trimmed); } catch { throw new Error('آدرس معتبر نیست؛ باید با https:// شروع شود.'); }
  const localHttp = url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname);
  if (url.protocol !== 'https:' && !localHttp) throw new Error('آدرس سرور باید با https:// شروع شود.');
  if (url.hostname === 'script.google.com') {
    const match = url.pathname.match(/^\/macros\/s\/([A-Za-z0-9_-]+)\/(exec|dev)\/?$/);
    if (!match) throw new Error('لینک Web App گوگل معتبر نیست؛ از Manage deployments لینک /exec را کپی کن.');
    if (match[2] === 'dev') throw new Error('لینک /dev فقط برای ویرایشگر است؛ لینک /exec را از Manage deployments کپی کن.');
    return `https://script.google.com/macros/s/${match[1]}/exec`;
  }
  return trimmed.replace(/\/+$/, '');
}
export const isAppsScriptBase = (base: string) => {
  try { const url = new URL(base); return url.protocol === 'https:' && url.hostname === 'script.google.com' && /^\/macros\/s\/[A-Za-z0-9_-]+\/exec\/?$/.test(url.pathname); }
  catch { return false; }
};
export class ApiError extends Error { constructor(message: string, public status: number) { super(message); } }

export function getApiBase(): string {
  const configured = (import.meta.env.VITE_API_URL as string | undefined)?.trim();
  const saved = localStorage.getItem(URL_KEY)?.trim();
  const base = saved || configured || (isNativeApp ? '' : window.location.origin);
  return base.replace(/\/+$/, '');
}
export function setApiBase(value: string) {
  localStorage.setItem(URL_KEY, normalizeApiBase(value));
}
export async function getToken(): Promise<string | null> {
  if (isNativeApp) { const value = await SecureStorage.get(TOKEN_KEY, false); return typeof value === 'string' ? value : null; }
  if (isAppsScriptBase(getApiBase())) return localStorage.getItem(APPS_TOKEN_KEY);
  return null; // The self-hosted web API uses an HttpOnly cookie.
}
export async function setToken(token: string | null) {
  if (isNativeApp) { if (token) await SecureStorage.set(TOKEN_KEY, token); else await SecureStorage.remove(TOKEN_KEY); return; }
  if (isAppsScriptBase(getApiBase())) { if (token) localStorage.setItem(APPS_TOKEN_KEY, token); else localStorage.removeItem(APPS_TOKEN_KEY); }
}
export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const base = getApiBase();
  if (!base) throw new ApiError('اول آدرس سرور قدم را وارد کن.', 0);
  const token = await getToken();
  const headers = new Headers(init.headers);
  if (init.body) headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);
  if (isAppsScriptBase(base)) {
    const payload = JSON.stringify({ path, method: init.method ?? 'GET', body: init.body ? JSON.parse(String(init.body)) : undefined, token: token ?? undefined });
    let text = '';
    let httpStatus = 200;
    try {
      if (isNativeApp) {
        const response = await CapacitorHttp.post({ url: base, headers: { 'Content-Type': 'text/plain;charset=utf-8' }, data: payload, responseType: 'text', connectTimeout: 20000, readTimeout: 20000 });
        httpStatus = response.status;
        text = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
      } else {
        const response = await fetch(base, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: payload, redirect: 'follow', credentials: 'omit' });
        httpStatus = response.status;
        text = await response.text();
      }
    } catch { throw new ApiError('اتصال به سرویس گوگل برقرار نشد. اینترنت/فیلترشکن و لینک /exec را بررسی کن.', 0); }
    let data: { status?: number; data?: T & { error?: string } };
    try { data = JSON.parse(text); }
    catch {
      if (/accounts\.google\.com|ServiceLogin|<html/i.test(text)) throw new ApiError('لینک Web App عمومی نیست. در Deploy، گزینه Who has access را روی Anyone و Execute as را روی Me بگذار و New version بساز.', 401);
      if (httpStatus === 404) throw new ApiError('لینک Web App پیدا نشد؛ لینک /exec را از Manage deployments کپی کن.', 404);
      throw new ApiError('پاسخ گوگل خوانا نیست؛ لینک /exec و دسترسی Anyone را بررسی کن.', httpStatus || 502);
    }
    const status = data.status ?? httpStatus;
    if (status >= 400) throw new ApiError(data.data?.error ?? 'درخواست کامل نشد.', status);
    return data.data as T;
  }
  let response: Response;
  try { response = await fetch(`${base}/api${path}`, { ...init, headers, credentials: 'include' }); }
  catch { throw new ApiError('اتصال به سرور برقرار نشد. اینترنت و آدرس سرور را بررسی کن.', 0); }
  const data = await response.json().catch(() => ({})) as { error?: string };
  if (!response.ok) throw new ApiError(data.error ?? 'درخواست کامل نشد.', response.status);
  return data as T;
}
export async function login(username: string, password: string) {
  const result = await api<{ user: Account; token: string }>('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) });
  await setToken(result.token); return result.user;
}
export async function logout() { try { await api('/auth/logout', { method: 'POST' }); } finally { await setToken(null); } }
export const fetchMe = () => api<Me>('/me');
export const fetchContent = () => api<{ serverTime: number; levels: string[]; lessons: Lesson[] }>('/content');
export const errorMessage = (error: unknown) => error instanceof Error ? error.message : 'خطای ناشناخته';
