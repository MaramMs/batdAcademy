import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/**
 * Proxy (formerly Middleware) logic for internationalization and redirects.
 * 
 * @param {import('next/server').NextRequest} request 
 */
export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Custom redirect from "/" to "/en" as requested by the user
  if (pathname === "/") {
    return Response.redirect(new URL("/en`", request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ar|en)/:path*"],
};
