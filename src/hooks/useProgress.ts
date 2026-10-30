import { useLayoutEffect, useState } from 'react';
import { createProgress, parseProgress, STORAGE_KEY } from '../lib/learning';
import type { Progress } from '../lib/learning';

function load(): { progress: Progress; notice: string } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { progress: createProgress(), notice: '' };
    const progress = parseProgress(raw);
    if (progress) return { progress, notice: '' };
    return { progress: createProgress(), notice: 'پیشرفت قبلی خوانده نشد. یک شروع تازه برایت آماده کردیم.' };
  } catch {
    return { progress: createProgress(), notice: 'ذخیره‌سازی مرورگر در دسترس نیست؛ تمرین می‌توانی بکنی، اما پیشرفت ممکن است ذخیره نشود.' };
  }
}

export function useProgress() {
  const [initial] = useState(load);
  const [progress, setProgress] = useState<Progress>(initial.progress);
  const [storageError, setStorageError] = useState(false);
  // Commit before paint so leaving or reloading immediately after an answer keeps it.
  useLayoutEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [progress]);
  return { progress, setProgress, storageError, initialNotice: initial.notice };
}
