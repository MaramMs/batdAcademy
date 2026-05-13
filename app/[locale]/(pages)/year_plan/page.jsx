import { getMeta } from "@/action/meta";
import YearPlan from "./YearPlan";
export async function generateMetadata({ params }) {
    const { locale } = await params;
    const slug = "the-annual-training-plan-for-the-courses-and-programs-of-the-british-academy";

 const fallback = {
        title: "Year Plan | British Academy for Training & Development",
        description: "Browse the British Academy for Training & Development year training plan and explore upcoming courses.",
        keywords: undefined,
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


const YearPlanPage = () => {
    return <YearPlan />;
};

export default YearPlanPage;