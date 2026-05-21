import { SITE_URL } from "@/lib/seoMeta";

const STATIC_ROUTES = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/blog", changeFrequency: "daily", priority: 0.9 },
  { path: "/consulting", changeFrequency: "weekly", priority: 0.8 },
  { path: "/show_cities", changeFrequency: "weekly", priority: 0.8 },
  { path: "/contact_us", changeFrequency: "monthly", priority: 0.6 },
  { path: "/jobs", changeFrequency: "weekly", priority: 0.6 },
  { path: "/page/FQA", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
];

const LOCALES = ["en", "ar"];

function loc(locale, path) {
  const p = path === "/" ? "" : path;
  return `${SITE_URL}/${locale}${p}`;
}

export default function sitemap() {
  const lastModified = new Date();

  return STATIC_ROUTES.flatMap(({ path, changeFrequency, priority }) =>
    LOCALES.map((locale) => ({
      url: loc(locale, path),
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          en: loc("en", path),
          ar: loc("ar", path),
          "x-default": loc("en", path),
        },
      },
    }))
  );
}
