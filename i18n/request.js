import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  // ── import each page's messages ──────────────────────────────
  const topNavMessages = (
    await import(`@/messages/layout/${locale}/top-nav.json`)
  ).default;
  const mainNavMessages = (
    await import(`@/messages/layout/${locale}/main-navbar.json`)
  ).default;
  const heroMessages = (
    await import(`@/messages/(pages)/home/${locale}/hero.json`)
  ).default;
  return {
    locale,
    messages: {
      ...mainNavMessages,
      ...topNavMessages,
      ...heroMessages,
    },
  };
});