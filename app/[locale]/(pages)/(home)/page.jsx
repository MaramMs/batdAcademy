import Hero from "./Hero"
import RequestCoures from "./RequestCoures"
import UpcomingCourses from "./UpcomingCourses"
import styles from '@/sass/pages/home/home.module.scss'
import WhatIs from "./WhatIs"
import CourseByCity from "./CourseByCity"
import Customers from "./Customers"
import CoursesBySpecial from "./CoursesBySpecial"
import LastestPublication from "./LastestPublication"
import TeamWork from "./TeamWork"
import ChatAi from "./ChatAi"
import MotionWrapper from "@/components/common/MotionWrapper";
import { getMeta } from "@/action/meta";

export async function generateMetadata({ params }) {
    const { locale } = await params;

    const fallback = {
        title: "British Academy for Training & Development",
        description: "British Academy for Training & Development website",
       icons: {
                icon: "/favicon.ico",
                shortcut: "/favicon.ico",
                apple: "/favicon.ico",
            },
    };

    try {
        const res = await getMeta(locale, "home");
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
                title, description, type: "website",

            },
        };
    } catch (error) {
        console.error("Metadata error:", error);
        return fallback;
    }
}

const Home = () => {
    return (
        <div className={styles.home}>
            <Hero />
            <ChatAi />
            <div className={styles.mainContent}>
                <MotionWrapper><UpcomingCourses /></MotionWrapper>
                <MotionWrapper><CoursesBySpecial /></MotionWrapper>
                <MotionWrapper><RequestCoures /></MotionWrapper>
                <MotionWrapper><WhatIs /></MotionWrapper>
                <MotionWrapper><CourseByCity /></MotionWrapper>
                <MotionWrapper><LastestPublication /></MotionWrapper>
                <MotionWrapper><TeamWork /></MotionWrapper>
                <MotionWrapper><Customers /></MotionWrapper>
            </div>
        </div>
    )
}

export default Home