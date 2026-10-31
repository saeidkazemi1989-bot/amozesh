import type { Lesson, Phrase } from './types';
import { freeLessons } from './free-lessons';
import { catalogPhraseIds } from './catalog';
export type { Lesson, Phrase } from './types';

// The APK contains only the free level. Entitled levels are fetched from the
// membership server and live in memory; they are never written to local storage.
let authorized: Lesson[] = [];
export let lessons: Lesson[] = [...freeLessons];
export let allPhrases: Phrase[] = lessons.flatMap((lesson) => lesson.phrases);
export const lessonById = new Map(lessons.map((lesson) => [lesson.id, lesson]));
export const phraseById = new Map(allPhrases.map((phrase) => [phrase.id, phrase]));

export function setAuthorizedLessons(next: Lesson[]) {
  const safe = next.filter((lesson) => !freeLessons.some((free) => free.id === lesson.id));
  authorized = safe;
  lessons = [...freeLessons, ...authorized];
  allPhrases = lessons.flatMap((lesson) => lesson.phrases);
  lessonById.clear(); lessons.forEach((lesson) => lessonById.set(lesson.id, lesson));
  phraseById.clear(); allPhrases.forEach((phrase) => phraseById.set(phrase.id, phrase));
}
export function clearAuthorizedLessons() { setAuthorizedLessons([]); }
export function isKnownPhrase(id: string) { return catalogPhraseIds.has(id); }
