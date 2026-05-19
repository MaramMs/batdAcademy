import { getMeta } from "@/action/meta";
import ShowCities from "./Cities";
export async function generateMetadata({ params }) {
    const { locale } = await params;
    const slug = "all-training-cities-british-academy-for-training-development";

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
            },        };
    } catch (error) {
        console.error("Metadata error:", error);
        return fallback;
    }
}


const ShowCitiesPage = () => {
    return <ShowCities />;
};

export default ShowCitiesPage;