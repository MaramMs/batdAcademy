 export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://batdacademy.com";

const ENTITY_MAP = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&rsquo;": "’",
  "&lsquo;": "‘",
  "&rdquo;": "”",
  "&ldquo;": "“",
  "&mdash;": "—",
  "&ndash;": "–",
  "&hellip;": "…",
  "&nbsp;": " ",
  "&copy;": "©",
  "&reg;": "®",
  "&trade;": "™",
};

function decodeEntitiesOnce(input) {
  return input.replace(
    /&(amp|lt|gt|quot|#39|apos|rsquo|lsquo|rdquo|ldquo|mdash|ndash|hellip|nbsp|copy|reg|trade);/g,
    (m) => ENTITY_MAP[m] ?? m
  );
}

export function cleanMeta(input, { maxLength = 0 } = {}) {
  if (input == null) return undefined;
  let out = String(input).replace(/<[^>]*>?/gm, "");
  let prev;
  do {
    prev = out;
    out = decodeEntitiesOnce(out);
  } while (out !== prev);
  out = out.replace(/\s+/g, " ").trim();
  if (maxLength > 0 && out.length > maxLength) {
    out = out.slice(0, maxLength - 1).replace(/\s+\S*$/, "") + "…";
  }
  return out || undefined;
}

export function parseKeywords(raw) {
  if (!raw) return undefined;
  if (Array.isArray(raw)) return raw.filter(Boolean).join(", ") || undefined;
  if (typeof raw !== "string") return undefined;
  const trimmed = raw.trim();
  if (trimmed.startsWith("[")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return (
          parsed
            .map((k) => (typeof k === "string" ? k : k?.value))
            .filter(Boolean)
            .join(", ") || undefined
        );
      }
    } catch {
      /* fall through */
    }
  }
  return trimmed || undefined;
}

export function resolveOgImage(image) {
  if (!image || typeof image !== "string") return undefined;
  // Facebook/Messenger/Twitter crawlers don't render SVG for og:image, and
  // the CMS returns a blank-image.svg placeholder when no image is set.
  if (/\.svg(\?.*)?$/i.test(image)) return undefined;
  return image;
}

// The API sometimes returns this generic CMS placeholder instead of omitting the
// image field entirely — treat it as "no image" everywhere (courses, cities, ...).
const PLACEHOLDER_IMAGE_PATTERN = /blank-image/i;

export function isPlaceholderImage(url) {
  return typeof url === "string" && PLACEHOLDER_IMAGE_PATTERN.test(url);
}

// Single source of truth for resolving a content image (course, city, ...) used by
// both Open Graph and JSON-LD, so the channels never advertise different pictures.
// `fallbackPath` is a site-relative path (e.g. "/asstes/details.jpg") to a real,
// already-existing asset — callers own which fallback fits their content type.
export function resolveContentImageUrl(rawImage, siteUrl, fallbackPath) {
  const resolved = isPlaceholderImage(rawImage) ? undefined : resolveOgImage(rawImage);
  return resolved || `${siteUrl}${fallbackPath}`;
}

export const BRAND_NAME = "British Academy for Training & Development";
export const BRAND_NAME_AR = "الأكاديمية البريطانية للتدريب والتطوير";
export const PROVIDER_LOGO_PATH = "/asstes/batdacademy-logo.png";
// Prices are always GBP across the app (see the hardcoded "£" in CourseSummaryCard.jsx /
// MobileCourseHeader.jsx) — the API never returns a per-course currency field.
export const COURSE_CURRENCY = "GBP";

export function resolveCoursePriceCurrency(course) {
  return course?.currency || course?.price_currency || COURSE_CURRENCY;
}

// Recursively strips undefined/null/""/empty-array/empty-object values so JSON-LD
// output never contains placeholders for data that doesn't exist.
export function cleanJsonLd(value) {
  if (Array.isArray(value)) {
    const arr = value.map(cleanJsonLd).filter((item) => item !== undefined);
    return arr.length ? arr : undefined;
  }

  if (value && typeof value === "object") {
    const obj = Object.entries(value).reduce((acc, [key, val]) => {
      const cleaned = cleanJsonLd(val);
      if (cleaned !== undefined && cleaned !== null && cleaned !== "") {
        acc[key] = cleaned;
      }
      return acc;
    }, {});
    return Object.keys(obj).length ? obj : undefined;
  }

  return value;
}

// Prevents a literal "</script>" inside CMS-sourced text from closing the JSON-LD
// script tag early and breaking out into the surrounding HTML.
export function safeJsonLdString(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

// Same @id must resolve to the same entity on every page/locale, so these two nodes
// are built from constants only — never from per-page or per-locale data.
export function buildOrganizationNode(siteUrl) {
  return {
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    name: BRAND_NAME,
    alternateName: BRAND_NAME_AR,
    url: siteUrl,
    logo: { "@type": "ImageObject", url: `${siteUrl}${PROVIDER_LOGO_PATH}` },
    sameAs: [
      "https://www.facebook.com/batdacademy",
      "https://www.instagram.com/batdacademyuk/",
      "https://www.linkedin.com/company/british-academy-for-training-development-uk/",
      "https://uk.pinterest.com/batdacademy/",
      "https://x.com/batadacademy",
      "https://www.youtube.com/@BatdacademyCoUk",
    ],
  };
}

export function buildWebsiteNode(siteUrl) {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    url: siteUrl,
    name: BRAND_NAME,
    publisher: { "@id": `${siteUrl}#organization` },
    inLanguage: ["en", "ar"],
  };
}

export function localePath(locale, path = "") {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${p === "/" ? "" : p}`;
}

export function buildAlternates(path = "/") {
  const norm = path.startsWith("/") ? path : `/${path}`;
  return {
    languages: {
      en: `/en${norm === "/" ? "" : norm}`,
      ar: `/ar${norm === "/" ? "" : norm}`,
      "x-default": `/en${norm === "/" ? "" : norm}`,
    },
  };
}
