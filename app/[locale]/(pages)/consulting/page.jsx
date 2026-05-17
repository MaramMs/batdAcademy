import { getMeta } from "@/action/meta";
import Consulting from "./Consulting";
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export async function generateMetadata({ params }) {
    const { locale } = await params;
    const slug = 'our-consulting-and-management-services-british-academy-for-training-development'

    const fallback = {
        title: "Consulting Services | British Academy for Training & Development",
        description: "Discover professional consulting services offered by the British Academy for Training & Development.",
        icons: {
            icon: "/favicon.ico",
            shortcut: "/favicon.ico",
            apple: "/favicon.ico",
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
            title,
            description,
            keywords: keywords || undefined,
            icons: {
                icon: "/favicon.ico",
                shortcut: "/favicon.ico",
                apple: "/favicon.ico",
            },
            openGraph: {
                title,
                description,
                type: "website",
                images: [
                    {
                        url: `${baseUrl}/logo.png`,  
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
        images: [`${baseUrl}/logo.png`],
    },
        }
    } catch (error) {
            console.error("Metadata error:", error);
            return {
                ...fallback,
                openGraph: { ...fallback, type: "website" },
            };
        }
    }

const ConsultingPage = () => {
        return (
            <Consulting />
        );
    };

    export default ConsultingPage;
