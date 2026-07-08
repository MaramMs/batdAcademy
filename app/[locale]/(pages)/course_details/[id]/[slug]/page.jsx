import { cache } from "react";
import { getCourseBySlug } from "@/action/courses";
import AlternatePathsSetter from "@/components/common/AlternatePathsSetter";
import { SITE_URL, cleanMeta, resolveOgImage } from "@/lib/seoMeta";
import CourseDetails from "./CourseDetails";

// generateMetadata and the page component both need the same course — memoize per-request
// so they share one API call instead of two independent (and possibly inconsistent) fetches.
const getCachedCourseBySlug = cache((locale, slug) => getCourseBySlug(locale, slug));

// The API sometimes returns this generic CMS placeholder instead of omitting `image` —
// treat it as "no image" so schema doesn't advertise a blank graphic.
const PLACEHOLDER_IMAGE_PATTERN = /blank-image/i;
const FALLBACK_COURSE_IMAGE_PATH = "/asstes/details.jpg"; // same fallback CourseDetails.jsx renders on-page
const PROVIDER_LOGO_PATH = "/asstes/batdacademy-logo.png";
// Prices are always GBP across the app (see the hardcoded "£" in CourseSummaryCard.jsx /
// MobileCourseHeader.jsx) — the API never returns a per-course currency field.
const COURSE_CURRENCY = "GBP";
const BRAND_NAME = "British Academy for Training & Development";
const IMAGE_MIME_TYPES = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif" };

function getImageMimeType(url) {
  const ext = url?.split(".").pop()?.split(/[?#]/)[0]?.toLowerCase();
  return IMAGE_MIME_TYPES[ext] || "image/jpeg";
}

function buildOgImage({ url, alt }) {
  return { url, width: 1200, height: 630, alt, type: getImageMimeType(url) };
}

function cleanJsonLd(value) {
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

function buildCourseSchema({ course, locale, routeId, routeSlug, siteUrl }) {
  const courseId = routeId || course.id;
  const courseSlug = routeSlug || (locale === "ar" ? course.slug_ar : course.slug_en);
  if (!course?.name || !courseId || !courseSlug) return null;

  const courseUrl = `${siteUrl}/${locale}/course_details/${courseId}/${courseSlug}`;

  const description =
    cleanMeta(
      course.meta_description ||
        course.meta?.meta_description ||
        course.meta?.description ||
        course.details
    ) || course.name;

  const hasRealImage = course.image && !PLACEHOLDER_IMAGE_PATTERN.test(course.image);
  const imageUrl = hasRealImage ? course.image : `${siteUrl}${FALLBACK_COURSE_IMAGE_PATH}`;

  const priceNum = parseFloat(course.price);
  const hasValidPrice =
    course.price != null &&
    course.price !== "" &&
    !Number.isNaN(priceNum) &&
    priceNum > 0;

  // course.tags is corrupted at the API (multi-byte UTF-8 split mid-character), so it's
  // deliberately not used here — fall back to meta.keyword, then name + category + specialization.
  const keywords =
    course.meta?.keyword ||
    course.meta_keyword ||
    [course.name, course.category?.name, course.specialization?.name]
      .filter(Boolean)
      .join(", ");

  const hasCourseInstance =
    Array.isArray(course.dates) && course.dates.length > 0
      ? course.dates
          .filter((session) => session?.date)
          .map((session) => ({
            "@type": "CourseInstance",
            startDate: session.date,
            endDate: session.end_date || session.endDate,
            location: session.city
              ? {
                  "@type": "Place",
                  name: session.city?.name || session.city_name,
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: session.city?.name || session.city_name,
                  },
                }
              : undefined,
          }))
      : undefined;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description,
    inLanguage: locale,
    url: courseUrl,
    identifier: String(courseId),
    educationalLevel: course.stats?.level || "Professional",
    category: course.category?.name,
    keywords,
    audience: {
      "@type": "Audience",
      audienceType: locale === "en" ? "Professionals" : "المهنيون والمحترفون",
    },
    provider: {
      "@type": "Organization",
      name:
        locale === "ar"
          ? "الأكاديمية البريطانية للتدريب والتطوير"
          : BRAND_NAME,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}${PROVIDER_LOGO_PATH}`,
      },
      sameAs: [
        `${siteUrl}/`,
        "https://www.google.com/maps/place/?q=place_id:10431095824899609633",
      ],
    },
    image: {
      "@type": "ImageObject",
      url: imageUrl,
    },
    hasCourseInstance,
    offers: hasValidPrice
      ? {
          "@type": "Offer",
          category: "Paid",
          price: String(priceNum),
          priceCurrency: COURSE_CURRENCY,
          availability: "https://schema.org/InStock",
          url: courseUrl,
        }
      : undefined,
  };

  return cleanJsonLd(schema);
}

export async function generateMetadata({ params }) {
  const { locale, id, slug } = await params;

  const niceName = slug
    ? decodeURIComponent(slug)
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : "training course";

  const fallbackTitle = niceName;
  const fallbackDescription = `Learn about the ${niceName} training course offered by ${BRAND_NAME}.`;
  const fallbackUrl = `${SITE_URL}/${locale}/course_details/${id}/${slug}`;
  const fallbackImage = buildOgImage({ url: `${SITE_URL}/og-image.png`, alt: fallbackTitle });

  const fallback = {
    title: { absolute: fallbackTitle },
    description: fallbackDescription,
    openGraph: {
      title: fallbackTitle,
      description: fallbackDescription,
      type: "website",
      url: fallbackUrl,
      siteName: BRAND_NAME,
      images: [fallbackImage],
    },

    twitter: {
      card: "summary_large_image",
      title: fallbackTitle,
      description: fallbackDescription,
      images: [fallbackImage],
    },
  };
  try {
    const res = await getCachedCourseBySlug(locale, slug);
    const data = res?.data || {};
    const m = data.meta || {};
    const title =
      data.meta_title || m.meta_title || m.title || data.name || fallbackTitle;
    const description =
      data.meta_description ||
      m.meta_description ||
      m.description ||
      data.details ||
      fallback.description;
    const keywords =
      data.meta_keyword || m.meta_keyword || m.keyword || undefined;
    const pageUrl = `${SITE_URL}/${locale}/course_details/${id}/${slug}`;
    const resolvedImageUrl =
      resolveOgImage(data?.image) || `${SITE_URL}${FALLBACK_COURSE_IMAGE_PATH}`;
    const ogImage = buildOgImage({ url: resolvedImageUrl, alt: title });
    return {
      metadataBase: new URL(SITE_URL),
      title: { absolute: title },
      description,
      keywords,
      alternates: {
        canonical: `/${locale}/course_details/${id}/${slug}`,
        languages: {
          en: `${SITE_URL}/en/course_details/${id}/${slug}`,
          ar: `${SITE_URL}/ar/course_details/${id}/${slug}`,
          "x-default": `${SITE_URL}/en/course_details/${id}/${slug}`,
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
    console.error("generateMetadata error:", error);
    return fallback;
  }
}

export default async function CourseDetailsPage({ params }) {
  const { locale, id, slug } = await params;
  let courseData = {};
  try {
    const res = await getCachedCourseBySlug(locale, slug);
    courseData = res?.data || {};
  } catch (error) {
    console.error("Failed to fetch course details:", error);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const courseSchema = courseData?.name
    ? buildCourseSchema({
        course: courseData,
        locale,
        routeId: id,
        routeSlug: slug,
        siteUrl,
      })
    : null;

  return (
    <>
      {courseSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
        />
      )}
      {courseData?.slug_en && courseData?.slug_ar && (
        <AlternatePathsSetter
          enPath={`/course_details/${id}/${courseData.slug_en}`}
          arPath={`/course_details/${id}/${courseData.slug_ar}`}
        />
      )}
      <CourseDetails initialCourse={courseData} />
    </>
  );
}
