import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';

// 1. تهيئة الـ next-intl middleware
const intlMiddleware = createMiddleware(routing);

// 2. تحديد المسارات المحمية والعامة
const protectedRoutes = ['/myProfile', '/editMyProfile'];
const publicOnlyRoutes = ['/signIn', '/signUp'];

// قائمة بجميع مسارات الموقع المعروفة (لمنع إعادة توجيهها بالخطأ)
const KNOWN_ROUTES = [
  'course_traning', 'course_training', 'category', 'search_course',
  'blog', 'post', 'city', 'consulting', 'jobs', 'signIn', 'signUp',
  'myProfile', 'editMyProfile', 'contact_us', 'privacy', 'registerCourse',
  'registerInternalCourse', 'show_cities', 'year_plan', 'aiChat',
  'forgetPassword', 'resetPassword', 'page', 'printCategory',
];

// دالة مساعدة لفحص ما إذا كان النص يحتوي على حروف عربية
function hasArabicCharacters(text) {
  const arabicPattern = /[\u0600-\u06FF]/;
  return arabicPattern.test(text);
}

export async function middleware(request) {
  const { pathname, searchParams } = request.nextUrl;

  // ========================================================
  // أولاً: خوارزمية التحويل الديناميكي للروابط القديمة والمشوهة (SEO 301)
  // ========================================================

  // أ. معالجة الروابط بدون بادئة لغة (مثل: /course_training/33/slug)
  // تعمل مع كلا التهجئتين: course_training (القديمة) و course_traning (الفعلية في المشروع)
  if (!pathname.startsWith('/ar/') && !pathname.startsWith('/en/')) {
    if (pathname.startsWith('/course_training/') || pathname.startsWith('/course_training/')) {
      // ✅ نستخدم الـ raw URL المشفرة (ليس decoded) لتجنب خطأ Invalid character in header
      const rawUrl = request.url;
      const decodedPathname = decodeURIComponent(pathname);
      const lang = hasArabicCharacters(decodedPathname) ? 'ar' : 'en';
      const url = request.nextUrl.clone();
      // توحيد اسم المسار على course_traning (اسم المجلد الحقيقي)
      // نستخدم request.nextUrl.href للحصول على النسخة المشفرة الآمنة
      url.pathname = `/${lang}${request.nextUrl.pathname.replace('/course_training/', '/course_training/')}`;
      return NextResponse.redirect(url, 301);
    }
  }

  // ب. معالجة الروابط القديمة التي تعتمد على query params (مثل: ?specialization=33)
  const queryKeys = ['specialization', 'category', 'course_id', 'id', 'main_spec'];
  for (let key of queryKeys) {
    if (searchParams.has(key)) {
      const idValue = searchParams.get(key);

      if (/^\d+$/.test(idValue)) {
        // ✅ استخراج اللغة من الرابط الأصلي بشكل صحيح
        let lang = 'ar'; // الافتراضي عربي
        if (pathname.startsWith('/en/')) lang = 'en';

        const url = request.nextUrl.clone();
        // ✅ course_traning هو اسم المجلد الحقيقي - الـ id أرقام فقط لا تحتاج تشفير
        url.pathname = `/${lang}/course_training/${idValue}`;
        url.search = ''; // حذف query params القديمة
        return NextResponse.redirect(url, 301);
      }
    }
  }

  // ج. فحص الخلط: مسار /en/ لكن الـ slug عربي ← وجه لـ /ar/
  // أو مسار /ar/ لكن الـ slug إنجليزي ← وجه لـ /en/
  // ✅ يعمل فقط على صفحة course_traning مع وجود slug حقيقي (ليس صفحات الموقع العادية)
  // const coursePathMatch = pathname.match(/^\/(en|ar)\/(course_tr[ai]ning)\/(\d+)\/(.+)$/);
  // if (coursePathMatch) {
  //   const [, lang, , id, slugPart] = coursePathMatch;
  //   // ✅ نفك التشفير فقط للفحص، لكن نحتفظ بالـ slugPart المشفر للاستخدام في الـ URL
  //   const decodedSlug = decodeURIComponent(slugPart);

  //   if (lang === 'en' && hasArabicCharacters(decodedSlug)) {
  //     // مسار English لكن الـ slug عربي → وجه لـ Arabic
  //     // ✅ نستخدم url.clone() ونعدل فقط بادئة اللغة - الـ URL object يتولى التشفير
  //     const url = request.nextUrl.clone();
  //     url.pathname = `/ar/course_traning/${id}/${slugPart}`;
  //     return NextResponse.redirect(url, 301);
  //   }

  //   if (lang === 'ar' && !hasArabicCharacters(decodedSlug)) {
  //     // مسار Arabic لكن الـ slug إنجليزي → وجه لـ English
  //     const url = request.nextUrl.clone();
  //     url.pathname = `/en/course_traning/${id}/${slugPart}`;
  //     return NextResponse.redirect(url, 301);
  //   }
  // }


  // ج. فحص الخلط: مسار /en/ لكن الـ slug عربي ← وجه لـ /ar/
  const coursePathMatch = pathname.match(/^\/(en|ar)\/(course_tr[ai]ning)\/(\d+)\/(.+)$/);
  if (coursePathMatch) {
    const [, lang, , id, slugPart] = coursePathMatch;
    const decodedSlug = decodeURIComponent(slugPart);

    if (lang === 'en' && hasArabicCharacters(decodedSlug)) {
      const url = request.nextUrl.clone();
      // 🚨 تأمين الرابط بالتشفير المباشر لحماية الـ Location Header
      url.pathname = `/ar/course_traning/${id}/${encodeURIComponent(decodedSlug)}`;
      return NextResponse.redirect(url, 301);
    }

    if (lang === 'ar' && !hasArabicCharacters(decodedSlug)) {
      const url = request.nextUrl.clone();
      url.pathname = `/en/course_traning/${id}/${encodeURIComponent(decodedSlug)}`;
      return NextResponse.redirect(url, 301);
    }
  }

  // ========================================================
  // ثانياً: منطق الحماية والتحقق من الصلاحيات (Authentication)
  // ========================================================

  const pathnameIsMissingLocale = routing.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  const purePathname = pathnameIsMissingLocale
    ? pathname
    : pathname.replace(/^\/(en|ar)/, '') || '/';

  const token = request.cookies.get('auth_token')?.value;

  const isProtectedRoute = protectedRoutes.some(route => purePathname.startsWith(route));
  const isPublicOnlyRoute = publicOnlyRoutes.some(route => purePathname.startsWith(route));

  // إذا كان المستخدم غير مسجل ويحاول دخول صفحة محمية
  if (isProtectedRoute && !token) {
    const locale = pathname.split('/')[1] || routing.defaultLocale;
    const url = new URL(`/${locale}/signIn`, request.url);
    return NextResponse.redirect(url);
  }

  // إذا كان المستخدم مسجل بالفعل ويحاول دخول صفحة تسجيل دخول / إنشاء حساب
  if (isPublicOnlyRoute && token) {
    const locale = pathname.split('/')[1] || routing.defaultLocale;
    const url = new URL(`/${locale}/`, request.url);
    return NextResponse.redirect(url);
  }

  // ========================================================
  // ثالثاً: تمرير الطلب لـ next-intl لتطبيق اللغات وإكمال التشغيل
  // ========================================================
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|assets).*)',
  ],
};