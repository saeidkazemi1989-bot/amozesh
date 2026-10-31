// Generated lesson metadata only. Protected phrase content lives on the server.
import type { Lesson } from "./types";
export type LessonMeta = Omit<Lesson,"phrases"> & { phraseIds: string[] };
export const levels = [
  {
    "id": "beginner-1",
    "title": "مبتدی ۱",
    "subtitle": "سلام، معرفی و عبارت‌های اول",
    "order": 1,
    "band": "beginner",
    "description": "از صفرِ صفر؛ سلام کردن، معرفی خودت و جمله‌های خیلی کوتاه."
  },
  {
    "id": "beginner-2",
    "title": "مبتدی ۲",
    "subtitle": "خانه، خانواده و خرید ساده",
    "order": 2,
    "band": "beginner",
    "description": "کلمه‌های روزمره دربارهٔ خانواده، غذا، خانه و زمان."
  },
  {
    "id": "beginner-3",
    "title": "مبتدی ۳",
    "subtitle": "شهر، سفر و کمک گرفتن",
    "order": 3,
    "band": "beginner",
    "description": "آدرس پرسیدن، خرید، آب‌وهوا و درخواست کمک."
  },
  {
    "id": "intermediate-1",
    "title": "متوسط ۱",
    "subtitle": "زندگی روزمره و احساس‌ها",
    "order": 4,
    "band": "intermediate",
    "description": "دربارهٔ کار، روزمره، احساس‌ها و علایقت صحبت کن."
  },
  {
    "id": "intermediate-2",
    "title": "متوسط ۲",
    "subtitle": "موقعیت‌های واقعی",
    "order": 5,
    "band": "intermediate",
    "description": "سفر، مدرسه، رستوران، جشن و فناوری."
  },
  {
    "id": "intermediate-3",
    "title": "متوسط ۳",
    "subtitle": "نظر، برنامه و تجربه",
    "order": 6,
    "band": "intermediate",
    "description": "نظر بده، برنامه بریز، تجربه‌ها را تعریف کن و مقایسه کن."
  },
  {
    "id": "advanced-1",
    "title": "پیشرفته ۱",
    "subtitle": "کار و ارتباط حرفه‌ای",
    "order": 7,
    "band": "advanced",
    "description": "ایمیل کاری، جلسه، ارائه، مذاکره و بازخورد."
  },
  {
    "id": "advanced-2",
    "title": "پیشرفته ۲",
    "subtitle": "جامعه، رسانه و پژوهش",
    "order": 8,
    "band": "advanced",
    "description": "خبر، محیط زیست، فرهنگ، پژوهش و استدلال."
  },
  {
    "id": "advanced-3",
    "title": "پیشرفته ۳",
    "subtitle": "ظرافت و بیان پیشرفته",
    "order": 9,
    "band": "advanced",
    "description": "اصطلاحات، داستان‌گویی، ترغیب، نوشتار علمی و مصاحبه."
  },
  {
    "id": "professional",
    "title": "حرفه‌ای",
    "subtitle": "رهبری،.strategy و تصمیم‌های کلان",
    "order": 10,
    "band": "professional",
    "description": "رهبری، استراتژی، مالی، قرارداد و ارتباطات حساس."
  }
] as const;
export type LevelId = typeof levels[number]["id"];
export const lessonCatalog: LessonMeta[] = [
  {
    "id": "hello",
    "title": "از یه سلام شروع کنیم",
    "subtitle": "سلام و احوال‌پرسی",
    "icon": "hello",
    "color": "sage",
    "levelId": "beginner-1",
    "phraseIds": [
      "hello-1",
      "hello-2",
      "hello-3"
    ]
  },
  {
    "id": "introduce",
    "title": "این منم!",
    "subtitle": "آشنایی با خودت",
    "icon": "user",
    "color": "peach",
    "levelId": "beginner-1",
    "phraseIds": [
      "introduce-1",
      "introduce-2",
      "introduce-3"
    ]
  },
  {
    "id": "polite",
    "title": "چند کلمهٔ مهربون",
    "subtitle": "لطفاً، ممنون، ببخشید",
    "icon": "heart",
    "color": "lavender",
    "levelId": "beginner-1",
    "phraseIds": [
      "polite-1",
      "polite-2",
      "polite-3"
    ]
  },
  {
    "id": "cafe",
    "title": "یه قهوه، لطفاً",
    "subtitle": "در کافه",
    "icon": "coffee",
    "color": "yellow",
    "levelId": "beginner-1",
    "phraseIds": [
      "cafe-1",
      "cafe-2",
      "cafe-3"
    ]
  },
  {
    "id": "understand",
    "title": "نفهمیدم؟ اشکالی نداره",
    "subtitle": "وقتی نیاز به تکرار داری",
    "icon": "ear",
    "color": "blue",
    "levelId": "beginner-1",
    "phraseIds": [
      "understand-1",
      "understand-2",
      "understand-3"
    ]
  },
  {
    "id": "directions",
    "title": "کدوم طرف برم؟",
    "subtitle": "آدرس پرسیدن",
    "icon": "map",
    "color": "sage",
    "levelId": "beginner-3",
    "phraseIds": [
      "directions-1",
      "directions-2",
      "directions-3"
    ]
  },
  {
    "id": "about",
    "title": "کمی از زندگی من",
    "subtitle": "دربارهٔ خودت بگو",
    "icon": "home",
    "color": "peach",
    "levelId": "intermediate-1",
    "phraseIds": [
      "about-1",
      "about-2",
      "about-3"
    ]
  },
  {
    "id": "routine",
    "title": "هر روزِ من",
    "subtitle": "کارهای روزمره",
    "icon": "sun",
    "color": "yellow",
    "levelId": "intermediate-1",
    "phraseIds": [
      "routine-1",
      "routine-2",
      "routine-3"
    ]
  },
  {
    "id": "shopping",
    "title": "یه خرید کوچیک",
    "subtitle": "در فروشگاه",
    "icon": "bag",
    "color": "lavender",
    "levelId": "beginner-3",
    "phraseIds": [
      "shopping-1",
      "shopping-2",
      "shopping-3"
    ]
  },
  {
    "id": "time",
    "title": "الان ساعت چنده؟",
    "subtitle": "زمان و قرار کوتاه",
    "icon": "clock",
    "color": "blue",
    "levelId": "beginner-2",
    "phraseIds": [
      "time-1",
      "time-2",
      "time-3"
    ]
  },
  {
    "id": "feelings",
    "title": "امروز چه حسی داری؟",
    "subtitle": "احساس‌های ساده",
    "icon": "smile",
    "color": "peach",
    "levelId": "intermediate-1",
    "phraseIds": [
      "feelings-1",
      "feelings-2",
      "feelings-3"
    ]
  },
  {
    "id": "conversation",
    "title": "بیا یه کم گپ بزنیم",
    "subtitle": "یک گفت‌وگوی دوستانه",
    "icon": "chat",
    "color": "sage",
    "levelId": "intermediate-1",
    "phraseIds": [
      "conversation-1",
      "conversation-2",
      "conversation-3"
    ]
  },
  {
    "id": "numbers",
    "title": "عددها رو یاد بگیر",
    "subtitle": "شمارش و عددهای پایه",
    "icon": "numbers",
    "color": "blue",
    "levelId": "beginner-1",
    "phraseIds": [
      "numbers-1",
      "numbers-2",
      "numbers-3"
    ]
  },
  {
    "id": "family",
    "title": "خانوادهٔ من",
    "subtitle": "اعضای خانواده",
    "icon": "family",
    "color": "peach",
    "levelId": "beginner-2",
    "phraseIds": [
      "family-1",
      "family-2",
      "family-3"
    ]
  },
  {
    "id": "food",
    "title": "گشنمه!",
    "subtitle": "غذا و خوردنی‌ها",
    "icon": "food",
    "color": "yellow",
    "levelId": "beginner-2",
    "phraseIds": [
      "food-1",
      "food-2",
      "food-3"
    ]
  },
  {
    "id": "weather",
    "title": "هوا چطوره؟",
    "subtitle": "آب و هوا",
    "icon": "weather",
    "color": "blue",
    "levelId": "beginner-3",
    "phraseIds": [
      "weather-1",
      "weather-2",
      "weather-3"
    ]
  },
  {
    "id": "health",
    "title": "حالم خوب نیست",
    "subtitle": "سلامتی و دکتر",
    "icon": "health",
    "color": "lavender",
    "levelId": "beginner-3",
    "phraseIds": [
      "health-1",
      "health-2",
      "health-3"
    ]
  },
  {
    "id": "travel",
    "title": "سفر می‌خوام برم",
    "subtitle": "در فرودگاه و هتل",
    "icon": "travel",
    "color": "sage",
    "levelId": "intermediate-2",
    "phraseIds": [
      "travel-1",
      "travel-2",
      "travel-3"
    ]
  },
  {
    "id": "phone",
    "title": "الو؟ صدات میاد",
    "subtitle": "مکالمهٔ تلفنی",
    "icon": "phone",
    "color": "yellow",
    "levelId": "intermediate-1",
    "phraseIds": [
      "phone-1",
      "phone-2",
      "phone-3"
    ]
  },
  {
    "id": "hobby",
    "title": "وقت آزاد چیکار می‌کنی؟",
    "subtitle": "سرگرمی و علایق",
    "icon": "hobby",
    "color": "peach",
    "levelId": "intermediate-1",
    "phraseIds": [
      "hobby-1",
      "hobby-2",
      "hobby-3"
    ]
  },
  {
    "id": "calendar",
    "title": "چه روزی از هفته‌ست؟",
    "subtitle": "روزها و ماه‌ها",
    "icon": "calendar",
    "color": "lavender",
    "levelId": "beginner-2",
    "phraseIds": [
      "calendar-1",
      "calendar-2",
      "calendar-3"
    ]
  },
  {
    "id": "school",
    "title": "دارم یاد می‌گیرم",
    "subtitle": "در کلاس و مدرسه",
    "icon": "school",
    "color": "blue",
    "levelId": "intermediate-2",
    "phraseIds": [
      "school-1",
      "school-2",
      "school-3"
    ]
  },
  {
    "id": "animals",
    "title": "حیوونای بامزه",
    "subtitle": "حیوانات",
    "icon": "animals",
    "color": "sage",
    "levelId": "intermediate-2",
    "phraseIds": [
      "animals-1",
      "animals-2",
      "animals-3"
    ]
  },
  {
    "id": "clothes",
    "title": "چی بپوشم؟",
    "subtitle": "لباس و پوشاک",
    "icon": "clothes",
    "color": "peach",
    "levelId": "beginner-2",
    "phraseIds": [
      "clothes-1",
      "clothes-2",
      "clothes-3"
    ]
  },
  {
    "id": "house",
    "title": "خونهٔ من",
    "subtitle": "اتاق‌ها و وسایل خانه",
    "icon": "house",
    "color": "yellow",
    "levelId": "beginner-2",
    "phraseIds": [
      "house-1",
      "house-2",
      "house-3"
    ]
  },
  {
    "id": "help",
    "title": "یه کمک کوچیک می‌خوام",
    "subtitle": "درخواست کمک",
    "icon": "help",
    "color": "lavender",
    "levelId": "beginner-3",
    "phraseIds": [
      "help-1",
      "help-2",
      "help-3"
    ]
  },
  {
    "id": "restaurant",
    "title": "منو لطفاً!",
    "subtitle": "در رستوران",
    "icon": "restaurant",
    "color": "sage",
    "levelId": "intermediate-2",
    "phraseIds": [
      "restaurant-1",
      "restaurant-2",
      "restaurant-3"
    ]
  },
  {
    "id": "transport",
    "title": "سوار شیم بریم",
    "subtitle": "حمل و نقل",
    "icon": "transport",
    "color": "blue",
    "levelId": "beginner-3",
    "phraseIds": [
      "transport-1",
      "transport-2",
      "transport-3"
    ]
  },
  {
    "id": "party",
    "title": "تولدت مبارک!",
    "subtitle": "جشن و مناسبت‌ها",
    "icon": "party",
    "color": "peach",
    "levelId": "intermediate-2",
    "phraseIds": [
      "party-1",
      "party-2",
      "party-3"
    ]
  },
  {
    "id": "tech",
    "title": "گوشیم کو؟",
    "subtitle": "تکنولوژی و اینترنت",
    "icon": "tech",
    "color": "lavender",
    "levelId": "intermediate-2",
    "phraseIds": [
      "tech-1",
      "tech-2",
      "tech-3"
    ]
  },
  {
    "id": "opinions",
    "title": "نظر من اینه",
    "subtitle": "بیان نظر ساده",
    "icon": "chat",
    "color": "sage",
    "levelId": "intermediate-3",
    "phraseIds": [
      "opinions-1",
      "opinions-2",
      "opinions-3"
    ]
  },
  {
    "id": "plans",
    "title": "برنامهٔ بعدی چیه؟",
    "subtitle": "برنامه و قصد",
    "icon": "calendar",
    "color": "peach",
    "levelId": "intermediate-3",
    "phraseIds": [
      "plans-1",
      "plans-2",
      "plans-3"
    ]
  },
  {
    "id": "experiences",
    "title": "تا حالا همچین چیزی دیدی؟",
    "subtitle": "تجربه‌های گذشته",
    "icon": "travel",
    "color": "lavender",
    "levelId": "intermediate-3",
    "phraseIds": [
      "experiences-1",
      "experiences-2",
      "experiences-3"
    ]
  },
  {
    "id": "comparisons",
    "title": "کدوم بهتره؟",
    "subtitle": "مقایسه کردن",
    "icon": "bag",
    "color": "yellow",
    "levelId": "intermediate-3",
    "phraseIds": [
      "comparisons-1",
      "comparisons-2",
      "comparisons-3"
    ]
  },
  {
    "id": "requests",
    "title": "مؤدبانه درخواست کن",
    "subtitle": "درخواست و پیشنهاد",
    "icon": "help",
    "color": "blue",
    "levelId": "intermediate-3",
    "phraseIds": [
      "requests-1",
      "requests-2",
      "requests-3"
    ]
  },
  {
    "id": "problems",
    "title": "یه مشکلی پیش اومده",
    "subtitle": "توضیح مشکل",
    "icon": "health",
    "color": "sage",
    "levelId": "intermediate-3",
    "phraseIds": [
      "problems-1",
      "problems-2",
      "problems-3"
    ]
  },
  {
    "id": "work-email",
    "title": "ایمیل کاریِ روشن",
    "subtitle": "مکاتبهٔ اداری",
    "icon": "phone",
    "color": "peach",
    "levelId": "advanced-1",
    "phraseIds": [
      "work-email-1",
      "work-email-2",
      "work-email-3"
    ]
  },
  {
    "id": "meetings",
    "title": "جلسه رو جلو ببر",
    "subtitle": "زبان جلسه",
    "icon": "chat",
    "color": "lavender",
    "levelId": "advanced-1",
    "phraseIds": [
      "meetings-1",
      "meetings-2",
      "meetings-3"
    ]
  },
  {
    "id": "presentations",
    "title": "ارائهٔ قابل فهم",
    "subtitle": "سخنرانی و ارائه",
    "icon": "school",
    "color": "yellow",
    "levelId": "advanced-1",
    "phraseIds": [
      "presentations-1",
      "presentations-2",
      "presentations-3"
    ]
  },
  {
    "id": "negotiation",
    "title": "به توافق برس",
    "subtitle": "مذاکرهٔ ساده",
    "icon": "bag",
    "color": "blue",
    "levelId": "advanced-1",
    "phraseIds": [
      "negotiation-1",
      "negotiation-2",
      "negotiation-3"
    ]
  },
  {
    "id": "feedback",
    "title": "بازخوردِ سازنده",
    "subtitle": "نقد محترمانه",
    "icon": "heart",
    "color": "sage",
    "levelId": "advanced-1",
    "phraseIds": [
      "feedback-1",
      "feedback-2",
      "feedback-3"
    ]
  },
  {
    "id": "deadlines",
    "title": "زمان‌بندیِ پروژه",
    "subtitle": "مهلت و اولویت",
    "icon": "clock",
    "color": "peach",
    "levelId": "advanced-1",
    "phraseIds": [
      "deadlines-1",
      "deadlines-2",
      "deadlines-3"
    ]
  },
  {
    "id": "news",
    "title": "خبر رو دقیق بخون",
    "subtitle": "رسانه و خبر",
    "icon": "tech",
    "color": "lavender",
    "levelId": "advanced-2",
    "phraseIds": [
      "news-1",
      "news-2",
      "news-3"
    ]
  },
  {
    "id": "environment",
    "title": "دربارهٔ محیط زیست",
    "subtitle": "طبیعت و پایداری",
    "icon": "weather",
    "color": "yellow",
    "levelId": "advanced-2",
    "phraseIds": [
      "environment-1",
      "environment-2",
      "environment-3"
    ]
  },
  {
    "id": "tech-ethics",
    "title": "فناوری و مسئولیت",
    "subtitle": "اخلاق فناوری",
    "icon": "tech",
    "color": "blue",
    "levelId": "advanced-2",
    "phraseIds": [
      "tech-ethics-1",
      "tech-ethics-2",
      "tech-ethics-3"
    ]
  },
  {
    "id": "culture",
    "title": "فرهنگ‌ها رو بشناس",
    "subtitle": "ارتباط بین‌فرهنگی",
    "icon": "party",
    "color": "sage",
    "levelId": "advanced-2",
    "phraseIds": [
      "culture-1",
      "culture-2",
      "culture-3"
    ]
  },
  {
    "id": "research",
    "title": "پژوهش رو توضیح بده",
    "subtitle": "زبان علمی ساده",
    "icon": "school",
    "color": "peach",
    "levelId": "advanced-2",
    "phraseIds": [
      "research-1",
      "research-2",
      "research-3"
    ]
  },
  {
    "id": "argument",
    "title": "استدلالِ محکم",
    "subtitle": "منطق و دلیل",
    "icon": "chat",
    "color": "lavender",
    "levelId": "advanced-2",
    "phraseIds": [
      "argument-1",
      "argument-2",
      "argument-3"
    ]
  },
  {
    "id": "nuance",
    "title": "معنیِ پنهانِ کلمه‌ها",
    "subtitle": "ظرافت زبانی",
    "icon": "ear",
    "color": "yellow",
    "levelId": "advanced-3",
    "phraseIds": [
      "nuance-1",
      "nuance-2",
      "nuance-3"
    ]
  },
  {
    "id": "idioms",
    "title": "اصطلاحاتِ طبیعی",
    "subtitle": "زبان روزمرهٔ پیشرفته",
    "icon": "chat",
    "color": "blue",
    "levelId": "advanced-3",
    "phraseIds": [
      "idioms-1",
      "idioms-2",
      "idioms-3"
    ]
  },
  {
    "id": "storytelling",
    "title": "داستان رو زنده کن",
    "subtitle": "روایت جذاب",
    "icon": "hobby",
    "color": "sage",
    "levelId": "advanced-3",
    "phraseIds": [
      "storytelling-1",
      "storytelling-2",
      "storytelling-3"
    ]
  },
  {
    "id": "persuasion",
    "title": "متقاعد کن، نه مجبور",
    "subtitle": "ترغیب اخلاقی",
    "icon": "heart",
    "color": "peach",
    "levelId": "advanced-3",
    "phraseIds": [
      "persuasion-1",
      "persuasion-2",
      "persuasion-3"
    ]
  },
  {
    "id": "academic",
    "title": "بنویس، دقیق و علمی",
    "subtitle": "نوشتار دانشگاهی",
    "icon": "school",
    "color": "lavender",
    "levelId": "advanced-3",
    "phraseIds": [
      "academic-1",
      "academic-2",
      "academic-3"
    ]
  },
  {
    "id": "interview",
    "title": "در مصاحبه بدرخش",
    "subtitle": "مصاحبهٔ شغلی",
    "icon": "user",
    "color": "yellow",
    "levelId": "advanced-3",
    "phraseIds": [
      "interview-1",
      "interview-2",
      "interview-3"
    ]
  },
  {
    "id": "leadership",
    "title": "تیم رو هدایت کن",
    "subtitle": "رهبری",
    "icon": "family",
    "color": "blue",
    "levelId": "professional",
    "phraseIds": [
      "leadership-1",
      "leadership-2",
      "leadership-3"
    ]
  },
  {
    "id": "strategy",
    "title": "استراتژیِ روشن",
    "subtitle": "تفکر راهبردی",
    "icon": "map",
    "color": "sage",
    "levelId": "professional",
    "phraseIds": [
      "strategy-1",
      "strategy-2",
      "strategy-3"
    ]
  },
  {
    "id": "finance",
    "title": "اعدادِ کسب‌وکار",
    "subtitle": "مالی و بودجه",
    "icon": "numbers",
    "color": "peach",
    "levelId": "professional",
    "phraseIds": [
      "finance-1",
      "finance-2",
      "finance-3"
    ]
  },
  {
    "id": "legal",
    "title": "قرارداد رو بفهم",
    "subtitle": "زبان حقوقی پایه",
    "icon": "house",
    "color": "lavender",
    "levelId": "professional",
    "phraseIds": [
      "legal-1",
      "legal-2",
      "legal-3"
    ]
  },
  {
    "id": "diplomacy",
    "title": "دیپلماسیِ کلام",
    "subtitle": "ارتباط حساس",
    "icon": "hello",
    "color": "yellow",
    "levelId": "professional",
    "phraseIds": [
      "diplomacy-1",
      "diplomacy-2",
      "diplomacy-3"
    ]
  },
  {
    "id": "executive",
    "title": "تصمیمِ مدیریتی",
    "subtitle": "رهبری ارشد",
    "icon": "clock",
    "color": "blue",
    "levelId": "professional",
    "phraseIds": [
      "executive-1",
      "executive-2",
      "executive-3"
    ]
  }
];
export const catalogPhraseIds = new Set(lessonCatalog.flatMap(l=>l.phraseIds));
export const levelById = new Map<string, typeof levels[number]>(levels.map(l=>[l.id,l]));
export const catalogLessonById = new Map(lessonCatalog.map(l=>[l.id,l]));
