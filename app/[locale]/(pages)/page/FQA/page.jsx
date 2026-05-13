import { getMeta } from "@/action/meta";
import FQA from "./FQA"
export async function generateMetadata({ params }) {
    const { locale } = await params;
    const slug = "frequently-asked-questions-british-academy-for-training-development";

    const fallback = {
        title: "FAQ | British Academy for Training & Development",
        description: "Frequently asked questions about courses, registration, and services at the British Academy for Training & Development.",
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
            title,
            description,
            keywords: keywords || undefined,
            openGraph: { title, description, type: "website" },
        };
    } catch (error) {
        console.error("Metadata error:", error);
        return fallback;
    }
}


const FqaPage = () => {
    return <FQA />;
};

export default FqaPage;