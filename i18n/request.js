import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  // ── import each page's messages ──────────────────────────────
  const topNavMessages = (
    await import(`../messages/layout/${locale}/top-nav.json`)
  ).default;
  const mainNavMessages = (
    await import(`../messages/layout/${locale}/main-navbar.json`)
  ).default;

  const heroMessages = (
    await import(`../messages/(pages)/home/${locale}/hero.json`)
  ).default;
   const titleMessages = (
    await import(`../messages/(pages)/home/${locale}/title.json`)
  ).default;
  const navgationBarMessages = (
    await import(`../messages/common/${locale}/NavgationBar.json`)
  ).default;
  const headerCourseMessages = (
    await import(`../messages/(pages)/courseDetails/${locale}/header.json`)
  ).default;
  const headerCityMessages = (
    await import(`../messages/(pages)/city/${locale}/header.json`)
  ).default;
    const titleCityMessages = (
    await import(`../messages/(pages)/city/${locale}/title.json`)
  ).default;
    const footerMessages = (
    await import(`../messages/layout/${locale}/footer.json`)
  ).default;
  const commonMessages = (
    await import(`../messages/common/${locale}/common.json`)
  ).default;
  const metaMessages = (
    await import(`../messages/layout/${locale}/meta.json`)
  ).default;
  const errorMessages = (
    await import(`../messages/layout/${locale}/error.json`)
  ).default;
  return {
    locale,
    messages: {
      ...mainNavMessages,
      ...topNavMessages,
      ...heroMessages,
      ...titleMessages,
      ...headerCourseMessages,
      ...headerCityMessages,
      ...titleCityMessages,
      ...footerMessages,
      ...commonMessages,
      ...navgationBarMessages,
      ...metaMessages,
      ...errorMessages,
    },
  };
});