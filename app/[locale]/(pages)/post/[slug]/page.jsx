import { getPostBySlug } from "@/action/posts";
import BlogDetails from "./BlogDetails";

export async function generateMetadata({ params }) {
    const { locale, slug } = await params;

    const niceName = slug
        ? decodeURIComponent(slug).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        : "Article";

    const fallback = {
        title: `${niceName} | British Academy for Training & Development`,
        description: `Read this article from the British Academy for Training & Development blog.`,
    };

    try {
        const response = await getPostBySlug(locale, slug);
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


export default function BlogDetailsPage() {
    return <BlogDetails />;
}
