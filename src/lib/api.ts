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
export const isAppsScriptBase = (base: string) => /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/i.test(base);
export class ApiError extends Error { constructor(message: string, public status: number) { super(message); } }

export function getApiBase(): string {
  const configured = (import.meta.env.VITE_API_URL as string | undefined)?.trim();
  const saved = localStorage.getItem(URL_KEY)?.trim();
  const base = saved || configured || (isNativeApp ? '' : window.location.origin);
  return base.replace(/\/+$/, '');
}
export function setApiBase(value: string) {
  const url = value.trim().replace(/\/+$/, '');
  if (url && !/^https:\/\/[^\s]+$/i.test(url) && !/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(url)) throw new Error('آدرس سرور باید با https:// شروع شود.');
  localStorage.setItem(URL_KEY, url);
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
    let data: { status?: number; data?: T & { error?: string } };
    try {
      if (isNativeApp) {
        const response = await CapacitorHttp.post({ url: base, headers: { 'Content-Type': 'text/plain;charset=utf-8' }, data: payload, responseType: 'json' });
        data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
      } else {
        const response = await fetch(base, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: payload, redirect: 'follow', credentials: 'omit' });
        data = await response.json();
      }
    } catch { throw new ApiError('اتصال به سرویس گوگل برقرار نشد. اینترنت و لینک Web App را بررسی کن.', 0); }
    const status = data.status ?? 200;
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
