import { useEffect, useId, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowLeft, Check, Coffee, Heart, Volume2, X } from 'lucide-react';
import type { Phrase } from '../data/curriculum';
import type { Speech } from '../hooks/useSpeech';

export function Logo({ small = false }: { small?: boolean }) {
  return <div className={`brand ${small ? 'brand-small' : ''}`}>
    <span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none"><path d="M13 35V24a11 11 0 0 1 22 0v11" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/><path d="M24 15c-8 0-11-5-10-10 7 0 11 4 10 10Z" fill="#C9DEA4"/><circle cx="35" cy="36" r="3.5" fill="#E8B37D"/></svg></span>
    <div><span className="brand-name">قَدَم</span><span className="brand-tagline">انگلیسی، کم‌کم</span></div>
  </div>;
}

export function Modal({ title, children, onClose, className = '' }: { title: string; children: ReactNode; onClose: () => void; className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { element?.close(); document.body.style.overflow = previous; };
  }, []);
  return <dialog ref={dialog} className={`modal ${className}`} aria-labelledby={titleId}
    onCancel={(event) => { event.preventDefault(); onClose(); }}
    onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="modal-inner">
      <div className="modal-heading"><h2 id={titleId}>{title}</h2><button className="icon-button" aria-label="بستن" onClick={onClose}><X size={20}/></button></div>
      {children}
    </div>
  </dialog>;
}

export function AudioButton({ phrase, speech, showPronunciation = false, large = false }: { phrase: Phrase; speech: Speech; showPronunciation?: boolean; large?: boolean }) {
  const active = speech.speaking === phrase.id;
  const [unavailable, setUnavailable] = useState(false);
  return <div className={`audio-wrap ${large ? 'audio-large' : ''}`}>
    <button className={`audio-button ${active ? 'is-speaking' : ''}`} onClick={() => setUnavailable(!speech.speak(phrase.en, phrase.id))}
      aria-label={`شنیدن تلفظ ${phrase.en}`} title={speech.available ? 'تلفظ انگلیسی' : 'پخش صدا در این مرورگر در دسترس نیست'}>
      <Volume2 size={large ? 29 : 19}/>{large && <span>{active ? 'در حال پخش…' : 'بشنو'}</span>}
    </button>
    {showPronunciation && <span className="pronunciation" dir="rtl">{phrase.pronunciation}</span>}
    {unavailable && <span className="audio-unavailable" role="status">صدا در این مرورگر در دسترس نیست؛ راهنمای تلفظ فارسی را بخوان.</span>}
  </div>;
}

export function EmptyState({ title, description, action, onAction }: { title: string; description: string; action?: string; onAction?: () => void }) {
  return <div className="empty-state"><span className="empty-icon"><Coffee size={32} strokeWidth={1.5}/></span><h3>{title}</h3><p>{description}</p>
    {action && <button className="button button-primary" onClick={onAction}>{action}<ArrowLeft size={18}/></button>}
  </div>;
}

export function Toggle({ checked, onChange, label, description }: { checked: boolean; onChange: () => void; label: string; description: string }) {
  return <div className="setting-row"><div><strong>{label}</strong><p>{description}</p></div><button type="button" role="switch" aria-checked={checked} aria-label={label} className={`toggle ${checked ? 'on' : ''}`} onClick={onChange}><span>{checked && <Check size={12}/>}</span></button></div>;
}

export function Reassurance() {
  return <div className="reassurance"><Heart size={15}/><span>اینجا مسابقه نیست؛ هر قدمی که برداری ارزشمنده.</span></div>;
}
