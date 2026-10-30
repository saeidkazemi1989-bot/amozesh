import { useCallback, useEffect, useRef, useState } from 'react';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { isNativeApp } from '../lib/native';

export function useSpeech(slow: boolean) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speaking, setSpeaking] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const englishVoice = voices.find((voice) => voice.lang === 'en-US' && voice.localService)
    ?? voices.find((voice) => voice.lang.startsWith('en'));
  const available = isNativeApp || (supported && !!englishVoice);

  useEffect(() => {
    if (isNativeApp) { setReady(true); return; }
    if (!supported) { setReady(true); return; }
    const synth = window.speechSynthesis;
    const update = () => { setVoices(synth.getVoices()); setReady(true); };
    update();
    synth.addEventListener('voiceschanged', update);
    const timer = window.setTimeout(() => setReady(true), 1800);
    return () => {
      synth.removeEventListener('voiceschanged', update);
      window.clearTimeout(timer);
      synth.cancel();
    };
  }, [supported]);

  const stop = useCallback(() => {
    if (isNativeApp) { void TextToSpeech.stop(); }
    else if (supported) window.speechSynthesis.cancel();
    setSpeaking(null);
  }, [supported]);

  const speak = useCallback((text: string, id = text): boolean => {
    if (isNativeApp) {
      setSpeaking(id);
      void TextToSpeech.speak({ text, lang: 'en-US', rate: slow ? 0.75 : 0.95, pitch: 1, category: 'ambient' })
        .then(() => setSpeaking((current) => current === id ? null : current))
        .catch(() => setSpeaking((current) => current === id ? null : current));
      return true;
    }
    if (!supported || !englishVoice) return false;
    window.speechSynthesis.cancel();
    const next = new SpeechSynthesisUtterance(text);
    next.lang = 'en-US';
    next.voice = englishVoice;
    next.rate = slow ? 0.75 : 0.95;
    next.pitch = 1;
    next.onstart = () => setSpeaking(id);
    next.onend = () => setSpeaking((current) => current === id ? null : current);
    next.onerror = () => setSpeaking((current) => current === id ? null : current);
    utterance.current = next;
    setSpeaking(id);
    window.speechSynthesis.speak(next);
    return true;
  }, [supported, englishVoice, slow]);

  return { speak, stop, speaking, available, ready };
}

export type Speech = ReturnType<typeof useSpeech>;
