import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/**
 * Proxy logic for internationalization and redirects.
 * 
 * @param {import('next/server').NextRequest} request 
 */
export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Custom redirect from "/" to "/en"
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/en", request.url));
  }

  return await intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(en|ar)/:path*"],
};
