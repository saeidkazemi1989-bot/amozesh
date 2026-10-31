import type { Lesson } from './types';

// Only the free beginner level ships inside the app. Other levels are delivered by the membership API.
export const freeLessons: Lesson[] = [
  {
    id: 'hello', title: 'از یه سلام شروع کنیم', subtitle: 'سلام و احوال‌پرسی', icon: 'hello', color: 'sage', levelId: 'beginner-1',
    phrases: [
      { id: 'hello-1', en: 'Hello!', fa: 'سلام!', pronunciation: 'هِلُو', tip: 'هم برای دوست، هم برای کسی که تازه می‌بینی. یک لبخند کوچک هم کافی است.' },
      { id: 'hello-2', en: 'How are you?', fa: 'حالت چطوره؟', pronunciation: 'هاو آر یو', tip: 'بعد از سلام می‌توانی این سؤال ساده را بپرسی. are در این جمله «هستی» معنی می‌دهد.' },
      { id: 'hello-3', en: "I'm fine, thank you.", fa: 'خوبم، ممنون.', pronunciation: 'آیم فاین، تَنک یو', tip: "I'm کوتاه‌شدهٔ I am است؛ یعنی «من هستم». لازم نیست همیشه جوابمان همین باشد!" },
    ],
  },
  {
    id: 'introduce', title: 'این منم!', subtitle: 'آشنایی با خودت', icon: 'user', color: 'peach', levelId: 'beginner-1',
    phrases: [
      { id: 'introduce-1', en: 'My name is Sara.', fa: 'اسم من ساراست.', pronunciation: 'مای نِیم ایز سارا', tip: 'به‌جای Sara اسم خودت را بگذار. My name is یعنی «اسم من ... است».' },
      { id: 'introduce-2', en: "I'm from Iran.", fa: 'من اهل ایرانم.', pronunciation: 'آیم فرام ایران', tip: 'from یعنی «از». با I am from می‌توانی بگویی اهل کجا هستی.' },
      { id: 'introduce-3', en: 'Nice to meet you.', fa: 'از آشنایی با تو خوشحالم.', pronunciation: 'نایس تو میت یو', tip: 'وقتی برای اولین بار کسی را می‌بینی، این جملهٔ کوتاه خیلی کاربرد دارد.' },
    ],
  },
  {
    id: 'polite', title: 'چند کلمهٔ مهربون', subtitle: 'لطفاً، ممنون، ببخشید', icon: 'heart', color: 'lavender', levelId: 'beginner-1',
    phrases: [
      { id: 'polite-1', en: 'Please.', fa: 'لطفاً.', pronunciation: 'پلیز', tip: 'آخر درخواستت please بگو. همین یک کلمه جمله را مؤدبانه‌تر می‌کند.' },
      { id: 'polite-2', en: 'Excuse me.', fa: 'ببخشید.', pronunciation: 'ایکسکیوز می', tip: 'برای جلب توجه یا ردشدن از کنار کسی. برای عذرخواهی می‌توانی I am sorry بگویی.' },
      { id: 'polite-3', en: "You're welcome.", fa: 'خواهش می‌کنم.', pronunciation: 'یور وِلکام', tip: "یکی از جواب‌های thank you است. You're یعنی you are؛ اینجا معنی تحت‌اللفظی لازم نیست." },
    ],
  },
  {
    id: 'cafe', title: 'یه قهوه، لطفاً', subtitle: 'در کافه', icon: 'coffee', color: 'yellow', levelId: 'beginner-1',
    phrases: [
      { id: 'cafe-1', en: 'A coffee, please.', fa: 'یک قهوه، لطفاً.', pronunciation: 'ا کافی، پلیز', tip: 'A پیش یک چیز تکی می‌آید. برای چای بگو A tea, please.' },
      { id: 'cafe-2', en: 'How much is it?', fa: 'قیمتش چنده؟', pronunciation: 'هاو ماچ ایز ایت', tip: 'How much یعنی «چقدر». برای پرسیدن قیمت یک چیز از it استفاده می‌کنیم.' },
      { id: 'cafe-3', en: 'Here you are.', fa: 'بفرمایید.', pronunciation: 'هیر یو آر', tip: 'وقتی چیزی را به کسی می‌دهی، می‌توانی این عبارت را بگویی.' },
    ],
  },
  {
    id: 'understand', title: 'نفهمیدم؟ اشکالی نداره', subtitle: 'وقتی نیاز به تکرار داری', icon: 'ear', color: 'blue', levelId: 'beginner-1',
    phrases: [
      { id: 'understand-1', en: "I don't understand.", fa: 'متوجه نمی‌شوم.', pronunciation: 'آی دُنت آندِراستَند', tip: "don't یعنی «نمی‌...». فهمیدن مهم‌تر از وانمودکردن به فهمیدن است." },
      { id: 'understand-2', en: 'Please speak slowly.', fa: 'لطفاً آهسته صحبت کنید.', pronunciation: 'پلیز اِسپیک اِسلُوولی', tip: 'slowly یعنی «آهسته». می‌توانی فقط بگویی Slowly, please.' },
      { id: 'understand-3', en: 'What does this mean?', fa: 'این چه معنی‌ای می‌دهد؟', pronunciation: 'وات داز دیس مین', tip: 'وقتی معنی یک کلمه را نمی‌دانی، به آن اشاره کن و این را بپرس.' },
    ],
  },
  {
    id: 'numbers', title: 'عددها رو یاد بگیر', subtitle: 'شمارش و عددهای پایه', icon: 'numbers', color: 'blue', levelId: 'beginner-1',
    phrases: [
      { id: 'numbers-1', en: 'One, two, three.', fa: 'یک، دو، سه.', pronunciation: 'وان، تو، تری', tip: 'این سه عدد پایه هستند. three را «تری» بگو، نه «سری».' },
      { id: 'numbers-2', en: 'I am thirty years old.', fa: 'من سی ساله هستم.', pronunciation: 'آی اَم تِرتی ییرز اُلد', tip: 'برای گفتن سن از I am ... years old استفاده می‌کنیم. عدد دلخواهت را جای thirty بگذار.' },
      { id: 'numbers-3', en: 'How old are you?', fa: 'چند سالته؟', pronunciation: 'هاو اُلد آر یو', tip: 'یک سؤال رایج برای پرسیدن سن. در فرهنگ انگلیسی‌زبان گاهی پرسیدن سن مؤدبانه نیست.' },
    ],
  },
];
