import { getMeta } from "@/action/meta";
import Consulting from "./Consulting";

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const slug = 'our-consulting-and-management-services-british-academy-for-training-development'

       const fallback = {
        title: "Consulting Services | British Academy for Training & Development",
        description: "Discover professional consulting services offered by the British Academy for Training & Development.",
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
            openGraph: { title, description, type: "website" },
        };
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
