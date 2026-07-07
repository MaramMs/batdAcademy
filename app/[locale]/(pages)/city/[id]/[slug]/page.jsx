import { getCoursesByCity } from "@/action/cities";
import AlternatePathsSetter from "@/components/common/AlternatePathsSetter";
import { SITE_URL } from "@/lib/seoMeta";
import CourseByCityDetails from "./City";
export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
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
    const response = await getCoursesByCity(locale, slug);
    const res = response?.data;
    if (!res) return fallback;

    const meta = res.meta || {};
    const title = meta.title || res.name || fallback.title;
    const description =
      meta.description?.replace(/<[^>]*>?/gm, "") ||
      res.description ||
      fallback.description;

    let keywords = meta.keyword;
    if (keywords && typeof keywords === "string" && keywords.startsWith("[")) {
      try {
        const parsed = JSON.parse(keywords);
        keywords = parsed.map((k) => k.value).join(", ");
      } catch (e) {
        console.error("Error parsing keywords:", e);
      }
    }

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
        locale: locale === "ar" ? "ar_AR" : "en_US",
        alternateLocale: locale === "ar" ? ["en_US"] : ["ar_AR"],
        ...(res?.image
          ? { images: [res.image] }
          : {
              images: [
                {
                  url: "/og-image.png",
                  width: 1200,
                  height: 630,
                  alt: title,
                },
              ],
            }),
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        ...(res?.image
          ? { images: [res.image] }
          : {
              images: [
                {
                  url: "/og-image.png",
                  width: 1200,
                  height: 630,
                  alt: title,
                },
              ],
            }),
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

export default async function CourseByCityPage({ params }) {
  const { locale, slug } = await params;
  let cityData = {};
  try {
    const res = await getCoursesByCity(locale, slug);
    cityData = res?.data || {};
  } catch (error) {
    console.error("Failed to fetch city details:", error);
  }

  return (
    <>
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
