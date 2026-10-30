import { useCallback, useEffect, useState } from 'react';

type InstallPrompt = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

export function useInstallApp() {
  const [prompt, setPrompt] = useState<InstallPrompt | null>(null);
  const [installed, setInstalled] = useState(false);
  const [outcome, setOutcome] = useState<'accepted' | 'dismissed' | null>(null);

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true;
    setInstalled(standalone);
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setPrompt(event as InstallPrompt);
    };
    const onInstalled = () => { setInstalled(true); setPrompt(null); setOutcome('accepted'); };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const install = useCallback(async () => {
    if (!prompt) return false;
    try {
      await prompt.prompt();
      const choice = await prompt.userChoice;
      setOutcome(choice.outcome);
      if (choice.outcome === 'accepted') setPrompt(null);
      return choice.outcome === 'accepted';
    } catch {
      setOutcome('dismissed');
      return false;
    }
  }, [prompt]);

  return { canInstall: !!prompt, installed, outcome, install };
}

export type InstallApp = ReturnType<typeof useInstallApp>;
