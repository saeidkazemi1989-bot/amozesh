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
export { normalizeApiBase, isAppsScriptBase } from './apiBase';
import { isAppsScriptBase, normalizeApiBase } from './apiBase';
export class ApiError extends Error { constructor(message: string, public status: number) { super(message); } }

export function getApiBase(): string {
  const configured = (import.meta.env.VITE_API_URL as string | undefined)?.trim();
  const saved = (localStorage.getItem(URL_KEY) ?? '').trim();
  const base = saved || configured || (isNativeApp ? '' : window.location.origin);
  if (!base) return '';
  try {
    const normalized = normalizeApiBase(base);
    // Repair a link that an older version saved in a messy shape.
    if (saved && normalized !== saved) { try { localStorage.setItem(URL_KEY, normalized); } catch { /* storage full or private mode */ } }
    return normalized;
  } catch { return base.replace(/\/+$/, ''); }
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
let lastDiagnostic = '';
export const getLastDiagnostic = () => lastDiagnostic;
const describe = (error: unknown) => (error instanceof Error ? error.message : String(error)).slice(0, 140);
async function postAppsScript(base: string, payload: string, path: string): Promise<{ text: string; status: number }> {
  const failures: string[] = [];
  if (isNativeApp) {
    try {
      const response = await CapacitorHttp.post({ url: base, headers: { 'Content-Type': 'text/plain;charset=utf-8' }, data: payload, responseType: 'text', connectTimeout: 20000, readTimeout: 90000 });
      const text = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
      lastDiagnostic = `${path} · اندروید ${response.status} · ${text.length} نویسه`;
      return { text, status: response.status };
    } catch (error) { failures.push(`اندروید: ${describe(error)}`); }
  }
  try {
    const response = await fetch(base, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: payload, redirect: 'follow', credentials: 'omit' });
    const text = await response.text();
    lastDiagnostic = `${path} · مرورگر ${response.status} · ${text.length} نویسه`;
    return { text, status: response.status };
  } catch (error) { failures.push(`مرورگر: ${describe(error)}`); }
  lastDiagnostic = `${path} · ناموفق · ${failures.join(' | ')}`.slice(0, 220);
  throw new ApiError('اتصال به سرویس گوگل برقرار نشد. اینترنت/فیلترشکن را بررسی کن و یک بار دیگر تلاش کن.', 0);
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
    const { text, status: httpStatus } = await postAppsScript(base, payload, path);
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
