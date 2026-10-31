import type { Lesson } from '../../src/data/types';
export type { Lesson } from '../../src/data/types';

export const lessons: Lesson[] = [
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
    id: 'directions', title: 'کدوم طرف برم؟', subtitle: 'آدرس پرسیدن', icon: 'map', color: 'sage', levelId: 'beginner-3',
    phrases: [
      { id: 'directions-1', en: 'Where is the bus stop?', fa: 'ایستگاه اتوبوس کجاست؟', pronunciation: 'وِر ایز دِ باس اِستاپ', tip: 'Where is یعنی «کجاست؟». the به یک ایستگاه مشخص اشاره می‌کند.' },
      { id: 'directions-2', en: 'Turn left.', fa: 'به چپ بپیچ.', pronunciation: 'تِرن لِفت', tip: 'left یعنی چپ. برای راست بگو Turn right.' },
      { id: 'directions-3', en: "It's near here.", fa: 'این نزدیک است.', pronunciation: 'ایتس نیر هیر', tip: 'near یعنی نزدیک و here یعنی اینجا. یک جواب کوتاه و کاربردی.' },
    ],
  },
  {
    id: 'about', title: 'کمی از زندگی من', subtitle: 'دربارهٔ خودت بگو', icon: 'home', color: 'peach', levelId: 'intermediate-1',
    phrases: [
      { id: 'about-1', en: 'I live in Iran.', fa: 'من در ایران زندگی می‌کنم.', pronunciation: 'آی لیو این ایران', tip: 'برای کشور یا شهر، قبل از اسم آن in می‌آوریم. live here یعنی «زندگی می‌کنم».' },
      { id: 'about-2', en: 'I work in a shop.', fa: 'من در یک مغازه کار می‌کنم.', pronunciation: 'آی وِرک این ا شاپ', tip: 'work یعنی کارکردن. می‌توانی آن را با I study، یعنی «درس می‌خوانم»، عوض کنی.' },
      { id: 'about-3', en: 'I have one brother.', fa: 'من یک برادر دارم.', pronunciation: 'آی هَو وان بِرادِر', tip: 'have یعنی «داشتن». sister یعنی خواهر؛ نیازی نیست جملهٔ نمونه دربارهٔ خودت درست باشد.' },
    ],
  },
  {
    id: 'routine', title: 'هر روزِ من', subtitle: 'کارهای روزمره', icon: 'sun', color: 'yellow', levelId: 'intermediate-1',
    phrases: [
      { id: 'routine-1', en: 'I drink tea.', fa: 'من چای می‌نوشم.', pronunciation: 'آی درینک تی', tip: 'در انگلیسی اول می‌گوییم «من»، بعد کار، بعد چیز دیگری: I drink tea.' },
      { id: 'routine-2', en: 'I read books.', fa: 'من کتاب می‌خوانم.', pronunciation: 'آی رید بوکس', tip: 'read در زمان حال «رید» گفته می‌شود. s آخر books نشانهٔ بیشتر از یکی است.' },
      { id: 'routine-3', en: 'I go to work.', fa: 'من به سر کار می‌روم.', pronunciation: 'آی گُو تو وِرک', tip: 'go to work یک عبارت آماده برای «به سر کار رفتن» است؛ اینجا the لازم نیست.' },
    ],
  },
  {
    id: 'shopping', title: 'یه خرید کوچیک', subtitle: 'در فروشگاه', icon: 'bag', color: 'lavender', levelId: 'beginner-3',
    phrases: [
      { id: 'shopping-1', en: 'Can I try this on?', fa: 'می‌توانم این را امتحان کنم؟', pronunciation: 'کَن آی ترای دیس آن', tip: 'try on یعنی لباس را پوشیدن برای دیدن اندازه‌اش. برای امتحان غذا فقط try می‌گوییم.' },
      { id: 'shopping-2', en: 'Do you have a smaller size?', fa: 'سایز کوچک‌تر دارید؟', pronunciation: 'دو یو هَو ا اِسمالِر سایز', tip: 'smaller یعنی کوچک‌تر. larger یعنی بزرگ‌تر.' },
      { id: 'shopping-3', en: "I'll take it.", fa: 'همین را می‌خرم.', pronunciation: 'آیل تِیک ایت', tip: "I'll کوتاه‌شدهٔ I will است. در فروشگاه این جمله یعنی «این را برمی‌دارم»." },
    ],
  },
  {
    id: 'time', title: 'الان ساعت چنده؟', subtitle: 'زمان و قرار کوتاه', icon: 'clock', color: 'blue', levelId: 'beginner-2',
    phrases: [
      { id: 'time-1', en: 'What time is it?', fa: 'ساعت چنده؟', pronunciation: 'وات تایم ایز ایت', tip: 'برای پرسیدن ساعت از What time استفاده می‌کنیم؛ جواب می‌تواند It is three باشد.' },
      { id: 'time-2', en: "It's three o'clock.", fa: 'ساعت سه است.', pronunciation: 'ایتس تری اِکلاک', tip: "o'clock فقط برای ساعت کامل است. ساعت سه و نیم می‌شود three thirty." },
      { id: 'time-3', en: 'See you tomorrow.', fa: 'فردا می‌بینمت.', pronunciation: 'سی یو تومارُو', tip: 'یک خداحافظی دوستانه وقتی قرار است فردا همدیگر را ببینید.' },
    ],
  },
  {
    id: 'feelings', title: 'امروز چه حسی داری؟', subtitle: 'احساس‌های ساده', icon: 'smile', color: 'peach', levelId: 'intermediate-1',
    phrases: [
      { id: 'feelings-1', en: "I'm tired today.", fa: 'امروز خسته‌ام.', pronunciation: 'آیم تایِرد تودِی', tip: 'tired یعنی خسته. حتی در روز خسته هم یک تمرین خیلی کوچک کافی است.' },
      { id: 'feelings-2', en: 'I feel happy.', fa: 'احساس خوشحالی می‌کنم.', pronunciation: 'آی فیل هَپی', tip: 'feel یعنی «احساس کردن». happy یعنی خوشحال.' },
      { id: 'feelings-3', en: 'That sounds good.', fa: 'به نظر خوب می‌آید.', pronunciation: 'دَت ساوندز گود', tip: 'برای استقبال از یک پیشنهاد عالی است؛ مثلاً وقتی کسی می‌گوید «برویم چای بخوریم؟».' },
    ],
  },
  {
    id: 'conversation', title: 'بیا یه کم گپ بزنیم', subtitle: 'یک گفت‌وگوی دوستانه', icon: 'chat', color: 'sage', levelId: 'intermediate-1',
    phrases: [
      { id: 'conversation-1', en: 'Are you free today?', fa: 'امروز وقتت آزاده؟', pronunciation: 'آر یو فری تودِی', tip: 'free اینجا یعنی «آزاد، بدون برنامه»، نه «مجانی».' },
      { id: 'conversation-2', en: "Let's go for a walk.", fa: 'بیا برای پیاده‌روی برویم.', pronunciation: 'لِتس گُو فُر ا واک', tip: "Let's یعنی «بیا ... کنیم». go for a walk یعنی «برای پیاده‌روی رفتن»." },
      { id: 'conversation-3', en: 'Have a nice day!', fa: 'روز خوبی داشته باشی!', pronunciation: 'هَو ا نایس دِی', tip: 'یک خداحافظی گرم. می‌توانی آخر هر گفت‌وگو از آن استفاده کنی.' },
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
  {
    id: 'family', title: 'خانوادهٔ من', subtitle: 'اعضای خانواده', icon: 'family', color: 'peach', levelId: 'beginner-2',
    phrases: [
      { id: 'family-1', en: 'This is my mother.', fa: 'این مادرم است.', pronunciation: 'دیس ایز مای مادِر', tip: 'mother یعنی مادر. father یعنی پدر. this is یعنی «این ... است».' },
      { id: 'family-2', en: 'I have two sisters.', fa: 'من دو خواهر دارم.', pronunciation: 'آی هَو تو سیستِرز', tip: 'sister یعنی خواهر. s آخر نشانهٔ بیشتر از یکی است. brother یعنی برادر.' },
      { id: 'family-3', en: 'Do you have children?', fa: 'بچه داری؟', pronunciation: 'دو یو هَو چیلدرِن', tip: 'children جمع child است؛ یعنی بچه‌ها. این جمع بی‌قاعده است و s نمی‌گیرد.' },
    ],
  },
  {
    id: 'food', title: 'گشنمه!', subtitle: 'غذا و خوردنی‌ها', icon: 'food', color: 'yellow', levelId: 'beginner-2',
    phrases: [
      { id: 'food-1', en: "I'm hungry.", fa: 'گشنمه.', pronunciation: 'آیم هانگری', tip: 'hungry یعنی گرسنه. thirsty یعنی تشنه. هر دو با I am می‌آیند.' },
      { id: 'food-2', en: 'I like rice and chicken.', fa: 'من برنج و مرغ دوست دارم.', pronunciation: 'آی لایک رایس اَند چیکن', tip: 'like یعنی «دوست داشتن». rice یعنی برنج و chicken یعنی مرغ.' },
      { id: 'food-3', en: "I don't eat meat.", fa: 'من گوشت نمی‌خورم.', pronunciation: 'آی دُنت ایت میت', tip: "don't eat یعنی «نمی‌خورم». meat یعنی گوشت. برای گیاه‌خواری بگو I am vegetarian." },
    ],
  },
  {
    id: 'weather', title: 'هوا چطوره؟', subtitle: 'آب و هوا', icon: 'weather', color: 'blue', levelId: 'beginner-3',
    phrases: [
      { id: 'weather-1', en: "It's sunny today.", fa: 'امروز هوا آفتابی است.', pronunciation: 'ایتس سانی تودِی', tip: 'sunny یعنی آفتابی. rainy یعنی بارانی. cloudy یعنی ابری.' },
      { id: 'weather-2', en: "It's very cold.", fa: 'خیلی سرده.', pronunciation: 'ایتس وِری کُلد', tip: 'cold یعنی سرد. hot یعنی گرم. very یعنی «خیلی».' },
      { id: 'weather-3', en: 'Is it going to rain?', fa: 'قراره بارون بیاد؟', pronunciation: 'ایز ایت گُوئینگ تو رِین', tip: 'going to برای آیندهٔ نزدیک استفاده می‌شود. rain یعنی باران.' },
    ],
  },
  {
    id: 'health', title: 'حالم خوب نیست', subtitle: 'سلامتی و دکتر', icon: 'health', color: 'lavender', levelId: 'beginner-3',
    phrases: [
      { id: 'health-1', en: 'I have a headache.', fa: 'سردرد دارم.', pronunciation: 'آی هَو ا هِدِیک', tip: 'headache یعنی سردرد. stomachache یعنی دل‌درد. هر دو با I have می‌آیند.' },
      { id: 'health-2', en: 'I need a doctor.', fa: 'دکتر لازم دارم.', pronunciation: 'آی نید ا داکتِر', tip: 'need یعنی «نیاز داشتن». a doctor یعنی «یک دکتر».' },
      { id: 'health-3', en: 'Where is the pharmacy?', fa: 'داروخانه کجاست؟', pronunciation: 'وِر ایز دِ فارمِسی', tip: 'pharmacy یعنی داروخانه. در آمریکا drugstore هم می‌گویند.' },
    ],
  },
  {
    id: 'travel', title: 'سفر می‌خوام برم', subtitle: 'در فرودگاه و هتل', icon: 'travel', color: 'sage', levelId: 'intermediate-2',
    phrases: [
      { id: 'travel-1', en: 'Where is gate five?', fa: 'گیت پنج کجاست؟', pronunciation: 'وِر ایز گِیت فایو', tip: 'gate یعنی دروازهٔ سوارشدن. شمارهٔ گیت روی بلیطت نوشته شده.' },
      { id: 'travel-2', en: 'I have a reservation.', fa: 'من رزرو دارم.', pronunciation: 'آی هَو ا رِزِروِیشِن', tip: 'reservation یعنی رزرو. در هتل یا رستوران این جمله خیلی کاربرد دارد.' },
      { id: 'travel-3', en: 'Can I see your passport?', fa: 'می‌توانم پاسپورتتان را ببینم؟', pronunciation: 'کَن آی سی یور پَسپورت', tip: 'این جمله را معمولاً مأمور فرودگاه یا هتل می‌گوید. passport یعنی گذرنامه.' },
    ],
  },
  {
    id: 'phone', title: 'الو؟ صدات میاد', subtitle: 'مکالمهٔ تلفنی', icon: 'phone', color: 'yellow', levelId: 'intermediate-1',
    phrases: [
      { id: 'phone-1', en: 'Hello, who is this?', fa: 'سلام، شما کی هستید؟', pronunciation: 'هِلُو، هو ایز دیس', tip: 'پشت تلفن نمی‌گوییم who are you؛ می‌گوییم who is this.' },
      { id: 'phone-2', en: 'Can I call you back?', fa: 'می‌توانم بعداً زنگ بزنم؟', pronunciation: 'کَن آی کال یو بَک', tip: 'call back یعنی «دوباره زنگ زدن». وقتی سرت شلوغ است این جمله عالی است.' },
      { id: 'phone-3', en: 'The line is busy.', fa: 'خط اشغال است.', pronunciation: 'دِ لاین ایز بیزی', tip: 'busy اینجا یعنی «اشغال». line یعنی خط تلفن.' },
    ],
  },
  {
    id: 'hobby', title: 'وقت آزاد چیکار می‌کنی؟', subtitle: 'سرگرمی و علایق', icon: 'hobby', color: 'peach', levelId: 'intermediate-1',
    phrases: [
      { id: 'hobby-1', en: 'I like watching movies.', fa: 'فیلم دیدن دوست دارم.', pronunciation: 'آی لایک واچینگ موویز', tip: 'بعد از like فعل با ing می‌آید: watching, reading, cooking.' },
      { id: 'hobby-2', en: 'Do you play any sports?', fa: 'ورزشی انجام می‌دی؟', pronunciation: 'دو یو پِلِی اِنی اِسپورتس', tip: 'play sports یعنی «ورزش کردن». any در سؤال یعنی «هیچ / یک».' },
      { id: 'hobby-3', en: 'I enjoy cooking.', fa: 'از آشپزی لذت می‌برم.', pronunciation: 'آی اینجوی کوکینگ', tip: 'enjoy هم مثل like با فعل ing می‌آید. enjoy یعنی «لذت بردن».' },
    ],
  },
  {
    id: 'calendar', title: 'چه روزی از هفته‌ست؟', subtitle: 'روزها و ماه‌ها', icon: 'calendar', color: 'lavender', levelId: 'beginner-2',
    phrases: [
      { id: 'calendar-1', en: 'Today is Monday.', fa: 'امروز دوشنبه است.', pronunciation: 'تودِی ایز ماندِی', tip: 'روزهای هفته در انگلیسی با حرف بزرگ شروع می‌شوند: Monday, Tuesday, ...' },
      { id: 'calendar-2', en: 'My birthday is in March.', fa: 'تولدم در مارس است.', pronunciation: 'مای بِرث‌دِی ایز این مارچ', tip: 'برای ماه از in استفاده می‌کنیم. March یعنی مارس (حدود اسفند-فروردین).' },
      { id: 'calendar-3', en: 'See you on Friday.', fa: 'جمعه می‌بینمت.', pronunciation: 'سی یو آن فرایدِی', tip: 'برای روز هفته از on استفاده می‌کنیم: on Monday, on Friday.' },
    ],
  },
  {
    id: 'school', title: 'دارم یاد می‌گیرم', subtitle: 'در کلاس و مدرسه', icon: 'school', color: 'blue', levelId: 'intermediate-2',
    phrases: [
      { id: 'school-1', en: "I'm learning English.", fa: 'دارم انگلیسی یاد می‌گیرم.', pronunciation: 'آیم لِرنینگ اینگلیش', tip: 'am + فعل ing یعنی «دارم ... می‌کنم» — همین الان!' },
      { id: 'school-2', en: 'Can you help me?', fa: 'می‌تونی کمکم کنی؟', pronunciation: 'کَن یو هِلپ می', tip: 'help یعنی کمک. این جمله در هر موقعیتی کاربرد دارد.' },
      { id: 'school-3', en: 'How do you spell that?', fa: 'هجیش چطور می‌شه؟', pronunciation: 'هاو دو یو اِسپِل دَت', tip: 'spell یعنی «هجی کردن». وقتی کلمه‌ای را نمی‌دانی چطور بنویسی، این را بپرس.' },
    ],
  },
  {
    id: 'animals', title: 'حیوونای بامزه', subtitle: 'حیوانات', icon: 'animals', color: 'sage', levelId: 'intermediate-2',
    phrases: [
      { id: 'animals-1', en: 'I have a cat.', fa: 'من یک گربه دارم.', pronunciation: 'آی هَو ا کَت', tip: 'cat یعنی گربه. dog یعنی سگ. bird یعنی پرنده.' },
      { id: 'animals-2', en: 'The dog is very friendly.', fa: 'سگ خیلی مهربان است.', pronunciation: 'دِ داگ ایز وِری فرِندلی', tip: 'friendly یعنی «دوستانه، مهربان». friend یعنی دوست.' },
      { id: 'animals-3', en: 'Are you afraid of animals?', fa: 'از حیوانات می‌ترسی؟', pronunciation: 'آر یو اَفرِید آو اَنیمالز', tip: 'afraid of یعنی «ترسیدن از». animals جمع animal است.' },
    ],
  },
  {
    id: 'clothes', title: 'چی بپوشم؟', subtitle: 'لباس و پوشاک', icon: 'clothes', color: 'peach', levelId: 'beginner-2',
    phrases: [
      { id: 'clothes-1', en: 'I like your shirt.', fa: 'از پیرهنت خوشم اومده.', pronunciation: 'آی لایک یور شِرت', tip: 'shirt یعنی پیراهن. تعریف از لباس کسی یک شروع خوب برای مکالمه است.' },
      { id: 'clothes-2', en: 'What color do you want?', fa: 'چه رنگی می‌خوای؟', pronunciation: 'وات کالِر دو یو وانت', tip: 'color یعنی رنگ. red, blue, green, black, white رنگ‌های پایه هستند.' },
      { id: 'clothes-3', en: 'These shoes are comfortable.', fa: 'این کفش‌ها راحت هستند.', pronunciation: 'دیز شوز آر کامفِتِبِل', tip: 'shoes همیشه جمع است چون دو تاست. comfortable یعنی راحت.' },
    ],
  },
  {
    id: 'house', title: 'خونهٔ من', subtitle: 'اتاق‌ها و وسایل خانه', icon: 'house', color: 'yellow', levelId: 'beginner-2',
    phrases: [
      { id: 'house-1', en: 'The kitchen is small.', fa: 'آشپزخانه کوچک است.', pronunciation: 'دَ کیچِن ایز اِسمال', tip: 'kitchen یعنی آشپزخانه. bathroom یعنی حمام. bedroom یعنی اتاق خواب.' },
      { id: 'house-2', en: 'Please close the door.', fa: 'لطفاً در را ببند.', pronunciation: 'پلیز کلُوز دِ دور', tip: 'close یعنی بستن. open یعنی باز کردن. door یعنی در.' },
      { id: 'house-3', en: 'The keys are on the table.', fa: 'کلیدها روی میز هستند.', pronunciation: 'دَ کیز آر آن دِ تِیبِل', tip: 'on یعنی «روی». keys جمع key است. table یعنی میز.' },
    ],
  },
  {
    id: 'help', title: 'یه کمک کوچیک می‌خوام', subtitle: 'درخواست کمک', icon: 'help', color: 'lavender', levelId: 'beginner-3',
    phrases: [
      { id: 'help-1', en: 'Can you show me?', fa: 'می‌تونی بهم نشون بدی؟', pronunciation: 'کَن یو شُو می', tip: 'show یعنی «نشان دادن». وقتی نمی‌دانی چیزی کجاست یا چطور کار می‌کند.' },
      { id: 'help-2', en: "I'm lost.", fa: 'گم شدم.', pronunciation: 'آیم لاست', tip: 'lost یعنی گم‌شده. در شهر غریب این جمله خیلی مهم است!' },
      { id: 'help-3', en: 'Could you take a photo of me?', fa: 'می‌شه ازم عکس بگیری؟', pronunciation: 'کود یو تِیک ا فُوتُو آو می', tip: 'could مؤدبانه‌تر از can است. take a photo یعنی عکس گرفتن.' },
    ],
  },
  {
    id: 'restaurant', title: 'منو لطفاً!', subtitle: 'در رستوران', icon: 'restaurant', color: 'sage', levelId: 'intermediate-2',
    phrases: [
      { id: 'restaurant-1', en: 'A table for two, please.', fa: 'یک میز برای دو نفر، لطفاً.', pronunciation: 'ا تِیبِل فُر تو، پلیز', tip: 'وقتی وارد رستوران می‌شوی این جمله را بگو. عدد را عوض کن.' },
      { id: 'restaurant-2', en: "What do you recommend?", fa: 'چی پیشنهاد می‌دی؟', pronunciation: 'وات دو یو رِکِمِند', tip: 'recommend یعنی «پیشنهاد دادن». از گارسون بپرس چه غذایی خوب است.' },
      { id: 'restaurant-3', en: 'The bill, please.', fa: 'صورتحساب، لطفاً.', pronunciation: 'دِ بیل، پلیز', tip: 'bill یعنی صورتحساب. در آمریکا check هم می‌گویند.' },
    ],
  },
  {
    id: 'transport', title: 'سوار شیم بریم', subtitle: 'حمل و نقل', icon: 'transport', color: 'blue', levelId: 'beginner-3',
    phrases: [
      { id: 'transport-1', en: 'How do I get to the station?', fa: 'چطور به ایستگاه برسم؟', pronunciation: 'هاو دو آی گِت تو دِ اِستِیشِن', tip: 'How do I get to یعنی «چطور برسم به». station یعنی ایستگاه.' },
      { id: 'transport-2', en: 'One ticket, please.', fa: 'یک بلیط، لطفاً.', pronunciation: 'وان تیکِت، پلیز', tip: 'ticket یعنی بلیط. round trip یعنی رفت و برگشت. one way یعنی یک‌طرفه.' },
      { id: 'transport-3', en: 'How long does it take?', fa: 'چقدر طول می‌کشه؟', pronunciation: 'هاو لانگ داز ایت تِیک', tip: 'How long یعنی «چقدر». take اینجا یعنی «طول کشیدن».' },
    ],
  },
  {
    id: 'party', title: 'تولدت مبارک!', subtitle: 'جشن و مناسبت‌ها', icon: 'party', color: 'peach', levelId: 'intermediate-2',
    phrases: [
      { id: 'party-1', en: 'Happy birthday!', fa: 'تولدت مبارک!', pronunciation: 'هَپی بِرث‌دِی', tip: 'ساده‌ترین و رایج‌ترین تبریک تولد. می‌توانی اسم شخص را هم اضافه کنی.' },
      { id: 'party-2', en: 'Congratulations!', fa: 'تبریک می‌گم!', pronunciation: 'کِنگرَچولِیشِنز', tip: 'برای هر موفقیت: عروسی، فارغ‌التحصیلی، کار جدید. همیشه جمع با s.' },
      { id: 'party-3', en: 'Would you like to come?', fa: 'دوست داری بیای؟', pronunciation: 'وود یو لایک تو کام', tip: 'Would you like مؤدبانه‌تر از Do you want است. برای دعوت عالی است.' },
    ],
  },
  {
    id: 'tech', title: 'گوشیم کو؟', subtitle: 'تکنولوژی و اینترنت', icon: 'tech', color: 'lavender', levelId: 'intermediate-2',
    phrases: [
      { id: 'tech-1', en: "What's the WiFi password?", fa: 'رمز وای‌فای چیه؟', pronunciation: 'واتس دِ وای‌فای پَسوِرد', tip: 'password یعنی رمز عبور. در کافه، هتل یا خانهٔ کسی این سؤال خیلی رایج است.' },
      { id: 'tech-2', en: 'My phone is dead.', fa: 'گوشیم خاموش شده.', pronunciation: 'مای فُن ایز دِد', tip: 'dead اینجا یعنی «باتری تمام شده»..charge یعنی شارژ کردن.' },
      { id: 'tech-3', en: 'Can I use your charger?', fa: 'می‌تونم از شارژرت استفاده کنم؟', pronunciation: 'کَن آی یوز یور چارجِر', tip: 'charger یعنی شارژر. use یعنی «استفاده کردن».' },
    ],
  },

  {
    id: 'opinions', title: 'نظر من اینه', subtitle: 'بیان نظر ساده', icon: 'chat', color: 'sage', levelId: 'intermediate-3',
    phrases: [
      { id: 'opinions-1', en: 'In my opinion, it is useful.', fa: 'به نظر من مفید است.', pronunciation: 'این مای اِپینیِن، ایت ایز یوسفول', tip: 'In my opinion یعنی «به نظر من». برای شروع یک نظر ساده عالی است.' },
      { id: 'opinions-2', en: 'I agree with you.', fa: 'با تو موافقم.', pronunciation: 'آی اَگری ویت یو', tip: 'agree with یعنی «موافق بودن با». مخالف: I disagree.' },
      { id: 'opinions-3', en: 'I see your point, but I disagree.', fa: 'منظورت را می‌فهمم، اما مخالفم.', pronunciation: 'آی سی یور پوینت، بات آی دیس‌اَگری', tip: 'اول نشان بده حرف طرف را فهمیده‌ای، بعد مؤدبانه مخالفت کن.' },
    ],
  },
  {
    id: 'plans', title: 'برنامهٔ بعدی چیه؟', subtitle: 'برنامه و قصد', icon: 'calendar', color: 'peach', levelId: 'intermediate-3',
    phrases: [
      { id: 'plans-1', en: "I'm going to study tonight.", fa: 'امشب قصد دارم درس بخوانم.', pronunciation: 'آیم گُوئینگ تو اِستادی تونایت', tip: 'going to برای برنامه یا قصدی است که از قبل تصمیم گرفته‌ای.' },
      { id: 'plans-2', en: 'Will you join us?', fa: 'به ما ملحق می‌شی؟', pronunciation: 'ویل یو جوین آس', tip: 'Will you برای دعوت یا درخواست تصمیم در لحظه استفاده می‌شود.' },
      { id: 'plans-3', en: 'Let me check my schedule.', fa: 'بگذار برنامه‌ام را بررسی کنم.', pronunciation: 'لِت می چِک مای اِسکِجول', tip: 'schedule یعنی برنامهٔ زمانی. این جمله وقت می‌خرد تا فکر کنی.' },
    ],
  },
  {
    id: 'experiences', title: 'تا حالا همچین چیزی دیدی؟', subtitle: 'تجربه‌های گذشته', icon: 'travel', color: 'lavender', levelId: 'intermediate-3',
    phrases: [
      { id: 'experiences-1', en: 'I have never been abroad.', fa: 'من هرگز خارج از کشور نبوده‌ام.', pronunciation: 'آی هَو نِوِر بین اَبراد', tip: 'have been abroad یعنی «خارج رفتن/بودن» به‌عنوان تجربه. never یعنی هرگز.' },
      { id: 'experiences-2', en: 'Have you ever tried this?', fa: 'تا حالا این را امتحان کرده‌ای؟', pronunciation: 'هَو یو اِوِر تراید دیس', tip: 'Have you ever برای پرسیدن تجربه در هر زمان تا الان است.' },
      { id: 'experiences-3', en: 'It was an unforgettable experience.', fa: 'تجربه‌ای فراموش‌نشدنی بود.', pronunciation: 'ایت واز اَن آنفِرگِتِبِل اکسپیریِنس', tip: 'unforgettable یعنی فراموش‌نشدنی. experience یعنی تجربه.' },
    ],
  },
  {
    id: 'comparisons', title: 'کدوم بهتره؟', subtitle: 'مقایسه کردن', icon: 'bag', color: 'yellow', levelId: 'intermediate-3',
    phrases: [
      { id: 'comparisons-1', en: 'This one is more convenient.', fa: 'این یکی راحت‌تر/مناسب‌تر است.', pronunciation: 'دیس وان ایز مور کِنوینیِنت', tip: 'برای صفت‌های بلندتر از more استفاده می‌کنیم: more convenient.' },
      { id: 'comparisons-2', en: 'It is not as expensive as that one.', fa: 'به گرانی آن یکی نیست.', pronunciation: 'ایت ایز نات از اکسپِنسیو از دَت وان', tip: 'not as ... as یعنی «به اندازهٔ ... نیست».' },
      { id: 'comparisons-3', en: 'The sooner, the better.', fa: 'هرچه زودتر، بهتر.', pronunciation: 'دِ سونِر، دِ بِتِر', tip: 'یک ساختار آماده: the + صفت تفضیلی، the + صفت تفضیلی.' },
    ],
  },
  {
    id: 'requests', title: 'مؤدبانه درخواست کن', subtitle: 'درخواست و پیشنهاد', icon: 'help', color: 'blue', levelId: 'intermediate-3',
    phrases: [
      { id: 'requests-1', en: 'Would you mind helping me?', fa: 'ممکن است کمکم کنید؟', pronunciation: 'وود یو مایند هِلپینگ می', tip: 'Would you mind + فعل ing خیلی مؤدبانه است. جواب مثبت: Not at all.' },
      { id: 'requests-2', en: 'Could you possibly clarify?', fa: 'ممکن است کمی روشن‌تر توضیح دهید؟', pronunciation: 'کود یو پاسیبلی کلَری‌فای', tip: 'possibly درخواست را نرم‌تر می‌کند. clarify یعنی روشن کردن.' },
      { id: 'requests-3', en: 'I was wondering if you could help.', fa: 'می‌خواستم بدانم ممکن است کمک کنید.', pronunciation: 'آی واز واندرینگ ایف یو کود هِلپ', tip: 'I was wondering if یک شروع بسیار مؤدبانه برای درخواست است.' },
    ],
  },
  {
    id: 'problems', title: 'یه مشکلی پیش اومده', subtitle: 'توضیح مشکل', icon: 'health', color: 'sage', levelId: 'intermediate-3',
    phrases: [
      { id: 'problems-1', en: 'There seems to be a problem.', fa: 'به نظر می‌رسد مشکلی وجود دارد.', pronunciation: 'دِر سیمز تو بی اِ پرابلم', tip: 'There seems to be یعنی «به نظر می‌رسد ... وجود دارد»؛ نرم و غیرتهاجمی.' },
      { id: 'problems-2', en: 'It stopped working yesterday.', fa: 'دیروز از کار افتاد.', pronunciation: 'ایت اِستاپت وِرکینگ یِستِردِی', tip: 'stop + ing یعنی کاری را متوقف کردن. working یعنی کار کردن.' },
      { id: 'problems-3', en: 'How can we solve this?', fa: 'چطور می‌توانیم این را حل کنیم؟', pronunciation: 'هاو کَن وی سالو دیس', tip: 'solve یعنی حل کردن. این جمله گفت‌وگو را به سمت راه‌حل می‌برد.' },
    ],
  },
  {
    id: 'work-email', title: 'ایمیل کاریِ روشن', subtitle: 'مکاتبهٔ اداری', icon: 'phone', color: 'peach', levelId: 'advanced-1',
    phrases: [
      { id: 'work-email-1', en: 'I am writing to follow up on our meeting.', fa: 'برای پیگیری جلسه‌مان می‌نویسم.', pronunciation: 'آی اَم رایتینگ تو فالُو آپ آن آور میتینگ', tip: 'follow up on یعنی پیگیری کردن. شروعی رسمی و روشن برای ایمیل.' },
      { id: 'work-email-2', en: 'Please find the report attached.', fa: 'گزارش را به پیوست ملاحظه کنید.', pronunciation: 'پلیز فایند دِ ریپورت اَتَچت', tip: 'attached یعنی پیوست‌شده. عبارتی استاندارد در ایمیل کاری.' },
      { id: 'work-email-3', en: 'I look forward to your reply.', fa: 'منتظر پاسخ شما هستم.', pronunciation: 'آی لوک فوروارد تو یور ریپلای', tip: 'look forward to + اسم/فعل ing یعنی مشتاقانه منتظر بودن.' },
    ],
  },
  {
    id: 'meetings', title: 'جلسه رو جلو ببر', subtitle: 'زبان جلسه', icon: 'chat', color: 'lavender', levelId: 'advanced-1',
    phrases: [
      { id: 'meetings-1', en: 'Let us move on to the next item.', fa: 'بیایید به مورد بعدی برویم.', pronunciation: 'لِت آس موو آن تو دِ نِکست آیتِم', tip: 'move on to یعنی رفتن به موضوع بعدی. item یعنی مورد دستور جلسه.' },
      { id: 'meetings-2', en: 'Could you elaborate on that?', fa: 'می‌توانید کمی بیشتر توضیح دهید؟', pronunciation: 'کود یو اِلَبُریت آن دَت', tip: 'elaborate on یعنی با جزئیات بیشتر توضیح دادن.' },
      { id: 'meetings-3', en: 'Let us summarize the action points.', fa: 'بیایید اقدامات لازم را جمع‌بندی کنیم.', pronunciation: 'لِت آس سامِرایز دِ اَکشن پوینتس', tip: 'action points کارهایی هستند که باید بعد از جلسه انجام شوند.' },
    ],
  },
  {
    id: 'presentations', title: 'ارائهٔ قابل فهم', subtitle: 'سخنرانی و ارائه', icon: 'school', color: 'yellow', levelId: 'advanced-1',
    phrases: [
      { id: 'presentations-1', en: 'The purpose of this presentation is to explain...', fa: 'هدف این ارائه توضیح ... است.', pronunciation: 'دِ پِرپِس آو دیس پرِزِنتِیشِن ایز تو اکسپلِین', tip: 'purpose یعنی هدف. اول هدف را بگو تا شنونده مسیر را بداند.' },
      { id: 'presentations-2', en: 'As you can see from the chart...', fa: 'همان‌طور که از نمودار می‌بینید...', pronunciation: 'از یو کَن سی فرام دِ چارت', tip: 'chart یعنی نمودار. این عبارت توجه را به داده جلب می‌کند.' },
      { id: 'presentations-3', en: 'I will be happy to take questions.', fa: 'با کمال میل به سؤال‌ها پاسخ می‌دهم.', pronunciation: 'آی ویل بی هَپی تو تِیک کوئسچِنز', tip: 'take questions یعنی پذیرفتن سؤال‌های حضار.' },
    ],
  },
  {
    id: 'negotiation', title: 'به توافق برس', subtitle: 'مذاکرهٔ ساده', icon: 'bag', color: 'blue', levelId: 'advanced-1',
    phrases: [
      { id: 'negotiation-1', en: 'We are looking for a win-win solution.', fa: 'ما به دنبال راه‌حلی برد-برد هستیم.', pronunciation: 'وی آر لوکینگ فور اِ وین وین سولوشن', tip: 'win-win یعنی هر دو طرف سود کنند.' },
      { id: 'negotiation-2', en: 'Would you be willing to compromise?', fa: 'آیا مایل به مصالحه هستید؟', pronunciation: 'وود یو بی ویلینگ تو کامپِرِمایز', tip: 'compromise یعنی هر طرف کمی کوتاه بیاید تا توافق شود.' },
      { id: 'negotiation-3', en: 'Let us put that in writing.', fa: 'بیایید آن را مکتوب کنیم.', pronunciation: 'لِت آس پوت دَت این رایتینگ', tip: 'in writing یعنی به‌صورت نوشته، نه فقط شفاهی.' },
    ],
  },
  {
    id: 'feedback', title: 'بازخوردِ سازنده', subtitle: 'نقد محترمانه', icon: 'heart', color: 'sage', levelId: 'advanced-1',
    phrases: [
      { id: 'feedback-1', en: 'I appreciate your effort.', fa: 'از تلاشت قدردانی می‌کنم.', pronunciation: 'آی اَپریشی‌اِیت یور اِفِرت', tip: 'appreciate یعنی قدردانی کردن. قبل از نقد، تلاش را ببین.' },
      { id: 'feedback-2', en: 'One area for improvement is...', fa: 'یکی از زمینه‌های بهبود ... است.', pronunciation: 'وان اِریا فور ایمپروومِنت ایز', tip: 'area for improvement یعنی بخشی که می‌تواند بهتر شود.' },
      { id: 'feedback-3', en: 'Keep up the good work.', fa: 'کار خوبت را ادامه بده.', pronunciation: 'کیپ آپ دِ گود وِرک', tip: 'keep up یعنی ادامه دادن. encourage یعنی تشویق کردن.' },
    ],
  },
  {
    id: 'deadlines', title: 'زمان‌بندیِ پروژه', subtitle: 'مهلت و اولویت', icon: 'clock', color: 'peach', levelId: 'advanced-1',
    phrases: [
      { id: 'deadlines-1', en: 'The deadline is next Friday.', fa: 'مهلت جمعهٔ آینده است.', pronunciation: 'دِ دِدلاین ایز نِکست فرایدِی', tip: 'deadline یعنی آخرین زمان مجاز برای تحویل.' },
      { id: 'deadlines-2', en: 'We are running behind schedule.', fa: 'از برنامه عقب هستیم.', pronunciation: 'وی آر رانینگ بیهایند اِسکِجول', tip: 'behind schedule یعنی عقب‌تر از زمان‌بندی.' },
      { id: 'deadlines-3', en: 'Let us prioritize the urgent tasks.', fa: 'بیایید کارهای فوری را در اولویت بگذاریم.', pronunciation: 'لِت آس پرایورِتایز دِ اِرجِنت تَسکس', tip: 'prioritize یعنی اولویت دادن. urgent یعنی فوری.' },
    ],
  },
  {
    id: 'news', title: 'خبر رو دقیق بخون', subtitle: 'رسانه و خبر', icon: 'tech', color: 'lavender', levelId: 'advanced-2',
    phrases: [
      { id: 'news-1', en: 'According to the report...', fa: 'طبق گزارش...', pronunciation: 'اِکوردینگ تو دِ ریپورت', tip: 'according to یعنی «بر اساس». منبع خبر را مشخص کن.' },
      { id: 'news-2', en: 'The headline is misleading.', fa: 'تیتر گمراه‌کننده است.', pronunciation: 'دِ هِدلاین ایز میسلیدینگ', tip: 'misleading یعنی چیزی که برداشت اشتباه ایجاد می‌کند.' },
      { id: 'news-3', en: 'We should verify the source.', fa: 'باید منبع را بررسی کنیم.', pronunciation: 'وی شود وِری‌فای دِ سورس', tip: 'verify یعنی صحت چیزی را تأیید کردن. source یعنی منبع.' },
    ],
  },
  {
    id: 'environment', title: 'دربارهٔ محیط زیست', subtitle: 'طبیعت و پایداری', icon: 'weather', color: 'yellow', levelId: 'advanced-2',
    phrases: [
      { id: 'environment-1', en: 'Climate change affects everyone.', fa: 'تغییر اقلیم بر همه اثر می‌گذارد.', pronunciation: 'کلایمِت چِینج اَفِکتس اِوری‌وان', tip: 'affect یعنی اثر گذاشتن. climate change یعنی تغییر اقلیم.' },
      { id: 'environment-2', en: 'We need sustainable solutions.', fa: 'به راه‌حل‌های پایدار نیاز داریم.', pronunciation: 'وی نید ساستِینِبِل سولوشنز', tip: 'sustainable یعنی چیزی که بتواند بدون آسیب شدید ادامه پیدا کند.' },
      { id: 'environment-3', en: 'Small actions can make a difference.', fa: 'کارهای کوچک می‌توانند تفاوت ایجاد کنند.', pronunciation: 'اِسمال اَکشنز کَن مِیک اِ دیفِرِنس', tip: 'make a difference یعنی اثر مهمی گذاشتن.' },
    ],
  },
  {
    id: 'tech-ethics', title: 'فناوری و مسئولیت', subtitle: 'اخلاق فناوری', icon: 'tech', color: 'blue', levelId: 'advanced-2',
    phrases: [
      { id: 'tech-ethics-1', en: 'Data privacy matters.', fa: 'حریم خصوصی داده‌ها مهم است.', pronunciation: 'دِیتا پرایوَسی مَتِرز', tip: 'matter به‌عنوان فعل یعنی «اهمیت داشتن».' },
      { id: 'tech-ethics-2', en: 'The algorithm may be biased.', fa: 'الگوریتم ممکن است سوگیری داشته باشد.', pronunciation: 'دِ اَلگوریذِم مِی بی بایِست', tip: 'biased یعنی دارای سوگیری یا تبعیض.' },
      { id: 'tech-ethics-3', en: 'Transparency builds trust.', fa: 'شفافیت اعتماد می‌سازد.', pronunciation: 'ترَنسپِرِنسی بیلدز تراست', tip: 'transparency یعنی شفاف بودن. trust یعنی اعتماد.' },
    ],
  },
  {
    id: 'culture', title: 'فرهنگ‌ها رو بشناس', subtitle: 'ارتباط بین‌فرهنگی', icon: 'party', color: 'sage', levelId: 'advanced-2',
    phrases: [
      { id: 'culture-1', en: 'Customs vary from culture to culture.', fa: 'رسم‌ها از فرهنگی به فرهنگ دیگر فرق دارند.', pronunciation: 'کاستِمز وَری فرام کالچِر تو کالچِر', tip: 'vary یعنی متفاوت بودن. custom یعنی رسم.' },
      { id: 'culture-2', en: 'It is important to be respectful.', fa: 'محترم بودن مهم است.', pronunciation: 'ایت ایز ایمپورتَنت تو بی ریسپِکتفول', tip: 'respectful یعنی همراه با احترام.' },
      { id: 'culture-3', en: 'Let us avoid stereotypes.', fa: 'بیایید از کلیشه‌ها پرهیز کنیم.', pronunciation: 'لِت آس اَووید اِستریوتایپس', tip: 'stereotype یعنی تصویر ساده‌شده و اغلب نادرست از یک گروه.' },
    ],
  },
  {
    id: 'research', title: 'پژوهش رو توضیح بده', subtitle: 'زبان علمی ساده', icon: 'school', color: 'peach', levelId: 'advanced-2',
    phrases: [
      { id: 'research-1', en: 'The findings suggest that...', fa: 'یافته‌ها نشان می‌دهند که...', pronunciation: 'دِ فایندینگز ساجِست دَت', tip: 'findings یعنی یافته‌ها. suggest یعنی نشان دادن یا پیشنهاد کردن.' },
      { id: 'research-2', en: 'Further research is needed.', fa: 'پژوهش بیشتری لازم است.', pronunciation: 'فِرذِر ریسِرچ ایز نیدِد', tip: 'further یعنی بیشتر/اضافی. جمله‌ای محتاطانه و علمی.' },
      { id: 'research-3', en: 'The results were consistent.', fa: 'نتایج سازگار بودند.', pronunciation: 'دِ ریزالتس وِر کِنسیستِنت', tip: 'consistent یعنی سازگار و یکسان در شرایط مختلف.' },
    ],
  },
  {
    id: 'argument', title: 'استدلالِ محکم', subtitle: 'منطق و دلیل', icon: 'chat', color: 'lavender', levelId: 'advanced-2',
    phrases: [
      { id: 'argument-1', en: 'The evidence supports this claim.', fa: 'شواهد از این ادعا پشتیبانی می‌کنند.', pronunciation: 'دِ اِویدِنس ساپورتس دیس کلِیم', tip: 'evidence یعنی شواهد. claim یعنی ادعا.' },
      { id: 'argument-2', en: 'That conclusion does not follow.', fa: 'آن نتیجه‌گیری منطقی نیست.', pronunciation: 'دَت کِنکلوژِن داز نات فالُو', tip: 'does not follow یعنی از مقدمه‌ها به‌دست نمی‌آید.' },
      { id: 'argument-3', en: 'Let us consider the counterargument.', fa: 'بیایید استدلال مخالف را هم در نظر بگیریم.', pronunciation: 'لِت آس کِنسیدِر دِ کاونتِر آرگیومِنت', tip: 'counterargument یعنی دلیل یا نظر مخالف.' },
    ],
  },
  {
    id: 'nuance', title: 'معنیِ پنهانِ کلمه‌ها', subtitle: 'ظرافت زبانی', icon: 'ear', color: 'yellow', levelId: 'advanced-3',
    phrases: [
      { id: 'nuance-1', en: 'The tone is rather formal.', fa: 'لحن نسبتاً رسمی است.', pronunciation: 'دِ تون ایز راذِر فُرمال', tip: 'rather یعنی نسبتاً. tone یعنی لحن.' },
      { id: 'nuance-2', en: 'There is a subtle difference.', fa: 'تفاوت ظریفی وجود دارد.', pronunciation: 'دِر ایز اِ ساتِل دیفِرِنس', tip: 'subtle یعنی ظریف و نه‌چندان آشکار. b آن تلفظ نمی‌شود.' },
      { id: 'nuance-3', en: 'It depends on the context.', fa: 'به بافت جمله بستگی دارد.', pronunciation: 'ایت دیپِندز آن دِ کانتِکست', tip: 'context یعنی موقعیت و بافتی که کلمه در آن استفاده می‌شود.' },
    ],
  },
  {
    id: 'idioms', title: 'اصطلاحاتِ طبیعی', subtitle: 'زبان روزمرهٔ پیشرفته', icon: 'chat', color: 'blue', levelId: 'advanced-3',
    phrases: [
      { id: 'idioms-1', en: 'Let us play it by ear.', fa: 'بیایید بر اساس موقعیت تصمیم بگیریم.', pronunciation: 'لِت آس پلِی ایت بای ایر', tip: 'play it by ear یعنی بدون برنامهٔ قطعی، با شرایط جلو رفتن.' },
      { id: 'idioms-2', en: 'It is not my cup of tea.', fa: 'مورد علاقهٔ من نیست.', pronunciation: 'ایت ایز نات مای کاپ آو تی', tip: 'not my cup of tea یعنی چیزی که دوست ندارم یا برایم مناسب نیست.' },
      { id: 'idioms-3', en: 'She hit the nail on the head.', fa: 'او دقیقاً درست گفت.', pronunciation: 'شی هیت دِ نِیل آن دِ هِد', tip: 'hit the nail on the head یعنی دقیقاً به نکتهٔ درست اشاره کردن.' },
    ],
  },
  {
    id: 'storytelling', title: 'داستان رو زنده کن', subtitle: 'روایت جذاب', icon: 'hobby', color: 'sage', levelId: 'advanced-3',
    phrases: [
      { id: 'storytelling-1', en: 'To cut a long story short...', fa: 'خلاصه بگویم...', pronunciation: 'تو کات اِ لانگ اِستوری شورت', tip: 'برای رسیدن سریع به اصل ماجرا استفاده می‌شود.' },
      { id: 'storytelling-2', en: 'Little did I know what would happen.', fa: 'نمی‌دانستم چه اتفاقی خواهد افتاد.', pronunciation: 'لیتِل دید آی نو وات وود هَپِن', tip: 'Little did I know یک ساختار وارونه برای ایجاد تعلیق است.' },
      { id: 'storytelling-3', en: 'It turned out to be a blessing.', fa: 'در نهایت نعمت از آب درآمد.', pronunciation: 'ایت تِرند آوت تو بی اِ بلِسینگ', tip: 'turn out یعنی در نهایت مشخص شدن. blessing یعنی نعمت.' },
    ],
  },
  {
    id: 'persuasion', title: 'متقاعد کن، نه مجبور', subtitle: 'ترغیب اخلاقی', icon: 'heart', color: 'peach', levelId: 'advanced-3',
    phrases: [
      { id: 'persuasion-1', en: 'Imagine the benefits.', fa: 'مزایا را تصور کن.', pronunciation: 'ایمَجین دِ بِنیفیتس', tip: 'benefit یعنی سود یا مزیت. تصویرسازی به درک کمک می‌کند.' },
      { id: 'persuasion-2', en: 'The advantages outweigh the risks.', fa: 'مزایا بر خطرات می‌چربند.', pronunciation: 'دِ اَدوَنتیجیز آوت‌وِی دِ ریسکس', tip: 'outweigh یعنی سنگین‌تر/مهم‌تر بودن.' },
      { id: 'persuasion-3', en: 'You have nothing to lose.', fa: 'چیزی برای از دست دادن نداری.', pronunciation: 'یو هَو ناتینگ تو لوز', tip: 'این جمله ریسک را کم نشان می‌دهد؛ فقط وقتی درست است استفاده کن.' },
    ],
  },
  {
    id: 'academic', title: 'بنویس، دقیق و علمی', subtitle: 'نوشتار دانشگاهی', icon: 'school', color: 'lavender', levelId: 'advanced-3',
    phrases: [
      { id: 'academic-1', en: 'This paper examines...', fa: 'این مقاله بررسی می‌کند...', pronunciation: 'دیس پِیپِر اگزَمینز', tip: 'examine یعنی بررسی کردن. paper در دانشگاه یعنی مقاله.' },
      { id: 'academic-2', en: 'The data indicate a trend.', fa: 'داده‌ها یک روند را نشان می‌دهند.', pronunciation: 'دِ دِیتا ایندیکِیت اِ ترِند', tip: 'data در نوشتار رسمی اغلب جمع است؛ indicate بدون s.' },
      { id: 'academic-3', en: 'In conclusion, the hypothesis is supported.', fa: 'در نتیجه، فرضیه پشتیبانی می‌شود.', pronunciation: 'این کِنکلوژِن، دِ هایپاثِسیس ایز ساپورتِد', tip: 'hypothesis یعنی فرضیه. conclusion یعنی نتیجه‌گیری.' },
    ],
  },
  {
    id: 'interview', title: 'در مصاحبه بدرخش', subtitle: 'مصاحبهٔ شغلی', icon: 'user', color: 'yellow', levelId: 'advanced-3',
    phrases: [
      { id: 'interview-1', en: 'My background is in engineering.', fa: 'زمینهٔ کاری/تحصیلی من مهندسی است.', pronunciation: 'مای بَک‌گراند ایز این اِنجینیرینگ', tip: 'background یعنی سابقه و زمینه.' },
      { id: 'interview-2', en: 'I am eager to contribute.', fa: 'مشتاقم که سهمی داشته باشم.', pronunciation: 'آی اَم ایگِر تو کِنتریبیوت', tip: 'contribute یعنی کمک یا سهم داشتن در یک هدف.' },
      { id: 'interview-3', en: 'Where do you see the company in five years?', fa: 'شرکت را در پنج سال آینده کجا می‌بینید؟', pronunciation: 'وِر دو یو سی دِ کامپِنی این فایو ییرز', tip: 'پرسیدن سؤال خوب نشان‌دهندهٔ علاقه و دقت است.' },
    ],
  },
  {
    id: 'leadership', title: 'تیم رو هدایت کن', subtitle: 'رهبری', icon: 'family', color: 'blue', levelId: 'professional',
    phrases: [
      { id: 'leadership-1', en: 'Let us align on the vision.', fa: 'بیایید بر سر چشم‌انداز هم‌راستا شویم.', pronunciation: 'لِت آس اَلاین آن دِ ویژِن', tip: 'align on یعنی توافق و هم‌جهت شدن. vision یعنی چشم‌انداز.' },
      { id: 'leadership-2', en: 'I trust your judgment.', fa: 'به قضاوتت اعتماد دارم.', pronunciation: 'آی تراست یور جاجمنت', tip: 'judgment یعنی توانایی تصمیم‌گیری درست.' },
      { id: 'leadership-3', en: 'Empower the team to decide.', fa: 'به تیم اختیار تصمیم‌گیری بده.', pronunciation: 'ایمپاوِر دِ تیم تو دیساید', tip: 'empower یعنی توانمند و دارای اختیار کردن.' },
    ],
  },
  {
    id: 'strategy', title: 'استراتژیِ روشن', subtitle: 'تفکر راهبردی', icon: 'map', color: 'sage', levelId: 'professional',
    phrases: [
      { id: 'strategy-1', en: 'Our competitive advantage is quality.', fa: 'مزیت رقابتی ما کیفیت است.', pronunciation: 'آور کِمپِتیتیو اَدوَنتیج ایز کوآلیتی', tip: 'competitive advantage یعنی چیزی که تو را از رقبا متمایز می‌کند.' },
      { id: 'strategy-2', en: 'We must adapt to market changes.', fa: 'باید با تغییرات بازار سازگار شویم.', pronunciation: 'وی ماست اَدَپت تو مارکِت چِینجیز', tip: 'adapt to یعنی خود را وفق دادن با.' },
      { id: 'strategy-3', en: 'Let us focus on long-term value.', fa: 'بیایید بر ارزش بلندمدت تمرکز کنیم.', pronunciation: 'لِت آس فوکِس آن لانگ تِرم وَلیو', tip: 'long-term value یعنی ارزشی که در طول زمان ساخته می‌شود.' },
    ],
  },
  {
    id: 'finance', title: 'اعدادِ کسب‌وکار', subtitle: 'مالی و بودجه', icon: 'numbers', color: 'peach', levelId: 'professional',
    phrases: [
      { id: 'finance-1', en: 'Revenue increased by ten percent.', fa: 'درآمد ده درصد افزایش یافت.', pronunciation: 'رِوِنیو اینکریست بای تِن پِرسِنت', tip: 'revenue یعنی درآمد. increase by یعنی افزایش به میزان.' },
      { id: 'finance-2', en: 'We need to reduce overhead costs.', fa: 'باید هزینه‌های سربار را کم کنیم.', pronunciation: 'وی نید تو ریدیوس اُوِرهید کاستس', tip: 'overhead costs هزینه‌های جاری مثل اجاره و اداره هستند.' },
      { id: 'finance-3', en: 'The return on investment is positive.', fa: 'بازگشت سرمایه مثبت است.', pronunciation: 'دِ ریترن آن اینوِستمنت ایز پازیتیو', tip: 'return on investment یا ROI یعنی سود نسبت به سرمایه‌گذاری.' },
    ],
  },
  {
    id: 'legal', title: 'قرارداد رو بفهم', subtitle: 'زبان حقوقی پایه', icon: 'house', color: 'lavender', levelId: 'professional',
    phrases: [
      { id: 'legal-1', en: 'Both parties agree to the terms.', fa: 'هر دو طرف با شرایط موافق‌اند.', pronunciation: 'بوث پارتیز اَگری تو دِ تِرمز', tip: 'terms یعنی شرایط قرارداد. party یعنی طرف قرارداد.' },
      { id: 'legal-2', en: 'This clause limits liability.', fa: 'این بند مسئولیت را محدود می‌کند.', pronunciation: 'دیس کلاز لیمیتس لایابیلیتی', tip: 'clause یعنی بند قرارداد. liability یعنی مسئولیت قانونی.' },
      { id: 'legal-3', en: 'The contract is binding.', fa: 'قرارداد الزام‌آور است.', pronunciation: 'دِ کانترَکت ایز بایندینگ', tip: 'binding یعنی از نظر قانونی لازم‌الاجرا.' },
    ],
  },
  {
    id: 'diplomacy', title: 'دیپلماسیِ کلام', subtitle: 'ارتباط حساس', icon: 'hello', color: 'yellow', levelId: 'professional',
    phrases: [
      { id: 'diplomacy-1', en: 'With all due respect...', fa: 'با کمال احترام...', pronunciation: 'ویت آل دیو ریسپِکت', tip: 'برای بیان مخالفت محترمانه در موقعیت رسمی.' },
      { id: 'diplomacy-2', en: 'We reserve the right to respond.', fa: 'حق پاسخ‌گویی را برای خود محفوظ می‌داریم.', pronunciation: 'وی ریزِرو دِ رایت تو ریسپاند', tip: 'reserve the right یعنی حقی را نگه داشتن برای بعد.' },
      { id: 'diplomacy-3', en: 'Let us seek common ground.', fa: 'بیایید به دنبال وجه اشتراک باشیم.', pronunciation: 'لِت آس سیک کامِن گراند', tip: 'common ground یعنی نقاط توافق.' },
    ],
  },
  {
    id: 'executive', title: 'تصمیمِ مدیریتی', subtitle: 'رهبری ارشد', icon: 'clock', color: 'blue', levelId: 'professional',
    phrases: [
      { id: 'executive-1', en: 'We must make an informed decision.', fa: 'باید تصمیمی آگاهانه بگیریم.', pronunciation: 'وی ماست مِیک اَن اینفُرمِد دیسیژِن', tip: 'informed decision یعنی تصمیم بر پایهٔ اطلاعات کافی.' },
      { id: 'executive-2', en: 'Accountability is essential.', fa: 'پاسخ‌گویی ضروری است.', pronunciation: 'اِکاونتِبیلیتی ایز اِسِنشال', tip: 'accountability یعنی مسئولیت‌پذیری و پاسخ‌گو بودن.' },
      { id: 'executive-3', en: 'Let us review the strategic priorities.', fa: 'بیایید اولویت‌های راهبردی را مرور کنیم.', pronunciation: 'لِت آس ریویو دِ اِستراتِجیک پرایورِتیز', tip: 'strategic priorities یعنی مهم‌ترین جهت‌های بلندمدت.' },
    ],
  },
];

export const allPhrases = lessons.flatMap((lesson) => lesson.phrases);
export const phraseById = new Map(allPhrases.map((phrase) => [phrase.id, phrase]));
export const lessonById = new Map(lessons.map((lesson) => [lesson.id, lesson]));
