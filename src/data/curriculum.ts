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
  {
    id: 'numbers', title: 'عددها رو یاد بگیر', subtitle: 'شمارش و عددهای پایه', icon: 'numbers', color: 'blue',
    phrases: [
      { id: 'numbers-1', en: 'One, two, three.', fa: 'یک، دو، سه.', pronunciation: 'وان، تو، تری', tip: 'این سه عدد پایه هستند. three را «تری» بگو، نه «سری».' },
      { id: 'numbers-2', en: 'I am thirty years old.', fa: 'من سی ساله هستم.', pronunciation: 'آی اَم تِرتی ییرز اُلد', tip: 'برای گفتن سن از I am ... years old استفاده می‌کنیم. عدد دلخواهت را جای thirty بگذار.' },
      { id: 'numbers-3', en: 'How old are you?', fa: 'چند سالته؟', pronunciation: 'هاو اُلد آر یو', tip: 'یک سؤال رایج برای پرسیدن سن. در فرهنگ انگلیسی‌زبان گاهی پرسیدن سن مؤدبانه نیست.' },
    ],
  },
  {
    id: 'family', title: 'خانوادهٔ من', subtitle: 'اعضای خانواده', icon: 'family', color: 'peach',
    phrases: [
      { id: 'family-1', en: 'This is my mother.', fa: 'این مادرم است.', pronunciation: 'دیس ایز مای مادِر', tip: 'mother یعنی مادر. father یعنی پدر. this is یعنی «این ... است».' },
      { id: 'family-2', en: 'I have two sisters.', fa: 'من دو خواهر دارم.', pronunciation: 'آی هَو تو سیستِرز', tip: 'sister یعنی خواهر. s آخر نشانهٔ بیشتر از یکی است. brother یعنی برادر.' },
      { id: 'family-3', en: 'Do you have children?', fa: 'بچه داری؟', pronunciation: 'دو یو هَو چیلدرِن', tip: 'children جمع child است؛ یعنی بچه‌ها. این جمع بی‌قاعده است و s نمی‌گیرد.' },
    ],
  },
  {
    id: 'food', title: 'گشنمه!', subtitle: 'غذا و خوردنی‌ها', icon: 'food', color: 'yellow',
    phrases: [
      { id: 'food-1', en: "I'm hungry.", fa: 'گشنمه.', pronunciation: 'آیم هانگری', tip: 'hungry یعنی گرسنه. thirsty یعنی تشنه. هر دو با I am می‌آیند.' },
      { id: 'food-2', en: 'I like rice and chicken.', fa: 'من برنج و مرغ دوست دارم.', pronunciation: 'آی لایک رایس اَند چیکن', tip: 'like یعنی «دوست داشتن». rice یعنی برنج و chicken یعنی مرغ.' },
      { id: 'food-3', en: "I don't eat meat.", fa: 'من گوشت نمی‌خورم.', pronunciation: 'آی دُنت ایت میت', tip: "don't eat یعنی «نمی‌خورم». meat یعنی گوشت. برای گیاه‌خواری بگو I am vegetarian." },
    ],
  },
  {
    id: 'weather', title: 'هوا چطوره؟', subtitle: 'آب و هوا', icon: 'weather', color: 'blue',
    phrases: [
      { id: 'weather-1', en: "It's sunny today.", fa: 'امروز هوا آفتابی است.', pronunciation: 'ایتس سانی تودِی', tip: 'sunny یعنی آفتابی. rainy یعنی بارانی. cloudy یعنی ابری.' },
      { id: 'weather-2', en: "It's very cold.", fa: 'خیلی سرده.', pronunciation: 'ایتس وِری کُلد', tip: 'cold یعنی سرد. hot یعنی گرم. very یعنی «خیلی».' },
      { id: 'weather-3', en: 'Is it going to rain?', fa: 'قراره بارون بیاد؟', pronunciation: 'ایز ایت گُوئینگ تو رِین', tip: 'going to برای آیندهٔ نزدیک استفاده می‌شود. rain یعنی باران.' },
    ],
  },
  {
    id: 'health', title: 'حالم خوب نیست', subtitle: 'سلامتی و دکتر', icon: 'health', color: 'lavender',
    phrases: [
      { id: 'health-1', en: 'I have a headache.', fa: 'سردرد دارم.', pronunciation: 'آی هَو ا هِدِیک', tip: 'headache یعنی سردرد. stomachache یعنی دل‌درد. هر دو با I have می‌آیند.' },
      { id: 'health-2', en: 'I need a doctor.', fa: 'دکتر لازم دارم.', pronunciation: 'آی نید ا داکتِر', tip: 'need یعنی «نیاز داشتن». a doctor یعنی «یک دکتر».' },
      { id: 'health-3', en: 'Where is the pharmacy?', fa: 'داروخانه کجاست؟', pronunciation: 'وِر ایز دِ فارمِسی', tip: 'pharmacy یعنی داروخانه. در آمریکا drugstore هم می‌گویند.' },
    ],
  },
  {
    id: 'travel', title: 'سفر می‌خوام برم', subtitle: 'در فرودگاه و هتل', icon: 'travel', color: 'sage',
    phrases: [
      { id: 'travel-1', en: 'Where is gate five?', fa: 'گیت پنج کجاست؟', pronunciation: 'وِر ایز گِیت فایو', tip: 'gate یعنی دروازهٔ سوارشدن. شمارهٔ گیت روی بلیطت نوشته شده.' },
      { id: 'travel-2', en: 'I have a reservation.', fa: 'من رزرو دارم.', pronunciation: 'آی هَو ا رِزِروِیشِن', tip: 'reservation یعنی رزرو. در هتل یا رستوران این جمله خیلی کاربرد دارد.' },
      { id: 'travel-3', en: 'Can I see your passport?', fa: 'می‌توانم پاسپورتتان را ببینم؟', pronunciation: 'کَن آی سی یور پَسپورت', tip: 'این جمله را معمولاً مأمور فرودگاه یا هتل می‌گوید. passport یعنی گذرنامه.' },
    ],
  },
  {
    id: 'phone', title: 'الو؟ صدات میاد', subtitle: 'مکالمهٔ تلفنی', icon: 'phone', color: 'yellow',
    phrases: [
      { id: 'phone-1', en: 'Hello, who is this?', fa: 'سلام، شما کی هستید؟', pronunciation: 'هِلُو، هو ایز دیس', tip: 'پشت تلفن نمی‌گوییم who are you؛ می‌گوییم who is this.' },
      { id: 'phone-2', en: 'Can I call you back?', fa: 'می‌توانم بعداً زنگ بزنم؟', pronunciation: 'کَن آی کال یو بَک', tip: 'call back یعنی «دوباره زنگ زدن». وقتی سرت شلوغ است این جمله عالی است.' },
      { id: 'phone-3', en: 'The line is busy.', fa: 'خط اشغال است.', pronunciation: 'دِ لاین ایز بیزی', tip: 'busy اینجا یعنی «اشغال». line یعنی خط تلفن.' },
    ],
  },
  {
    id: 'hobby', title: 'وقت آزاد چیکار می‌کنی؟', subtitle: 'سرگرمی و علایق', icon: 'hobby', color: 'peach',
    phrases: [
      { id: 'hobby-1', en: 'I like watching movies.', fa: 'فیلم دیدن دوست دارم.', pronunciation: 'آی لایک واچینگ موویز', tip: 'بعد از like فعل با ing می‌آید: watching, reading, cooking.' },
      { id: 'hobby-2', en: 'Do you play any sports?', fa: 'ورزشی انجام می‌دی؟', pronunciation: 'دو یو پِلِی اِنی اِسپورتس', tip: 'play sports یعنی «ورزش کردن». any در سؤال یعنی «هیچ / یک».' },
      { id: 'hobby-3', en: 'I enjoy cooking.', fa: 'از آشپزی لذت می‌برم.', pronunciation: 'آی اینجوی کوکینگ', tip: 'enjoy هم مثل like با فعل ing می‌آید. enjoy یعنی «لذت بردن».' },
    ],
  },
  {
    id: 'calendar', title: 'چه روزی از هفته‌ست؟', subtitle: 'روزها و ماه‌ها', icon: 'calendar', color: 'lavender',
    phrases: [
      { id: 'calendar-1', en: 'Today is Monday.', fa: 'امروز دوشنبه است.', pronunciation: 'تودِی ایز ماندِی', tip: 'روزهای هفته در انگلیسی با حرف بزرگ شروع می‌شوند: Monday, Tuesday, ...' },
      { id: 'calendar-2', en: 'My birthday is in March.', fa: 'تولدم در مارس است.', pronunciation: 'مای بِرث‌دِی ایز این مارچ', tip: 'برای ماه از in استفاده می‌کنیم. March یعنی مارس (حدود اسفند-فروردین).' },
      { id: 'calendar-3', en: 'See you on Friday.', fa: 'جمعه می‌بینمت.', pronunciation: 'سی یو آن فرایدِی', tip: 'برای روز هفته از on استفاده می‌کنیم: on Monday, on Friday.' },
    ],
  },
  {
    id: 'school', title: 'دارم یاد می‌گیرم', subtitle: 'در کلاس و مدرسه', icon: 'school', color: 'blue',
    phrases: [
      { id: 'school-1', en: "I'm learning English.", fa: 'دارم انگلیسی یاد می‌گیرم.', pronunciation: 'آیم لِرنینگ اینگلیش', tip: 'am + فعل ing یعنی «دارم ... می‌کنم» — همین الان!' },
      { id: 'school-2', en: 'Can you help me?', fa: 'می‌تونی کمکم کنی؟', pronunciation: 'کَن یو هِلپ می', tip: 'help یعنی کمک. این جمله در هر موقعیتی کاربرد دارد.' },
      { id: 'school-3', en: 'How do you spell that?', fa: 'هجیش چطور می‌شه؟', pronunciation: 'هاو دو یو اِسپِل دَت', tip: 'spell یعنی «هجی کردن». وقتی کلمه‌ای را نمی‌دانی چطور بنویسی، این را بپرس.' },
    ],
  },
  {
    id: 'animals', title: 'حیوونای بامزه', subtitle: 'حیوانات', icon: 'animals', color: 'sage',
    phrases: [
      { id: 'animals-1', en: 'I have a cat.', fa: 'من یک گربه دارم.', pronunciation: 'آی هَو ا کَت', tip: 'cat یعنی گربه. dog یعنی سگ. bird یعنی پرنده.' },
      { id: 'animals-2', en: 'The dog is very friendly.', fa: 'سگ خیلی مهربان است.', pronunciation: 'دِ داگ ایز وِری فرِندلی', tip: 'friendly یعنی «دوستانه، مهربان». friend یعنی دوست.' },
      { id: 'animals-3', en: 'Are you afraid of animals?', fa: 'از حیوانات می‌ترسی؟', pronunciation: 'آر یو اَفرِید آو اَنیمالز', tip: 'afraid of یعنی «ترسیدن از». animals جمع animal است.' },
    ],
  },
  {
    id: 'clothes', title: 'چی بپوشم؟', subtitle: 'لباس و پوشاک', icon: 'clothes', color: 'peach',
    phrases: [
      { id: 'clothes-1', en: 'I like your shirt.', fa: 'از پیرهنت خوشم اومده.', pronunciation: 'آی لایک یور شِرت', tip: 'shirt یعنی پیراهن. تعریف از لباس کسی یک شروع خوب برای مکالمه است.' },
      { id: 'clothes-2', en: 'What color do you want?', fa: 'چه رنگی می‌خوای؟', pronunciation: 'وات کالِر دو یو وانت', tip: 'color یعنی رنگ. red, blue, green, black, white رنگ‌های پایه هستند.' },
      { id: 'clothes-3', en: 'These shoes are comfortable.', fa: 'این کفش‌ها راحت هستند.', pronunciation: 'دیز شوز آر کامفِتِبِل', tip: 'shoes همیشه جمع است چون دو تاست. comfortable یعنی راحت.' },
    ],
  },
  {
    id: 'house', title: 'خونهٔ من', subtitle: 'اتاق‌ها و وسایل خانه', icon: 'house', color: 'yellow',
    phrases: [
      { id: 'house-1', en: 'The kitchen is small.', fa: 'آشپزخانه کوچک است.', pronunciation: 'دَ کیچِن ایز اِسمال', tip: 'kitchen یعنی آشپزخانه. bathroom یعنی حمام. bedroom یعنی اتاق خواب.' },
      { id: 'house-2', en: 'Please close the door.', fa: 'لطفاً در را ببند.', pronunciation: 'پلیز کلُوز دِ دور', tip: 'close یعنی بستن. open یعنی باز کردن. door یعنی در.' },
      { id: 'house-3', en: 'The keys are on the table.', fa: 'کلیدها روی میز هستند.', pronunciation: 'دَ کیز آر آن دِ تِیبِل', tip: 'on یعنی «روی». keys جمع key است. table یعنی میز.' },
    ],
  },
  {
    id: 'help', title: 'یه کمک کوچیک می‌خوام', subtitle: 'درخواست کمک', icon: 'help', color: 'lavender',
    phrases: [
      { id: 'help-1', en: 'Can you show me?', fa: 'می‌تونی بهم نشون بدی؟', pronunciation: 'کَن یو شُو می', tip: 'show یعنی «نشان دادن». وقتی نمی‌دانی چیزی کجاست یا چطور کار می‌کند.' },
      { id: 'help-2', en: "I'm lost.", fa: 'گم شدم.', pronunciation: 'آیم لاست', tip: 'lost یعنی گم‌شده. در شهر غریب این جمله خیلی مهم است!' },
      { id: 'help-3', en: 'Could you take a photo of me?', fa: 'می‌شه ازم عکس بگیری؟', pronunciation: 'کود یو تِیک ا فُوتُو آو می', tip: 'could مؤدبانه‌تر از can است. take a photo یعنی عکس گرفتن.' },
    ],
  },
  {
    id: 'restaurant', title: 'منو لطفاً!', subtitle: 'در رستوران', icon: 'restaurant', color: 'sage',
    phrases: [
      { id: 'restaurant-1', en: 'A table for two, please.', fa: 'یک میز برای دو نفر، لطفاً.', pronunciation: 'ا تِیبِل فُر تو، پلیز', tip: 'وقتی وارد رستوران می‌شوی این جمله را بگو. عدد را عوض کن.' },
      { id: 'restaurant-2', en: "What do you recommend?", fa: 'چی پیشنهاد می‌دی؟', pronunciation: 'وات دو یو رِکِمِند', tip: 'recommend یعنی «پیشنهاد دادن». از گارسون بپرس چه غذایی خوب است.' },
      { id: 'restaurant-3', en: 'The bill, please.', fa: 'صورتحساب، لطفاً.', pronunciation: 'دِ بیل، پلیز', tip: 'bill یعنی صورتحساب. در آمریکا check هم می‌گویند.' },
    ],
  },
  {
    id: 'transport', title: 'سوار شیم بریم', subtitle: 'حمل و نقل', icon: 'transport', color: 'blue',
    phrases: [
      { id: 'transport-1', en: 'How do I get to the station?', fa: 'چطور به ایستگاه برسم؟', pronunciation: 'هاو دو آی گِت تو دِ اِستِیشِن', tip: 'How do I get to یعنی «چطور برسم به». station یعنی ایستگاه.' },
      { id: 'transport-2', en: 'One ticket, please.', fa: 'یک بلیط، لطفاً.', pronunciation: 'وان تیکِت، پلیز', tip: 'ticket یعنی بلیط. round trip یعنی رفت و برگشت. one way یعنی یک‌طرفه.' },
      { id: 'transport-3', en: 'How long does it take?', fa: 'چقدر طول می‌کشه؟', pronunciation: 'هاو لانگ داز ایت تِیک', tip: 'How long یعنی «چقدر». take اینجا یعنی «طول کشیدن».' },
    ],
  },
  {
    id: 'party', title: 'تولدت مبارک!', subtitle: 'جشن و مناسبت‌ها', icon: 'party', color: 'peach',
    phrases: [
      { id: 'party-1', en: 'Happy birthday!', fa: 'تولدت مبارک!', pronunciation: 'هَپی بِرث‌دِی', tip: 'ساده‌ترین و رایج‌ترین تبریک تولد. می‌توانی اسم شخص را هم اضافه کنی.' },
      { id: 'party-2', en: 'Congratulations!', fa: 'تبریک می‌گم!', pronunciation: 'کِنگرَچولِیشِنز', tip: 'برای هر موفقیت: عروسی، فارغ‌التحصیلی، کار جدید. همیشه جمع با s.' },
      { id: 'party-3', en: 'Would you like to come?', fa: 'دوست داری بیای؟', pronunciation: 'وود یو لایک تو کام', tip: 'Would you like مؤدبانه‌تر از Do you want است. برای دعوت عالی است.' },
    ],
  },
  {
    id: 'tech', title: 'گوشیم کو؟', subtitle: 'تکنولوژی و اینترنت', icon: 'tech', color: 'lavender',
    phrases: [
      { id: 'tech-1', en: "What's the WiFi password?", fa: 'رمز وای‌فای چیه؟', pronunciation: 'واتس دِ وای‌فای پَسوِرد', tip: 'password یعنی رمز عبور. در کافه، هتل یا خانهٔ کسی این سؤال خیلی رایج است.' },
      { id: 'tech-2', en: 'My phone is dead.', fa: 'گوشیم خاموش شده.', pronunciation: 'مای فُن ایز دِد', tip: 'dead اینجا یعنی «باتری تمام شده»..charge یعنی شارژ کردن.' },
      { id: 'tech-3', en: 'Can I use your charger?', fa: 'می‌تونم از شارژرت استفاده کنم؟', pronunciation: 'کَن آی یوز یور چارجِر', tip: 'charger یعنی شارژر. use یعنی «استفاده کردن».' },
    ],
  },
];

export const allPhrases = lessons.flatMap((lesson) => lesson.phrases);
export const phraseById = new Map(allPhrases.map((phrase) => [phrase.id, phrase]));
export const lessonById = new Map(lessons.map((lesson) => [lesson.id, lesson]));
