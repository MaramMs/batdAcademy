import Blog from "./Blog";
import { getMeta } from "@/action/meta";

export async function generateMetadata({ params }) {
    const { locale } = await params;

    const fallback = {
        title: "Blog | British Academy for Training & Development",
        description: "Read the latest articles, news, and insights from the British Academy for Training & Development.",
    };

    try {
        const res = await getMeta(locale, "blog");
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

export default async function BlogPage() {
    return (
        <Blog />
    );
}