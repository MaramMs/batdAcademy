import AlternatePathsSetter from "@/components/common/AlternatePathsSetter";
import { getSpecializationBySlug } from "@/action/categories";
import SpecializationDetails from "./SpecializationDetails";
import { SITE_URL, buildAlternates } from "@/lib/seoMeta";
export async function generateMetadata({ params }) {
  const { locale, id, slug } = await params;
  const name = slug
    ? decodeURIComponent(slug)
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : "Category";
  const fallback = {
    metadataBase: new URL(SITE_URL),
    title: `Training Courses in ${name} `,
    description: `Explore training courses available in ${name} from the British Academy for Training & Development.`,
    alternates: {
      canonical: `/${locale}/course_training/${id}/${slug}`,
      ...buildAlternates(`/course_training/${id}/${slug}`),
    },
  };
  try {
    const response = await getSpecializationBySlug(locale, slug);
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
        canonical: `/${locale}/course_training/${id}/${slug}`,
        ...buildAlternates(`/course_training/${id}/${slug}`),
      },
      openGraph: {
        title,
        description,
        type: "article",
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
  let specialData = {};
  try {
    const res = await getSpecializationBySlug(locale, slug);
    specialData = res?.data || {};
  } catch (error) {
    console.error("Failed to fetch city details:", error);
  }

  return (
    <>
      {specialData?.slug_en && specialData?.slug_ar && (
        <AlternatePathsSetter
          enPath={`/course_training/${specialData.id}/${specialData.slug_en}`}
          arPath={`/course_training/${specialData.id}/${specialData.slug_ar}`}
        />
      )}
      <SpecializationDetails params={params} />
    </>
  );
}
