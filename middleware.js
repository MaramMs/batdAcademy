import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';

// 1. Initialize next-intl middleware
const intlMiddleware = createMiddleware(routing);

// 2. Define Protected and Public Routes
// Note: These match the folder names in your app/[locale]/(pages) directory
//  '/registerCourse', '/registerInternalCourse'
const protectedRoutes = ['/myProfile', '/editMyProfile'];
const publicOnlyRoutes = ['/signIn', '/signUp'];

export default async function middleware(request) {
  const { pathname } = request.nextUrl;

  // 3. Extract locale and pure path
  // next-intl middleware handles this, but for our logic we need to check if the path is protected
  const pathnameIsMissingLocale = routing.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  const purePathname = pathnameIsMissingLocale 
    ? pathname 
    : pathname.replace(/^\/(en|ar)/, '') || '/';

  const token = request.cookies.get('auth_token')?.value;

  // 4. Protection Logic
  const isProtectedRoute = protectedRoutes.some(route => purePathname.startsWith(route));
  const isPublicOnlyRoute = publicOnlyRoutes.some(route => purePathname.startsWith(route));

  // If user is NOT authenticated and tries to access a protected route
  if (isProtectedRoute && !token) {
    const locale = pathname.split('/')[1] || routing.defaultLocale;
    const url = new URL(`/${locale}/signIn`, request.url);
    return NextResponse.redirect(url);
  }

  // If user IS authenticated and tries to access signin/signup
  if (isPublicOnlyRoute && token) {
    const locale = pathname.split('/')[1] || routing.defaultLocale;
    const url = new URL(`/${locale}/`, request.url);
    return NextResponse.redirect(url);
  }

  // 5. Let next-intl handle the rest (locales, etc.)
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - API routes (/api)
  // - Static files (_next/static, _next/image, favicon.ico)
  // - Metadata files (robots.txt, sitemap.xml)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)']
};
