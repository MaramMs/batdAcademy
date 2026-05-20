import { getCourseBySlug } from "@/action/courses";
import CourseDetails from "./CourseDetails";
import AlternatePathsSetter from "@/components/common/AlternatePathsSetter";

export async function generateMetadata({ params }) {
    const { locale, slug } = await params;

    const niceName = slug
        ? decodeURIComponent(slug).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        : "training course";

    const fallbackTitle = `${niceName} | British Academy for Training & Development`;
    const fallbackDescription = `Learn about the ${niceName} training course offered by the British Academy for Training & Development.`;

    const fallback = {
        title: fallbackTitle,
        description: fallbackDescription,
        // icons: {
        //     icon: "/favicon.ico",
        //     shortcut: "/favicon.ico",
        //     apple: "/favicon.ico",
        // },
        openGraph: {
            title: fallbackTitle,
            description: fallbackDescription,
            type: "website",
            siteName: "British Academy for Training & Development",
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: fallbackTitle,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: fallbackTitle,
            description: fallbackDescription,
            images: [{ url: '/og-image.png', width: 1200, height: 630 }],
        },
    };
    try {
        const res = await getCourseBySlug(locale, slug)
        const data = res?.data || {};
        console.log(data , 'data from id')
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
                type: "article",
                ...(data?.image ? { images: [data.image] } : {
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
                ...(data?.image ? { images: [data.image] } : {
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
    } catch {
        return { ...fallback, openGraph: { ...fallback, type: "website" } };
    }
}

export default async function CourseDetailsPage({ params }) {
    const { locale, id, slug } = await params;
        let courseData = {};
    try {
        const res = await getCourseBySlug(locale, slug);
        courseData = res?.data || {};
    } catch (error) {
        console.error("Failed to fetch course details:", error);
    }
    return (
        <>
            {courseData?.slug_en && courseData?.slug_ar && (
                <AlternatePathsSetter 
                    enPath={`/course_details/${id}/${courseData.slug_en}`} 
                    arPath={`/course_details/${id}/${courseData.slug_ar}`} 
                />
            )}
            <CourseDetails initialCourse={courseData} />
        </>
    );
}