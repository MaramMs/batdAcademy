import { getMeta } from "@/action/meta";
import FQA from "./FQA"
import { cleanMeta, parseKeywords, buildAlternates } from "@/lib/seoMeta";

const FALLBACK_TITLE = "Frequently Asked Questions";
const FALLBACK_DESC = "Frequently asked questions about courses, registration, and services at the British Academy for Training & Development.";

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const slug = "frequently-asked-questions-british-academy-for-training-development";

    let title = FALLBACK_TITLE;
    let description = FALLBACK_DESC;
    let keywords;

    try {
        const res = await getMeta(locale, slug);
        const meta = res?.meta;
        if (meta) {
            title = cleanMeta(meta.title, { maxLength: 65 }) || FALLBACK_TITLE;
            description = cleanMeta(meta.description, { maxLength: 160 }) || FALLBACK_DESC;
            keywords = parseKeywords(meta.keyword);
        }
    } catch (error) {
        console.error("FAQ metadata error:", error);
    }

    return {
        title,
        description,
        keywords,
        alternates: { canonical: `/${locale}/page/FQA`, ...buildAlternates("/page/FQA") },
        openGraph: {
            title,
            description,
            type: "website",
            images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
        },
        twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
    };
}


const FqaPage = () => {
    return <FQA />;
};

export default FqaPage;