import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ar" | "en";

const dict = {
  brand: { ar: "عُدّة الهوية", en: "Brand Kit" },
  library: { ar: "المكتبة", en: "Library" },
  shorten: { ar: "اختصار الروابط", en: "Shorten" },
  newKit: { ar: "هوية جديدة", en: "New kit" },
  headlineA: { ar: "احصل على", en: "Get their" },
  headlineB: { ar: "هويتهم.", en: "brand." },
  switchTo: { ar: "English", en: "العربية" },
} as const;

export type DictKey = keyof typeof dict;

// English source string → Arabic. Used by tx() for longer UI copy so
// components can keep their English literals as translation keys.
const arStrings: Record<string, string> = {
  // ingestion panel
  "Reading source": "قراءة المصدر",
  "Sampling palette": "استخلاص الألوان",
  "Reading type": "قراءة الخطوط",
  "Listening for voice": "التقاط نبرة العلامة",
  "Collecting marks": "جمع الشعارات",
  "Inferring tokens": "استنتاج رموز التصميم",
  "Composing kit": "تجميع العدّة",
  "Uploading sources": "رفع الملفات",
  "Creating kit": "إنشاء العدّة",
  "Extracting brand": "استخراج الهوية",
  "Initializing — one moment": "جارٍ التهيئة — لحظة من فضلك",
  "Paste a URL or drop a file": "الصق رابطاً أو أسقط ملفاً",
  "Invalid URL": "رابط غير صالح",
  "Extraction failed": "فشل الاستخراج",
  "paste any website": "الصق أي موقع إلكتروني",
  "Website URL": "رابط الموقع",
  "Extract": "استخراج",
  "Usually 15–30 seconds": "عادةً 15–30 ثانية",
  "Drop assets or click to browse": "أسقط الملفات أو انقر للتصفح",
  "// drop zone": "// منطقة الإفلات",
  "Drag & drop a deck, logo, screenshot, or PDF": "اسحب وأفلت عرضاً أو شعاراً أو لقطة شاشة أو PDF",
  "— or click to browse · PDF · PNG · JPG · WEBP · SVG · 20 MB each": "— أو انقر للتصفح · PDF · PNG · JPG · WEBP · SVG · 20 م.ب لكل ملف",
  "Brand ingestion": "إدخال الهوية",
  "// drop to ingest": "// أفلت للإدخال",
  "Release file": "اترك الملف",
  "Site could not be read — kit uses generic defaults.": "تعذّر قراءة الموقع — ستستخدم العدّة قيماً افتراضية عامة.",
  // extraction progress
  "Reading the source": "قراءة المصدر",
  "Fetching markup, branding metadata, screenshots": "جلب الصفحة وبيانات الهوية ولقطات الشاشة",
  "Sampling the palette": "استخلاص لوحة الألوان",
  "Identifying primary, accent, surface, text": "تحديد اللون الأساسي والمميّز والخلفيات والنصوص",
  "Reading the type": "قراءة الخطوط",
  "Extracting families, weights, scale": "استخراج العائلات والأوزان والمقياس",
  "Listening for voice": "التقاط نبرة العلامة",
  "Tone, vocabulary, do's and don'ts": "النبرة والمفردات وما يُفعل وما لا يُفعل",
  "Collecting marks": "جمع الشعارات",
  "Logos, favicons, social images": "الشعارات والأيقونات وصور المشاركة",
  "Inferring tokens": "استنتاج رموز التصميم",
  "Spacing, radius, motion, shadow": "المسافات والزوايا والحركة والظلال",
  "Composing the kit": "تجميع العدّة",
  "Sorting, naming, scoring contrast": "الترتيب والتسمية وتقييم التباين",
  "// 02 — extraction in progress": "// 02 — جارٍ الاستخراج",
  // recent kits
  "// recent kits": "// العدّات الأخيرة",
  "[ All brand kits → ]": "[ كل عدّات الهوية ← ]",
  "Search your kits…": "ابحث في عدّاتك…",
  "Search your kits": "ابحث في عدّاتك",
  // library
  "// library": "// المكتبة",
  "Your brand kits.": "عدّات الهوية الخاصة بك.",
  "[ Done ]": "[ تم ]",
  "[ Select ]": "[ تحديد ]",
  "Clear all": "إلغاء التحديد",
  "Select all": "تحديد الكل",
  "selected": "محددة",
  "// empty": "// فارغة",
  "No kits yet.": "لا توجد عدّات بعد.",
  "[ Create your first kit ]": "[ أنشئ عدّتك الأولى ]",
  "Rename": "إعادة تسمية",
  "Duplicate": "نسخ",
  "Delete": "حذف",
  "Duplicated": "تم النسخ",
  "Rename failed": "فشلت إعادة التسمية",
  "Duplicate failed": "فشل النسخ",
  "Delete failed": "فشل الحذف",
  "Bulk delete failed": "فشل الحذف الجماعي",
  "Failed to load kits": "تعذّر تحميل العدّات",
  "Deselect": "إلغاء التحديد",
  "Select": "تحديد",
  // start-here
  "// Template guide": "// دليل القالب",
  "What this template does": "ماذا يفعل هذا القالب",
  "Optional: Firecrawl connector": "اختياري: موصّل Firecrawl",
  "When you're done with this guide": "عند الانتهاء من هذا الدليل",
  "← Back to extract": "→ عودة إلى الاستخراج",
  "Prompt — copy into Lovable chat": "الأمر — انسخه إلى محادثة Lovable",
  "Copy": "نسخ",
  "Copied": "تم النسخ",
  "Copy prompt": "نسخ الأمر",
  "Web scraping · 500 free credits": "استخراج الويب · 500 رصيد مجاني",
  "Pricing — mostly free": "الأسعار — مجاني غالباً",
  "Connecting it": "طريقة الربط",
  // kit page — sections & common
  "Overview": "نظرة عامة",
  "Logos & Assets": "الشعارات والأصول",
  "Colors": "الألوان",
  "Typography": "الخطوط",
  "Tokens": "رموز التصميم",
  "Voice": "النبرة",
  "Export": "تصدير",
  "Brand guide": "دليل الهوية",
  "Generate": "توليد",
  "Loading kit": "جارٍ تحميل العدّة",
  "Failed to load kit": "تعذّر تحميل العدّة",
  "We couldn't load this kit": "تعذّر تحميل هذه العدّة",
  "Extraction failed": "فشل الاستخراج",
  "Extraction completed": "اكتمل الاستخراج",
  "Extraction did not complete": "لم يكتمل الاستخراج",
  "Extraction stalled": "توقّف الاستخراج",
  "Download full kit": "تحميل العدّة كاملة",
  "Brand voice (.md)": "نبرة العلامة (.md)",
  "CSS variables": "متغيرات CSS",
  "Tailwind v4 theme": "سمة Tailwind v4",
  "Design tokens (W3C JSON)": "رموز التصميم (W3C JSON)",
  "Tokens Studio (Figma)": "Tokens Studio (Figma)",
  "Design instructions": "تعليمات التصميم",
  "Dark mode": "الوضع الداكن",
  "Light mode": "الوضع الفاتح",
  "Default": "افتراضي",
  "Sample": "عيّنة",
  "License": "الترخيص",
  "Logo": "الشعار",
  "Pick color": "اختر لوناً",
  "Edit color": "تعديل اللون",
  "Delete color": "حذف اللون",
  "Delete asset": "حذف الأصل",
  "Find more": "ابحث عن المزيد",
  "Scanning…": "جارٍ الفحص…",
  "Scan failed": "فشل الفحص",
  "No assets found": "لا توجد أصول",
  "No new assets found": "لا توجد أصول جديدة",
  "No colors extracted": "لم تُستخرج ألوان",
  "No fonts extracted": "لم تُستخرج خطوط",
  "No tokens extracted": "لم تُستخرج رموز",
  "No voice analysis available": "لا يتوفر تحليل للنبرة",
  "No download source": "لا يوجد مصدر للتحميل",
  "Re-scan the source URL for additional logos, marks, and icons": "أعد فحص رابط المصدر بحثاً عن شعارات وأيقونات إضافية",
  "Public link enabled": "تم تفعيل الرابط العام",
  "Public link disabled": "تم تعطيل الرابط العام",
  "Failed to update share": "تعذّر تحديث المشاركة",
  "Couldn't save": "تعذّر الحفظ",
  "Couldn't delete": "تعذّر الحذف",
  "Couldn't scan for more assets": "تعذّر البحث عن أصول إضافية",
  "Could not load source": "تعذّر تحميل المصدر",
  "All variants generated.": "تم توليد جميع النسخ.",
  "Already generated": "مُولَّدة مسبقاً",
  "Generation failed": "فشل التوليد",
  "Hex must be #RRGGBB": "يجب أن يكون اللون بصيغة #RRGGBB",
  "That doesn't look like a valid URL.": "هذا لا يبدو رابطاً صالحاً.",
  "This kit doesn't have a URL to retry.": "لا تحتوي هذه العدّة على رابط لإعادة المحاولة.",
  "This kit has no source URL on file. Start a new kit to retry.": "لا يوجد رابط مصدر محفوظ لهذه العدّة. ابدأ عدّة جديدة لإعادة المحاولة.",
  "Source could not be reached": "تعذّر الوصول إلى المصدر",
  "Page returned no usable signal": "لم تُرجع الصفحة بيانات قابلة للاستخدام",
  "Brand model could not parse the page": "تعذّر على النموذج تحليل الصفحة",
  "Brand model credits exhausted": "نفدت أرصدة النموذج",
  "Brand model rate-limited": "تم تقييد معدل طلبات النموذج",
  "Cause unknown": "السبب غير معروف",
  "Building bundle…": "جارٍ تجهيز الحزمة…",
  "Section heading": "عنوان قسم",
  "Subsection heading": "عنوان فرعي",
  "Caption — supporting detail": "تسمية توضيحية — تفاصيل مساندة",
  "The headline carries the brand": "العنوان الرئيسي يحمل هوية العلامة",
  "What's it about? e.g. launching a new pricing plan": "عمّ يتحدث؟ مثال: إطلاق خطة أسعار جديدة",
  "Slide title": "عنوان الشريحة",
  "Headline": "العنوان الرئيسي",
  "Message": "الرسالة",
  "CTA button": "زر الدعوة لإجراء",
  "Email intro": "مقدمة بريدية",
  "Social post": "منشور اجتماعي",
  "Result": "النتيجة",
  "Status": "الحالة",
  "Cause": "السبب",
  "Color": "اللون",
  "As text": "كنص",
  "As fill": "كتعبئة",
  "[ RETRY EXTRACTION ]": "[ إعادة الاستخراج ]",
  // templates feature
  "Design templates": "قوالب التصميم",
  "Presentation": "عرض تقديمي",
  "App screens": "شاشات تطبيق",
  "Generate a ready-to-use design template from this brand guide": "ولّد قالب تصميم جاهزاً من دليل الهوية هذا",
  "Generating template…": "جارٍ توليد القالب…",
  "Template generation failed": "فشل توليد القالب",
  "Copy template": "نسخ القالب",
  "For sales & marketing: pick a format and the AI builds it on this brand's guide": "للمبيعات والتسويق: اختر الصيغة وسيبنيها الذكاء الاصطناعي وفق دليل هذه العلامة",
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: DictKey) => string;
  tx: (en: string) => string;
};
const LangContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "app-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "ar") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    localStorage.setItem(STORAGE_KEY, l);
    setLangState(l);
  };

  return (
    <LangContext.Provider
      value={{
        lang,
        setLang,
        t: (k) => dict[k][lang],
        tx: (en) => (lang === "ar" ? (arStrings[en] ?? en) : en),
      }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang, t } = useLang();
  return (
    <button
      type="button"
      onClick={() => setLang(lang === "ar" ? "en" : "ar")}
      className={className}
      aria-label={t("switchTo")}
    >
      {t("switchTo")}
    </button>
  );
}
