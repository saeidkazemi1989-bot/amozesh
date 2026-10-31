export type Phrase = {
  id: string;
  en: string;
  fa: string;
  pronunciation: string;
  tip: string;
};

export type Lesson = {
  id: string;
  title: string;
  subtitle: string;
  icon: 'hello' | 'user' | 'heart' | 'coffee' | 'ear' | 'map' | 'home' | 'sun' | 'bag' | 'clock' | 'smile' | 'chat' | 'numbers' | 'family' | 'food' | 'weather' | 'health' | 'travel' | 'phone' | 'hobby' | 'calendar' | 'school' | 'animals' | 'clothes' | 'house' | 'help' | 'restaurant' | 'transport' | 'party' | 'tech';
  color: 'sage' | 'peach' | 'lavender' | 'yellow' | 'blue';
  levelId: string;
  phrases: Phrase[];
};
