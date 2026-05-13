import { getCourseBySlug } from "@/action/courses";
import CourseDetails from "./CourseDetails";

export async function generateMetadata({ params }) {
    const { locale, slug } = await params;

    const niceName = slug
        ? decodeURIComponent(slug).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        : "Course";

    const fallback = {
        title: `${niceName} | British Academy for Training & Development`,
        description: `Learn more about the ${niceName} training course at the British Academy for Training & Development.`,
    };

    try {
        const res = await getCourseBySlug(locale, slug);
        const data = res?.data || {};
        const m = data.meta || {};
        const title = data.meta_title || m.meta_title || m.title || data.name || fallback.title;
        const description = data.meta_description || m.meta_description || m.description || data.details || fallback.description;
        const keywords = data.meta_keyword || m.meta_keyword || m.keyword || undefined;
        return {
            title,
            description,
            keywords,
            openGraph: {
                title,
                description,
                type: "website",
                ...(data.image ? { images: [data.image] } : {}),
            },
        };
    } catch {
        return { ...fallback, openGraph: { ...fallback, type: "website" } };
    }
}

export default function CourseDetailsPage() {
    return <CourseDetails />;
}
