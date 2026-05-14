import { getMeta } from "@/action/meta";
import RegisterCourse from "./RegisterCourse";
export async function generateMetadata({ params }) {
    const { locale } = await params;
    const slug = "register-your-course-british-academy-for-training-development";

    const fallback = {
        title: "Register Your Course | British Academy for Training & Development",
        description: "Ready to start your professional journey? Fill out the form to register for your chosen course and take the first step towards achieving your goals.",
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


import { Suspense } from 'react';

const RegisterCoursePage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RegisterCourse />
        </Suspense>
    );
};

export default RegisterCoursePage;