import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchContent, fetchMe, getApiBase, getToken, logout as apiLogout, setToken } from '../lib/api';
import type { Account, Grant } from '../lib/api';
import { clearAuthorizedLessons, setAuthorizedLessons, lessonById } from '../data/curriculum';
import type { Progress } from '../lib/learning';
import { isNativeApp } from '../lib/native';

export function useMembership(setProgress: React.Dispatch<React.SetStateAction<Progress>>) {
  const [user, setUser] = useState<Account | null>(null);
  const [levels, setLevels] = useState<string[]>(['beginner-1']);
  const [grants, setGrants] = useState<Grant[]>([]);
  const [ready, setReady] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState('');
  const [revision, setRevision] = useState(0);
  const generation = useRef(0);
  const WEB_SESSION_KEY = 'ghadam-web-session';

  const clearSession = useCallback(() => {
    clearAuthorizedLessons(); setUser(null); setLevels(['beginner-1']); setGrants([]); setRevision((n) => n + 1);
    setProgress((progress) => progress.activeSession?.lessonId && !lessonById.has(progress.activeSession.lessonId) ? { ...progress, activeSession: null } : progress);
  }, [setProgress]);

  const refresh = useCallback(async () => {
    const current = ++generation.current;
    setSyncing(true); setError('');
    try {
      // Avoid noisy 401s for guests. The marker only says "try the HttpOnly cookie";
      // the server still validates the actual session and entitlements.
      if (isNativeApp) { if (!getApiBase() || !(await getToken())) return; }
      else if (!localStorage.getItem(WEB_SESSION_KEY)) return;
      const me = await fetchMe();
      const content = await fetchContent();
      if (current !== generation.current) return;
      setAuthorizedLessons(content.lessons);
      setUser(me.user); setLevels(content.levels); setGrants(me.grants); setRevision((n) => n + 1);
      setProgress((progress) => progress.activeSession?.lessonId && !lessonById.has(progress.activeSession.lessonId) ? { ...progress, activeSession: null } : progress);
    } catch (caught) {
      if (current !== generation.current) return;
      const status = (caught as { status?: number }).status;
      if (status === 401) { clearSession(); localStorage.removeItem(WEB_SESSION_KEY); await setToken(null); }
      else setError(caught instanceof Error ? caught.message : 'بررسی دسترسی ممکن نشد.');
    } finally { if (current === generation.current) { setSyncing(false); setReady(true); } }
  }, [clearSession, setProgress]);

  useEffect(() => {
    void refresh();
    const timer = window.setInterval(() => void refresh(), 5 * 60_000);
    const focus = () => void refresh();
    window.addEventListener('focus', focus);
    return () => { clearInterval(timer); window.removeEventListener('focus', focus); };
  }, [refresh]);

  const loggedIn = useCallback(async () => { if (!isNativeApp) localStorage.setItem(WEB_SESSION_KEY, '1'); await refresh(); }, [refresh]);
  const logout = useCallback(async () => { await apiLogout(); localStorage.removeItem(WEB_SESSION_KEY); clearSession(); }, [clearSession]);
  const hasLevel = useCallback((levelId: string) => user?.role === 'admin' || levels.includes(levelId), [levels, user]);
  const canLesson = useCallback((lessonId: string) => lessonById.has(lessonId), [revision]);
  return { user, levels, grants, ready, syncing, error, revision, refresh, loggedIn, logout, hasLevel, canLesson };
}
export type Membership = ReturnType<typeof useMembership>;
