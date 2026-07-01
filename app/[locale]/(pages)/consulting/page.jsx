import { getMeta } from "@/action/meta";
import Consulting from "./Consulting";
import { SITE_URL, buildAlternates } from "@/lib/seoMeta";

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const slug = 'our-consulting-and-management-services-british-academy-for-training-development';

    const fallback = {
        metadataBase: new URL(SITE_URL),
        title: "Consulting Services",
        description: "Discover professional consulting services offered by the British Academy for Training & Development.",
        alternates: { canonical: `/${locale}/consulting`, ...buildAlternates("/consulting") },
        icons: {
            icon: "/favicon.ico",
            shortcut: "/favicon.ico",
            apple: "/favicon.ico",
        },
        openGraph: {
            title: "Consulting Services",
            description: "Discover professional consulting services offered by the British Academy for Training & Development.",
            type: "website",
            siteName: "British Academy for Training & Development",
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: "Consulting Services | British Academy",
                },
            ],
        },
    };

    try {
        const res = await getMeta(locale, slug);
        const meta = res?.meta;
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
            alternates: { canonical: `/${locale}/consulting`, ...buildAlternates("/consulting") },
            icons: {
                icon: "/favicon.ico",
                shortcut: "/favicon.ico",
                apple: "/favicon.ico",
            },

            openGraph: {
                title,
                description,
                type: "website",
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
const ConsultingPage = () => {
    return <Consulting />;
};

export default ConsultingPage;