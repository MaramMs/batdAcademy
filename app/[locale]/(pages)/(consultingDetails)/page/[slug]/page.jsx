import { getConsultingDetailsBySlug } from "@/action/consulting";
import ConsultingDetails from "./CousltingDetails";

export async function generateMetadata({ params }) {
    const { locale, slug } = await params;

    const niceName = slug
        ? decodeURIComponent(slug).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        : "Consulting Service";

    const fallback = {
        title: `${niceName} | British Academy for Training & Development`,
        description: `Learn about the ${niceName} consulting service offered by the British Academy for Training & Development.`,
    };


    try {
        const response = await getConsultingDetailsBySlug(locale, slug);
        const res = response?.data;
        if (!res) return fallback;

        const meta = res.meta || {};
        const title = meta.title || res.name || fallback.title;
        const description = meta.description?.replace(/<[^>]*>?/gm, '') || res.description || fallback.description;
        
        let keywords = meta.keyword;
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
                ...(res.image ? { images: [res.image] } : {}),
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                ...(res.image ? { images: [res.image] } : {}),
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
