import { getConsultingDetailsBySlug } from "@/action/consulting";
import ConsultingDetails from "./CousltingDetails";

export async function generateMetadata({ params }) {
    const { locale, slug } = await params;


    const niceName = slug
        ? decodeURIComponent(slug).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
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
                    url: '/og-image.png',
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
            images: [{ url: '/og-image.png', width: 1200, height: 630 }],
        },
    };


    try {
        const response = await getConsultingDetailsBySlug(locale, slug);
        const res = response?.data;
        console.log(res, "res resres")
        if (!res) return fallback;

        const meta = res.meta || {};
        const title = meta?.title || res.name || fallback.title;
        const description = meta?.description?.replace(/<[^>]*>?/gm, '') || res.description || fallback.description;

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
            title,
            description,
            keywords: keywords || undefined,
            openGraph: {
                title,
                description,
                type: "article",
                ...(res?.image ? { images: [res.image] } : {
                    images: [{
                        url: '/og-image.png',
                        width: 1200,
                        height: 630,
                        alt: title,
                    }],
                }),
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                ...(res?.image ? { images: [res.image] } : {
                    images: [
                        {
                            url: '/og-image.png',
                            width: 1200,
                            height: 630,
                            alt: title,
                        },
                    ],
                }),
            }
        };
    } catch (error) {
        console.error("Metadata error:", error);
        return { ...fallback, openGraph: { ...fallback, type: "article" } };
    }
}


export default function ConsultingDetailsPage() {
    return <ConsultingDetails />;
}
