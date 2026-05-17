import CoursesPage from "./Courses";
import { getMeta } from "@/action/meta";

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const slug = "our-top-training-courses-british-academy-for-training-development";

    const fallback = {
        title: "Search Courses | British Academy for Training & Development",
        description: "Search for training courses by keyword, category, city, or date at the British Academy for Training & Development.",
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
            title,
            description,
            keywords: keywords || undefined,
              icons: {
                icon: "/favicon.ico",
                shortcut: "/favicon.ico",
                apple: "/favicon.ico",
            },
            openGraph: { title, description, type: "website" },
        };
    } catch (error) {
        console.error("Metadata error:", error);
        return fallback;
    }
}

export default function SearchCoursePage() {
    return <CoursesPage />;
}
