import { getMeta } from "@/action/meta";
import Blog from "./Blog";
import {SITE_URL, cleanMeta, parseKeywords, buildAlternates } from "@/lib/seoMeta";

const FALLBACK_TITLE = "Blog";
const FALLBACK_DESC = "Read the latest articles, news, and insights from the British Academy for Training & Development.";


export async function generateMetadata({ params }) {
    const { locale } = await params;

    let title = FALLBACK_TITLE;
    let description = FALLBACK_DESC;
    let keywords;

    try {
        const res = await getMeta(locale, "blog");
        const meta = res?.meta;
        if (meta) {
            title = cleanMeta(meta.title, { maxLength: 60 }) || FALLBACK_TITLE;
            description = cleanMeta(meta.description, { maxLength: 160 }) || FALLBACK_DESC;
            keywords = parseKeywords(meta.keyword);
        }
    } catch (error) {
        console.error("Blog metadata error:", error);
    }

    return {
          metadataBase: new URL(SITE_URL),
        title,
        description,
        keywords,
        alternates: { canonical: `/${locale}/blog`, ...buildAlternates("/blog") },
        openGraph: {
            title,
            description,
            type: "website",
             locale: locale === 'ar' ? 'ar_AR' : 'en_US',
                alternateLocale: locale === 'ar' ? ['en_US'] : ['ar_AR'],
            images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/og-image.png"],
        },
    };
}
export default async function BlogPage() {
  return <Blog />;
}
