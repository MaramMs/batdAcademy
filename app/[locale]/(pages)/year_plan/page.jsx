import { getMeta } from "@/action/meta";
import YearPlan from "./YearPlan";
import { SITE_URL} from "@/lib/seoMeta";
export async function generateMetadata({ params }) {
    const { locale } = await params;
    const slug = "the-annual-training-plan-for-the-courses-and-programs-of-the-british-academy";

    const fallback = {
        title: "Year Plan | British Academy for Training & Development",
        description: "Browse the British Academy for Training & Development year training plan and explore upcoming courses.",
        keywords: undefined,
        icons: {
            icon: "/favicon.ico",
            shortcut: "/favicon.ico",
            apple: "/favicon.ico",
        },
    };

    try {
        const res = await getMeta(locale, slug);
        const meta = res?.meta;
        if (!meta) return fallback;

        const title = meta?.title || fallback.title;
        const description = meta?.description?.replace(/<[^>]*>?/gm, '') || fallback.description;

        let keywords = meta?.keyword;
        if (keywords && typeof keywords === 'string' && keywords.startsWith("[")) {
            try {
                const parsed = JSON.parse(keywords);
                keywords = parsed.map(k => k.value).join(", ");
            } catch (e) {
                console.error("Error parsing keywords:", e);
            }
        }

        return {
             metadataBase: new URL(SITE_URL),
            title,
            description,
            keywords: keywords || undefined,
            icons: {
                icon: "/favicon.ico",
                shortcut: "/favicon.ico",
                apple: "/favicon.ico",
            },
              alternates: {
                    canonical: `/${locale}`,

                  },
            openGraph: {
                title,
                description,
                type: "website",
                   locale: locale === "ar" ? "ar_AR" : "en_US",
        alternateLocale: locale === "ar" ? ["en_US"] : ["ar_AR"],
                siteName: "British Academy for Training & Development",
                images: [
                    {
                        url: '/og-image.png',
                        width: 1200,
                        height: 630,
                        alt: title,
                    },
                ],
            },

            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: [{ url: '/og-image.png', width: 1200, height: 630 }],
            },
        };
    } catch (error) {
        console.error("Metadata error:", error);
        return fallback;
    }
}


const YearPlanPage = () => {
    return <YearPlan />;
};

export default YearPlanPage;