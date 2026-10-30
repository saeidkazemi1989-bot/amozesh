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
  icon: 'hello' | 'user' | 'heart' | 'coffee' | 'ear' | 'map' | 'home' | 'sun' | 'bag' | 'clock' | 'smile' | 'chat';
  color: 'sage' | 'peach' | 'lavender' | 'yellow' | 'blue';
  phrases: Phrase[];
};

export const lessons: Lesson[] = [
  {
    id: 'hello', title: 'از یه سلام شروع کنیم', subtitle: 'سلام و احوال‌پرسی', icon: 'hello', color: 'sage',
    phrases: [
      { id: 'hello-1', en: 'Hello!', fa: 'سلام!', pronunciation: 'هِلُو', tip: 'هم برای دوست، هم برای کسی که تازه می‌بینی. یک لبخند کوچک هم کافی است.' },
      { id: 'hello-2', en: 'How are you?', fa: 'حالت چطوره؟', pronunciation: 'هاو آر یو', tip: 'بعد از سلام می‌توانی این سؤال ساده را بپرسی. are در این جمله «هستی» معنی می‌دهد.' },
      { id: 'hello-3', en: "I'm fine, thank you.", fa: 'خوبم، ممنون.', pronunciation: 'آیم فاین، تَنک یو', tip: "I'm کوتاه‌شدهٔ I am است؛ یعنی «من هستم». لازم نیست همیشه جوابمان همین باشد!" },
    ],
  },
  {
    id: 'introduce', title: 'این منم!', subtitle: 'آشنایی با خودت', icon: 'user', color: 'peach',
    phrases: [
      { id: 'introduce-1', en: 'My name is Sara.', fa: 'اسم من ساراست.', pronunciation: 'مای نِیم ایز سارا', tip: 'به‌جای Sara اسم خودت را بگذار. My name is یعنی «اسم من ... است».' },
      { id: 'introduce-2', en: "I'm from Iran.", fa: 'من اهل ایرانم.', pronunciation: 'آیم فرام ایران', tip: 'from یعنی «از». با I am from می‌توانی بگویی اهل کجا هستی.' },
      { id: 'introduce-3', en: 'Nice to meet you.', fa: 'از آشنایی با تو خوشحالم.', pronunciation: 'نایس تو میت یو', tip: 'وقتی برای اولین بار کسی را می‌بینی، این جملهٔ کوتاه خیلی کاربرد دارد.' },
    ],
  },
  {
    id: 'polite', title: 'چند کلمهٔ مهربون', subtitle: 'لطفاً، ممنون، ببخشید', icon: 'heart', color: 'lavender',
    phrases: [
      { id: 'polite-1', en: 'Please.', fa: 'لطفاً.', pronunciation: 'پلیز', tip: 'آخر درخواستت please بگو. همین یک کلمه جمله را مؤدبانه‌تر می‌کند.' },
      { id: 'polite-2', en: 'Excuse me.', fa: 'ببخشید.', pronunciation: 'ایکسکیوز می', tip: 'برای جلب توجه یا ردشدن از کنار کسی. برای عذرخواهی می‌توانی I am sorry بگویی.' },
      { id: 'polite-3', en: "You're welcome.", fa: 'خواهش می‌کنم.', pronunciation: 'یور وِلکام', tip: "یکی از جواب‌های thank you است. You're یعنی you are؛ اینجا معنی تحت‌اللفظی لازم نیست." },
    ],
  },
  {
    id: 'cafe', title: 'یه قهوه، لطفاً', subtitle: 'در کافه', icon: 'coffee', color: 'yellow',
    phrases: [
      { id: 'cafe-1', en: 'A coffee, please.', fa: 'یک قهوه، لطفاً.', pronunciation: 'ا کافی، پلیز', tip: 'A پیش یک چیز تکی می‌آید. برای چای بگو A tea, please.' },
      { id: 'cafe-2', en: 'How much is it?', fa: 'قیمتش چنده؟', pronunciation: 'هاو ماچ ایز ایت', tip: 'How much یعنی «چقدر». برای پرسیدن قیمت یک چیز از it استفاده می‌کنیم.' },
      { id: 'cafe-3', en: 'Here you are.', fa: 'بفرمایید.', pronunciation: 'هیر یو آر', tip: 'وقتی چیزی را به کسی می‌دهی، می‌توانی این عبارت را بگویی.' },
    ],
  },
  {
    id: 'understand', title: 'نفهمیدم؟ اشکالی نداره', subtitle: 'وقتی نیاز به تکرار داری', icon: 'ear', color: 'blue',
    phrases: [
      { id: 'understand-1', en: "I don't understand.", fa: 'متوجه نمی‌شوم.', pronunciation: 'آی دُنت آندِراستَند', tip: "don't یعنی «نمی‌...». فهمیدن مهم‌تر از وانمودکردن به فهمیدن است." },
      { id: 'understand-2', en: 'Please speak slowly.', fa: 'لطفاً آهسته صحبت کنید.', pronunciation: 'پلیز اِسپیک اِسلُوولی', tip: 'slowly یعنی «آهسته». می‌توانی فقط بگویی Slowly, please.' },
      { id: 'understand-3', en: 'What does this mean?', fa: 'این چه معنی‌ای می‌دهد؟', pronunciation: 'وات داز دیس مین', tip: 'وقتی معنی یک کلمه را نمی‌دانی، به آن اشاره کن و این را بپرس.' },
    ],
  },
  {
    id: 'directions', title: 'کدوم طرف برم؟', subtitle: 'آدرس پرسیدن', icon: 'map', color: 'sage',
    phrases: [
      { id: 'directions-1', en: 'Where is the bus stop?', fa: 'ایستگاه اتوبوس کجاست؟', pronunciation: 'وِر ایز دِ باس اِستاپ', tip: 'Where is یعنی «کجاست؟». the به یک ایستگاه مشخص اشاره می‌کند.' },
      { id: 'directions-2', en: 'Turn left.', fa: 'به چپ بپیچ.', pronunciation: 'تِرن لِفت', tip: 'left یعنی چپ. برای راست بگو Turn right.' },
      { id: 'directions-3', en: "It's near here.", fa: 'این نزدیک است.', pronunciation: 'ایتس نیر هیر', tip: 'near یعنی نزدیک و here یعنی اینجا. یک جواب کوتاه و کاربردی.' },
    ],
  },
  {
    id: 'about', title: 'کمی از زندگی من', subtitle: 'دربارهٔ خودت بگو', icon: 'home', color: 'peach',
    phrases: [
      { id: 'about-1', en: 'I live in Iran.', fa: 'من در ایران زندگی می‌کنم.', pronunciation: 'آی لیو این ایران', tip: 'برای کشور یا شهر، قبل از اسم آن in می‌آوریم. live here یعنی «زندگی می‌کنم».' },
      { id: 'about-2', en: 'I work in a shop.', fa: 'من در یک مغازه کار می‌کنم.', pronunciation: 'آی وِرک این ا شاپ', tip: 'work یعنی کارکردن. می‌توانی آن را با I study، یعنی «درس می‌خوانم»، عوض کنی.' },
      { id: 'about-3', en: 'I have one brother.', fa: 'من یک برادر دارم.', pronunciation: 'آی هَو وان بِرادِر', tip: 'have یعنی «داشتن». sister یعنی خواهر؛ نیازی نیست جملهٔ نمونه دربارهٔ خودت درست باشد.' },
    ],
  },
  {
    id: 'routine', title: 'هر روزِ من', subtitle: 'کارهای روزمره', icon: 'sun', color: 'yellow',
    phrases: [
      { id: 'routine-1', en: 'I drink tea.', fa: 'من چای می‌نوشم.', pronunciation: 'آی درینک تی', tip: 'در انگلیسی اول می‌گوییم «من»، بعد کار، بعد چیز دیگری: I drink tea.' },
      { id: 'routine-2', en: 'I read books.', fa: 'من کتاب می‌خوانم.', pronunciation: 'آی رید بوکس', tip: 'read در زمان حال «رید» گفته می‌شود. s آخر books نشانهٔ بیشتر از یکی است.' },
      { id: 'routine-3', en: 'I go to work.', fa: 'من به سر کار می‌روم.', pronunciation: 'آی گُو تو وِرک', tip: 'go to work یک عبارت آماده برای «به سر کار رفتن» است؛ اینجا the لازم نیست.' },
    ],
  },
  {
    id: 'shopping', title: 'یه خرید کوچیک', subtitle: 'در فروشگاه', icon: 'bag', color: 'lavender',
    phrases: [
      { id: 'shopping-1', en: 'Can I try this on?', fa: 'می‌توانم این را امتحان کنم؟', pronunciation: 'کَن آی ترای دیس آن', tip: 'try on یعنی لباس را پوشیدن برای دیدن اندازه‌اش. برای امتحان غذا فقط try می‌گوییم.' },
      { id: 'shopping-2', en: 'Do you have a smaller size?', fa: 'سایز کوچک‌تر دارید؟', pronunciation: 'دو یو هَو ا اِسمالِر سایز', tip: 'smaller یعنی کوچک‌تر. larger یعنی بزرگ‌تر.' },
      { id: 'shopping-3', en: "I'll take it.", fa: 'همین را می‌خرم.', pronunciation: 'آیل تِیک ایت', tip: "I'll کوتاه‌شدهٔ I will است. در فروشگاه این جمله یعنی «این را برمی‌دارم»." },
    ],
  },
  {
    id: 'time', title: 'الان ساعت چنده؟', subtitle: 'زمان و قرار کوتاه', icon: 'clock', color: 'blue',
    phrases: [
      { id: 'time-1', en: 'What time is it?', fa: 'ساعت چنده؟', pronunciation: 'وات تایم ایز ایت', tip: 'برای پرسیدن ساعت از What time استفاده می‌کنیم؛ جواب می‌تواند It is three باشد.' },
      { id: 'time-2', en: "It's three o'clock.", fa: 'ساعت سه است.', pronunciation: 'ایتس تری اِکلاک', tip: "o'clock فقط برای ساعت کامل است. ساعت سه و نیم می‌شود three thirty." },
      { id: 'time-3', en: 'See you tomorrow.', fa: 'فردا می‌بینمت.', pronunciation: 'سی یو تومارُو', tip: 'یک خداحافظی دوستانه وقتی قرار است فردا همدیگر را ببینید.' },
    ],
  },
  {
    id: 'feelings', title: 'امروز چه حسی داری؟', subtitle: 'احساس‌های ساده', icon: 'smile', color: 'peach',
    phrases: [
      { id: 'feelings-1', en: "I'm tired today.", fa: 'امروز خسته‌ام.', pronunciation: 'آیم تایِرد تودِی', tip: 'tired یعنی خسته. حتی در روز خسته هم یک تمرین خیلی کوچک کافی است.' },
      { id: 'feelings-2', en: 'I feel happy.', fa: 'احساس خوشحالی می‌کنم.', pronunciation: 'آی فیل هَپی', tip: 'feel یعنی «احساس کردن». happy یعنی خوشحال.' },
      { id: 'feelings-3', en: 'That sounds good.', fa: 'به نظر خوب می‌آید.', pronunciation: 'دَت ساوندز گود', tip: 'برای استقبال از یک پیشنهاد عالی است؛ مثلاً وقتی کسی می‌گوید «برویم چای بخوریم؟».' },
    ],
  },
  {
    id: 'conversation', title: 'بیا یه کم گپ بزنیم', subtitle: 'یک گفت‌وگوی دوستانه', icon: 'chat', color: 'sage',
    phrases: [
      { id: 'conversation-1', en: 'Are you free today?', fa: 'امروز وقتت آزاده؟', pronunciation: 'آر یو فری تودِی', tip: 'free اینجا یعنی «آزاد، بدون برنامه»، نه «مجانی».' },
      { id: 'conversation-2', en: "Let's go for a walk.", fa: 'بیا برای پیاده‌روی برویم.', pronunciation: 'لِتس گُو فُر ا واک', tip: "Let's یعنی «بیا ... کنیم». go for a walk یعنی «برای پیاده‌روی رفتن»." },
      { id: 'conversation-3', en: 'Have a nice day!', fa: 'روز خوبی داشته باشی!', pronunciation: 'هَو ا نایس دِی', tip: 'یک خداحافظی گرم. می‌توانی آخر هر گفت‌وگو از آن استفاده کنی.' },
    ],
  },
];

export const allPhrases = lessons.flatMap((lesson) => lesson.phrases);
export const phraseById = new Map(allPhrases.map((phrase) => [phrase.id, phrase]));
export const lessonById = new Map(lessons.map((lesson) => [lesson.id, lesson]));
