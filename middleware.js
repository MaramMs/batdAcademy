import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const protectedRoutes = ['/myProfile', '/editMyProfile'];
const publicOnlyRoutes = ['/signIn', '/signUp'];

function hasArabicCharacters(text) {
  const arabicPattern = /[\u0600-\u06FF]/;
  return arabicPattern.test(text);
}

export async function middleware(request) {
  const { pathname, searchParams } = request.nextUrl;
  console.log('NEXT_LOCALE cookie:', request.cookies.get('NEXT_LOCALE')?.value);
  console.log('accept-language:', request.headers.get('accept-language'));

  // ========================================================
  // أولاً: SEO Redirects للروابط القديمة
  // ========================================================

  // أ. روابط بدون locale prefix
  if (!pathname.startsWith('/ar/') && !pathname.startsWith('/en/') && pathname !== '/ar' && pathname !== '/en') {

    // ✅ الفحص بدون trailing slash عشان يشمل /course_training و /course_training/
    if (pathname.startsWith('/course_training') || pathname.startsWith('/city')) {

      const segments = pathname.split('/').filter(Boolean);

      // /course_training أو /course_training/ بدون ID
      if (segments.length === 1) {
        const url = request.nextUrl.clone();

        const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;

        let lang = 'en'; 

        if (localeCookie === 'en' || localeCookie === 'ar') {
          lang = localeCookie;
        } else {
          const primaryLang = acceptLang.split(',')[0].trim().substring(0, 2);
          lang = primaryLang === 'ar' ? 'ar' : 'en';
        }

        url.pathname = `/${lang}/search_course`;
        url.search = '';
        return NextResponse.redirect(url, 301);
      }

      // /course_training/33/slug
      const decodedPathname = decodeURIComponent(pathname);
      const lang = hasArabicCharacters(decodedPathname) ? 'ar' : 'en';
      const url = request.nextUrl.clone();
      url.pathname = `/${lang}${pathname}`;
      return NextResponse.redirect(url, 301);
    }
  }

  // ب. روابط query params قديمة مثل ?specialization=33
  // ✅ نستثني الصفحات الحقيقية اللي بتستخدم نفس أسماء الـ params بشكل شرعي
  const legacyQueryExcludedRoutes = ['/registerCourse', '/registerInternalCourse', '/contact_us'];
  const isExcludedFromLegacyRedirect = legacyQueryExcludedRoutes.some(route =>
    pathname.includes(route)
  );

  if (!isExcludedFromLegacyRedirect) {
    const queryKeys = ['specialization', 'category', 'course_id', 'id', 'main_spec'];
    for (let key of queryKeys) {
      if (searchParams.has(key)) {
        const idValue = searchParams.get(key);
        if (/^\d+$/.test(idValue)) {
          const lang = pathname.startsWith('/en/') ? 'en' : 'ar';
          const url = request.nextUrl.clone();
          url.pathname = `/${lang}/course_training/${idValue}`;
          url.search = '';
          return NextResponse.redirect(url, 301);
        }
      }
    }
  }

  // ✅ ج. روابط /ar/search_course?type=X أو /en/search_course?type=X
  if (pathname.match(/^\/(ar|en)\/search_course$/) && searchParams.has('type')) {
    const lang = pathname.startsWith('/en/') ? 'en' : 'ar';
    const url = request.nextUrl.clone();
    url.pathname = `/${lang}/search_course`;
    url.search = ''; // حذف ?type وأي query params ثانية
    return NextResponse.redirect(url, 301);
  }

  // د١. روابط قديمة بـ slug يبدأ بـ Training-Course(s)-in- على أي route فيه id/slug
  // (course_training, city, category, course_details, ...)
  const oldSlugMatch = pathname.match(/^\/(en|ar)\/([a-zA-Z_]+)\/(\d+)\/(.+)$/);
  if (oldSlugMatch) {
    const [, lang, routeName, id, slugPart] = oldSlugMatch;
    const decodedSlug = decodeURIComponent(slugPart);

    if (/^training-courses?-in-/i.test(decodedSlug)) {
      const cleanedSlug = decodedSlug.replace(/^training-courses?-in-/i, '');

      if (cleanedSlug) {
        const url = request.nextUrl.clone();
        url.pathname = `/${lang}/${routeName}/${id}/${encodeURIComponent(cleanedSlug)}`;
        return NextResponse.redirect(url, 301);
      }
    }
  }

  // د٢. فحص slug/locale mismatch
const coursePathMatch = pathname.match(/^\/(en|ar)\/(course_training)\/(\d+)\/(.+)$/);
  if (coursePathMatch) {
    const [, lang, routeName, id, slugPart] = coursePathMatch;
    const decodedSlug = decodeURIComponent(slugPart);

    if (lang === 'en' && hasArabicCharacters(decodedSlug)) {
      const url = request.nextUrl.clone();
      url.pathname = `/ar/${routeName}/${id}/${encodeURIComponent(decodedSlug)}`;
      return NextResponse.redirect(url, 301);
    }

    if (lang === 'ar' && !hasArabicCharacters(decodedSlug)) {
      const url = request.nextUrl.clone();
      url.pathname = `/en/${routeName}/${id}/${encodeURIComponent(decodedSlug)}`;
      return NextResponse.redirect(url, 301);
    }
  }

  // ========================================================
  // ثانياً: Authentication
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

  if (isProtectedRoute && !token) {
    const locale = pathname.split('/')[1] || routing.defaultLocale;
    const url = new URL(`/${locale}/signIn`, request.url);
    return NextResponse.redirect(url);
  }

  if (isPublicOnlyRoute && token) {
    const locale = pathname.split('/')[1] || routing.defaultLocale;
    const url = new URL(`/${locale}/`, request.url);
    return NextResponse.redirect(url);
  }

  // ========================================================
  // ثالثاً: next-intl
  // ========================================================
  const intlResponse = intlMiddleware(request);

  // next-intl's locale-prefix redirect (e.g. "/" -> "/en") always uses 307,
  // which is bad for SEO on a permanent, always-on locale prefix. Re-issue it as 301.
  if (intlResponse.status === 307 || intlResponse.status === 308) {
    const location = intlResponse.headers.get('location');
    if (location) {
      const permanentRedirect = NextResponse.redirect(new URL(location, request.url), 301);
      intlResponse.headers.forEach((value, key) => {
        if (key.toLowerCase() !== 'location') {
          permanentRedirect.headers.set(key, value);
        }
      });
      return permanentRedirect;
    }
  }

  return intlResponse;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|og-image.png|images|assets|asstes|sitemap.xml|robots.txt).*)',
  ],
};