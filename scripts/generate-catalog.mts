import { lessons } from '../server/content/curriculum.ts';
import { writeFileSync } from 'node:fs';
const levels = [
 { id:'beginner-1', title:'مبتدی ۱', subtitle:'سلام، معرفی و عبارت‌های اول', order:1, band:'beginner', description:'از صفرِ صفر؛ سلام کردن، معرفی خودت و جمله‌های خیلی کوتاه.' },
 { id:'beginner-2', title:'مبتدی ۲', subtitle:'خانه، خانواده و خرید ساده', order:2, band:'beginner', description:'کلمه‌های روزمره دربارهٔ خانواده، غذا، خانه و زمان.' },
 { id:'beginner-3', title:'مبتدی ۳', subtitle:'شهر، سفر و کمک گرفتن', order:3, band:'beginner', description:'آدرس پرسیدن، خرید، آب‌وهوا و درخواست کمک.' },
 { id:'intermediate-1', title:'متوسط ۱', subtitle:'زندگی روزمره و احساس‌ها', order:4, band:'intermediate', description:'دربارهٔ کار، روزمره، احساس‌ها و علایقت صحبت کن.' },
 { id:'intermediate-2', title:'متوسط ۲', subtitle:'موقعیت‌های واقعی', order:5, band:'intermediate', description:'سفر، مدرسه، رستوران، جشن و فناوری.' },
 { id:'intermediate-3', title:'متوسط ۳', subtitle:'نظر، برنامه و تجربه', order:6, band:'intermediate', description:'نظر بده، برنامه بریز، تجربه‌ها را تعریف کن و مقایسه کن.' },
 { id:'advanced-1', title:'پیشرفته ۱', subtitle:'کار و ارتباط حرفه‌ای', order:7, band:'advanced', description:'ایمیل کاری، جلسه، ارائه، مذاکره و بازخورد.' },
 { id:'advanced-2', title:'پیشرفته ۲', subtitle:'جامعه، رسانه و پژوهش', order:8, band:'advanced', description:'خبر، محیط زیست، فرهنگ، پژوهش و استدلال.' },
 { id:'advanced-3', title:'پیشرفته ۳', subtitle:'ظرافت و بیان پیشرفته', order:9, band:'advanced', description:'اصطلاحات، داستان‌گویی، ترغیب، نوشتار علمی و مصاحبه.' },
 { id:'professional', title:'حرفه‌ای', subtitle:'رهبری،.strategy و تصمیم‌های کلان', order:10, band:'professional', description:'رهبری، استراتژی، مالی، قرارداد و ارتباطات حساس.' },
];
const catalog = lessons.map(l=>({id:l.id,title:l.title,subtitle:l.subtitle,icon:l.icon,color:l.color,levelId:l.levelId,phraseIds:l.phrases.map(p=>p.id)}));
writeFileSync('src/data/catalog.ts', '// Generated lesson metadata only. Protected phrase content lives on the server.\nimport type { Lesson } from "./types";\nexport type LessonMeta = Omit<Lesson,"phrases"> & { phraseIds: string[] };\nexport const levels = '+JSON.stringify(levels,null,2)+' as const;\nexport type LevelId = typeof levels[number]["id"];\nexport const lessonCatalog: LessonMeta[] = '+JSON.stringify(catalog,null,2)+';\nexport const catalogPhraseIds = new Set(lessonCatalog.flatMap(l=>l.phraseIds));\nexport const levelById = new Map<string, typeof levels[number]>(levels.map(l=>[l.id,l]));\nexport const catalogLessonById = new Map(lessonCatalog.map(l=>[l.id,l]));\n');
