import { Check } from "lucide-react";
import { getConsultingDetailsBySlug } from "@/action/consulting";
import AlternatePathsSetter from "@/components/common/AlternatePathsSetter";
import Header from "./Header";
import Overview from "./Overview";
import Process from "./Process";
import ClientTestimonials from "./ClientTestimonials";
import BookConsultation from "./BookConsultation";
import NavgationBar from "./NavgationBar";
import stylesContainer from "@/sass/components/common/container.module.scss";
import styles from "@/sass/pages/consulting/consulting-details/consulting-details.module.scss";

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;

  const niceName = slug
    ? decodeURIComponent(slug)
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : "Consulting Service";

  const fallbackTitle = `${niceName} | British Academy for Training & Development`;
  const fallbackDescription = `Learn about the ${niceName} consulting service offered by the British Academy for Training & Development.`;

  const fallback = {
    title: fallbackTitle,
    description: fallbackDescription,
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
    openGraph: {
      title: fallbackTitle,
      description: fallbackDescription,
      type: "website",
      siteName: "British Academy for Training & Development",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: fallbackTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: fallbackTitle,
      description: fallbackDescription,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
  };

  try {
    const response = await getConsultingDetailsBySlug(locale, slug);
    const res = response?.data;
    if (!res) return fallback;

    const meta = res.meta || {};
    const title = meta?.title || res.name || fallback.title;
    const description =
      meta?.description?.replace(/<[^>]*>?/gm, "") ||
      res.description ||
      fallback.description;

    let keywords = meta?.keyword;
    if (keywords && typeof keywords === "string" && keywords.startsWith("[")) {
      try {
        const parsed = JSON.parse(keywords);
        keywords = parsed.map((k) => k.value).join(", ");
      } catch (e) {
        console.error("Error parsing keywords:", e);
      }
    }

    return {
      title,
      description,
      keywords: keywords || undefined,
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
    return { ...fallback, openGraph: { ...fallback, type: "article" } };
  }
}

export default async function ConsultingDetailsPage({ params }) {
  const { locale, slug } = await params;
     let consultingData = {};
      const res = await getConsultingDetailsBySlug(locale, slug);
    consultingData = res?.data || {};
  return (
    <>
      {consultingData?.slug_en && consultingData?.slug_ar && (
        <AlternatePathsSetter
          enPath={`/page/${consultingData.slug_en}`}
          arPath={`/page/${consultingData.slug_ar}`}
        />
      )}

      <NavgationBar breadcrumb={consultingData?.breadcrumb} />
      <Header />
      <div className={styles.mainContent}>
        <div className={stylesContainer.container}>
          <div className={styles.wrapper}>
            <div className={styles.left}>
              <Overview overview={consultingData?.overview} />
              <Process process={consultingData?.process} />
              <ClientTestimonials testimonials={consultingData?.testimonials} />
            </div>
            <div className={styles.right}>
              <BookConsultation
                bookPackage={consultingData?.package}
                consultingServiceId={consultingData?.id}
              />
              <div className={styles.chooseUs}>
                <h3>{consultingData?.why_choose_us?.title}</h3>
                <ul>
                  {consultingData?.why_choose_us?.items?.map((item, index) => (
                    <li key={index}>
                      <Check size={16} color="#009966" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
