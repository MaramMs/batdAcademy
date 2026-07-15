import { cache } from "react";
import { getCoursesByCity } from "@/action/cities";
import { getCourses } from "@/action/courses";
import AlternatePathsSetter from "@/components/common/AlternatePathsSetter";
import {
  SITE_URL,
  cleanMeta,
  BRAND_NAME,
  cleanJsonLd,
  safeJsonLdString,
  resolveOgImage,
  isPlaceholderImage,
  resolveContentImageUrl,
  resolveCoursePriceCurrency,
  buildOrganizationNode,
  buildWebsiteNode,
} from "@/lib/seoMeta";
import CourseByCityDetails from "./City";

// generateMetadata and the page component both need the same city — memoize per-request
// so they share one API call instead of two independent (and possibly inconsistent) fetches.
const getCachedCityBySlug = cache((locale, slug) => getCoursesByCity(locale, slug));

// No city-specific asset exists in public/asstes yet, so this reuses the same generic
// fallback already used (and approved) for course images — a real, existing file, not
// a place-specific photo (e.g. london.jpg) that would be wrong for every other city.
const FALLBACK_CITY_IMAGE_PATH = "/asstes/details.jpg";

// City.jsx renders this many course cards before any "Show More" click (visibleCount
// initial state) — matches what's actually visible on first load, not the full result set.
const INITIAL_VISIBLE_COURSES = 6;

function buildCityDescription(data) {
  return cleanMeta(data?.meta?.description || data?.details);
}

// Mirrors the query City.jsx itself builds (type -> taxonomy rename), minus city_id:
// courses aren't associated with specific cities in the database, so every city page
// shows the same general course list — city_id is not a real filter and is never sent.
function buildCourseListQuery(searchParams) {
  const query = new URLSearchParams();
  for (const [key, rawValue] of Object.entries(searchParams || {})) {
    if (rawValue == null) continue;
    const value = Array.isArray(rawValue) ? rawValue[0] : rawValue;
    if (value == null) continue;
    query.set(key === "type" ? "taxonomy" : key, value);
  }
  const qs = query.toString();
  return qs ? `?${qs}` : "";
}

// Real, visible top-level links from MainNavBar.jsx's <nav aria-label="Main navigation">.
// Excludes "Training Programs" — that's a <button> dropdown trigger with no direct href,
// not a navigable link itself.
function buildSiteNavigationNode(siteUrl, locale) {
  const items = [
    { name: locale === "ar" ? "الرئيسية" : "Home", path: "" },
    { name: locale === "ar" ? "المدن" : "Cities", path: "/show_cities" },
    { name: locale === "ar" ? "الاستشارات" : "Consulting", path: "/consulting" },
    { name: locale === "ar" ? "المدونة" : "Blog", path: "/blog" },
    { name: locale === "ar" ? "اتصل بنا" : "Contact Us", path: "/contact_us" },
  ];
  return {
    "@type": "SiteNavigationElement",
    "@id": `${siteUrl}#main-navigation`,
    name: items.map((item) => item.name),
    url: items.map((item) => `${siteUrl}/${locale}${item.path}`),
  };
}

// courses come from the same GET /courses call City.jsx uses to render the page (no
// per-city filtering — see buildCourseListQuery). Only courses with a real id/name/slug
// survive, deduped by id; no CourseInstance/dates/location are added since these courses
// have no confirmed session tied to this specific city.
function buildCityCourseItemList({ courses, locale, siteUrl, cityUrl, cityName, organizationId, placeId }) {
  const seenIds = new Set();
  const validCourses = [];
  for (const course of courses || []) {
    if (!course?.id || !course?.name || !course?.slug) continue;
    if (seenIds.has(course.id)) continue;
    seenIds.add(course.id);
    validCourses.push(course);
  }

  if (validCourses.length === 0) return undefined;

  return {
    "@type": "ItemList",
    "@id": `${cityUrl}#course-list`,
    name:
      locale === "ar"
        ? `الدورات التدريبية المتاحة في ${cityName}`
        : `Training courses available in ${cityName}`,
    description:
      locale === "ar"
        ? `استعرض الدورات التدريبية التي تقدمها الأكاديمية البريطانية في ${cityName}.`
        : `Browse the training courses offered by the British Academy in ${cityName}.`,
    inLanguage: locale,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: validCourses.length,
    spatialCoverage: { "@id": placeId },
    itemListElement: validCourses.map((course, index) => {
      const canonicalUrl = `${siteUrl}/${locale}/course_details/${course.id}/${course.slug}`;
      const priceNum = parseFloat(course.price);
      const hasValidPrice =
        course.price != null && course.price !== "" && !Number.isNaN(priceNum) && priceNum > 0;
      // No fallback image here on purpose (unlike the page's own primaryimage): a shared
      // generic photo repeated across every course in a list is worse than no image, and
      // the org logo must never stand in as a course photo.
      const imageUrl = isPlaceholderImage(course.image) ? undefined : resolveOgImage(course.image);

      return {
        "@type": "ListItem",
        position: index + 1,
        url: canonicalUrl,
        item: {
          "@type": "Course",
          "@id": `${canonicalUrl}#course`,
          url: canonicalUrl,
          name: course.name,
          description: cleanMeta(course.details),
          inLanguage: locale,
          category: course.category?.name,
          provider: { "@id": organizationId },
          image: imageUrl ? { "@type": "ImageObject", url: imageUrl } : undefined,
          offers: hasValidPrice
            ? {
                "@type": "Offer",
                url: canonicalUrl,
                price: String(priceNum),
                priceCurrency: resolveCoursePriceCurrency(course),
                availability: "https://schema.org/InStock",
                category: "Paid",
              }
            : undefined,
        },
      };
    }),
  };
}

function buildCityGraph({ city, locale, routeId, routeSlug, siteUrl, cityCourses }) {
  const cityId = routeId || city.id;
  const citySlug = routeSlug || (locale === "ar" ? city.slug_ar : city.slug_en);
  if (!city?.name || !cityId || !citySlug) return null;

  const cityUrl = `${siteUrl}/${locale}/city/${cityId}/${citySlug}`;
  const organizationId = `${siteUrl}#organization`;
  const websiteId = `${siteUrl}#website`;
  const placeId = `${cityUrl}#place`;
  const primaryImageId = `${cityUrl}#primaryimage`;

  const cityImageUrl = resolveContentImageUrl(city.image, siteUrl, FALLBACK_CITY_IMAGE_PATH);
  const pageDescription = buildCityDescription(city) || city.name;

  const website = buildWebsiteNode(siteUrl);
  const organization = buildOrganizationNode(siteUrl);

  const cityImage = {
    "@type": "ImageObject",
    "@id": primaryImageId,
    url: cityImageUrl,
    contentUrl: cityImageUrl,
  };

  const itemListSchema = buildCityCourseItemList({
    courses: cityCourses,
    locale,
    siteUrl,
    cityUrl,
    cityName: city.name,
    organizationId,
    placeId,
  });

  const webPage = {
    "@type": "WebPage",
    "@id": `${cityUrl}#webpage`,
    url: cityUrl,
    name: city.name,
    description: pageDescription,
    isPartOf: { "@id": websiteId },
    about: { "@id": placeId },
    // Only points at the course list when one actually exists — never a dangling @id.
    mainEntity: itemListSchema ? { "@id": `${cityUrl}#course-list` } : undefined,
    primaryImageOfPage: { "@id": primaryImageId },
    breadcrumb: { "@id": `${cityUrl}#breadcrumb` },
    inLanguage: locale,
  };

  const siteNavigation = buildSiteNavigationNode(siteUrl, locale);

  const breadcrumbEntries = [
    { name: locale === "ar" ? "الرئيسية" : "Home", url: `${siteUrl}/${locale}` },
    { name: locale === "ar" ? "جميع المدن" : "All Cities", url: `${siteUrl}/${locale}/show_cities` },
    { name: city.name, url: cityUrl },
  ];

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${cityUrl}#breadcrumb`,
    itemListElement: breadcrumbEntries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: entry.url,
    })),
  };

  // The API returns only a localized country name (city.country.name), never an ISO code
  // ("GB" etc.) — using the real name as Text is valid PostalAddress usage and, unlike the
  // old Laravel schema, is never a hardcoded/wrong value for non-UK cities.
  // addressRegion is intentionally omitted: there is no state/province field anywhere in
  // the API response, so — unlike the old schema — this never reuses the city name as a
  // fake region. Only one Place node exists in the whole graph; ItemList references it by
  // @id via spatialCoverage instead of duplicating it.
  const place = {
    "@type": "Place",
    "@id": placeId,
    name: city.name,
    url: cityUrl,
    image: { "@id": primaryImageId },
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressCountry: city.country?.name,
    },
  };

  const graph = cleanJsonLd([
    website,
    organization,
    cityImage,
    webPage,
    siteNavigation,
    breadcrumb,
    place,
    itemListSchema,
  ]);
  if (!graph) return null;

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export async function generateMetadata({ params }) {
  const { locale, id, slug } = await params;
  const name = slug
    ? decodeURIComponent(slug)
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : "City";
  const fallback = {
    title: `Training Courses in ${name} `,
    description: `Explore training courses available in ${name} from the British Academy for Training & Development.`,
  };
  try {
    const response = await getCachedCityBySlug(locale, slug);
    const res = response?.data;
    if (!res) return fallback;

    const meta = res.meta || {};
    const title = meta.title || res.name || fallback.title;
    const description = buildCityDescription(res) || fallback.description;

    let keywords = meta.keyword;
    if (keywords && typeof keywords === "string" && keywords.startsWith("[")) {
      try {
        const parsed = JSON.parse(keywords);
        keywords = parsed.map((k) => k.value).join(", ");
      } catch (e) {
        console.error("Error parsing keywords:", e);
      }
    }

    const resolvedImageUrl = resolveContentImageUrl(res?.image, SITE_URL, FALLBACK_CITY_IMAGE_PATH);
    const ogImage = { url: resolvedImageUrl, width: 1200, height: 630, alt: title };
    const pageUrl = `${SITE_URL}/${locale}/city/${id}/${slug}`;

    return {
      metadataBase: new URL(SITE_URL),
      title,
      description,
      keywords: keywords || undefined,
      alternates: {
        canonical: `/${locale}/city/${id}/${slug}`,
        languages: {
          en: `${SITE_URL}/en/city/${id}/${slug}`,
          ar: `${SITE_URL}/ar/city/${id}/${slug}`,
          "x-default": `${SITE_URL}/en/city/${id}/${slug}`,
        },
      },
      openGraph: {
        title,
        description,
        type: "article",
        url: pageUrl,
        siteName: BRAND_NAME,
        locale: locale === "ar" ? "ar_AR" : "en_US",
        alternateLocale: locale === "ar" ? ["en_US"] : ["ar_AR"],
        images: [ogImage],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
    };
  } catch (error) {
    console.error("Metadata error:", error);
    const defaultImages = [
      { url: "/og-image.png", width: 1200, height: 630, alt: fallback.title },
    ];
    return {
      ...fallback,
      openGraph: { ...fallback, type: "article", images: defaultImages },
      twitter: {
        card: "summary_large_image",
        ...fallback,
        images: defaultImages,
      },
    };
  }
}

export default async function CourseByCityPage({ params, searchParams }) {
  const { locale, id, slug } = await params;
  const sp = await searchParams;

  let cityData = {};
  try {
    const res = await getCachedCityBySlug(locale, slug);
    cityData = res?.data || {};
  } catch (error) {
    console.error("Failed to fetch city details:", error);
  }

  let cityCourses = [];
  try {
    const coursesRes = await getCourses(locale, buildCourseListQuery(sp));
    cityCourses = (coursesRes?.data?.courses || []).slice(0, INITIAL_VISIBLE_COURSES);
  } catch (error) {
    console.error("Failed to fetch city courses list:", error);
  }

  const citySchema = cityData?.name
    ? buildCityGraph({
        city: cityData,
        locale,
        routeId: id,
        routeSlug: slug,
        siteUrl: SITE_URL,
        cityCourses,
      })
    : null;

  return (
    <>
      {citySchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLdString(citySchema) }}
        />
      )}
      {cityData?.slug_en && cityData?.slug_ar && (
        <AlternatePathsSetter
          enPath={`/city/${cityData.id}/${cityData.slug_en}`}
          arPath={`/city/${cityData.id}/${cityData.slug_ar}`}
        />
      )}
      <CourseByCityDetails />
    </>
  );
}
