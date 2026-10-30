import { useCallback, useEffect, useRef, useState } from 'react';

export type UpdateStatus = 'idle' | 'checking' | 'available' | 'updating' | 'current' | 'offline' | 'error' | 'unsupported';

const messages: Record<UpdateStatus, string> = {
  idle: 'هر وقت خواستی، خودت بررسی کن. پیشرفتت هنگام به‌روزرسانی پاک نمی‌شود.',
  checking: 'دارم بررسی می‌کنم نسخهٔ تازه‌ای هست یا نه…',
  available: 'نسخهٔ تازه آماده است. هر وقت خواستی، برنامه را به‌روز کن.',
  updating: 'دارم نسخهٔ تازه را باز می‌کنم. پیشرفتت ذخیره شده است…',
  current: 'همین حالا آخرین نسخه را داری؛ چیزی برای دانلود نیست.',
  offline: 'الان آفلاین هستی. تمرین‌ها کار می‌کنند؛ بررسی نسخهٔ تازه اینترنت می‌خواهد.',
  error: 'بررسی کامل نشد. پیشرفتت دست‌نخورده است؛ بعداً دوباره امتحان کن.',
  unsupported: 'این مرورگر به‌روزرسانی داخل برنامه را پشتیبانی نمی‌کند. از نسخهٔ میزبانی‌شده با HTTPS استفاده کن.',
};

export function useAppUpdate() {
  const [status, setStatus] = useState<UpdateStatus>('idle');
  const registration = useRef<ServiceWorkerRegistration | null>(null);
  const applying = useRef(false);
  const disposed = useRef(false);
  const checkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const supported = typeof navigator !== 'undefined' && 'serviceWorker' in navigator && import.meta.env.PROD;

  const clearCheckTimer = useCallback(() => {
    if (checkTimer.current) clearTimeout(checkTimer.current);
    checkTimer.current = null;
  }, []);

  const watch = useCallback((reg: ServiceWorkerRegistration) => {
    if (disposed.current) return;
    registration.current = reg;
    const offer = (worker: ServiceWorker | null) => {
      if (!worker || disposed.current) return;
      if (navigator.serviceWorker.controller) {
        clearCheckTimer();
        setStatus('available');
      } else {
        // First install may activate immediately; later updates wait for the learner.
        worker.postMessage({ type: 'SKIP_WAITING' });
      }
    };
    if (reg.waiting) offer(reg.waiting);
    reg.addEventListener('updatefound', () => {
      const worker = reg.installing;
      if (!worker) return;
      worker.addEventListener('statechange', () => {
        if (worker.state === 'installed') offer(worker);
        if (worker.state === 'redundant' && !disposed.current) {
          clearCheckTimer();
          setStatus((current) => current === 'checking' ? 'error' : current);
        }
      });
    });
  }, [clearCheckTimer]);

  useEffect(() => {
    disposed.current = false;
    if (!supported) { setStatus('unsupported'); return; }
    const sw = navigator.serviceWorker;
    const onControllerChange = () => {
      if (!applying.current) return;
      applying.current = false;
      window.location.reload();
    };
    sw.addEventListener('controllerchange', onControllerChange);
    sw.register('/sw.js', { updateViaCache: 'none' }).then(watch).catch(() => {
      if (!disposed.current) setStatus('error');
    });
    return () => {
      disposed.current = true;
      clearCheckTimer();
      sw.removeEventListener('controllerchange', onControllerChange);
    };
  }, [supported, watch, clearCheckTimer]);

  const checkForUpdate = useCallback(async () => {
    if (!supported) { setStatus('unsupported'); return; }
    if (!navigator.onLine) { setStatus('offline'); return; }
    clearCheckTimer();
    setStatus('checking');
    try {
      const reg = registration.current ?? await navigator.serviceWorker.getRegistration() ?? await navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' });
      watch(reg);
      await reg.update();
      if (reg.waiting && navigator.serviceWorker.controller) { clearCheckTimer(); setStatus('available'); return; }
      if (reg.installing) {
        checkTimer.current = setTimeout(() => setStatus((current) => current === 'checking' ? 'error' : current), 20_000);
        return;
      }
      setStatus('current');
    } catch {
      setStatus(navigator.onLine ? 'error' : 'offline');
    }
  }, [supported, watch, clearCheckTimer]);

  const applyUpdate = useCallback(() => {
    const worker = registration.current?.waiting;
    if (!worker || applying.current) return;
    applying.current = true;
    setStatus('updating');
    worker.postMessage({ type: 'SKIP_WAITING' });
  }, []);

  return { status, message: messages[status], checkForUpdate, applyUpdate, supported };
}

export type AppUpdate = ReturnType<typeof useAppUpdate>;
