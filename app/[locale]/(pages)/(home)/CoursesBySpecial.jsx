'use client'
import GenericSlider from "@/components/common/GenericSlider";
import Tabs from "@/components/common/Tabs";
import Title from "@/components/common/Title";
import styleContainer from '@/sass/components/common/container.module.scss';
import styles from '@/sass/pages/home/course-by-special.module.scss';
import { Activity, HeartPulse, Hospital, PillBottle, ShieldCheck, Stethoscope } from "lucide-react";
import { useMemo, useState } from "react";


const itemsByTab = {
    1: [ // All Courses
        { id: 1, icon: <Stethoscope />, title: "Medical Training", description: "3 specializations" },
        { id: 2, icon: <HeartPulse />, title: "Public Health & Epidemiology", description: "2 specializations" },
        { id: 3, icon: <Activity />, title: "Healthcare Services", description: "2 specializations" },
        { id: 4, icon: <Hospital />, title: "Healthcare Policy & Planning", description: "2 specializations" },
        { id: 5, icon: <ShieldCheck />, title: "Medical Quality & Safety", description: "2 specializations" },
        { id: 6, icon: <PillBottle />, title: "Hospital Management", description: "2 specializations" },
        { id: 7, icon: <Stethoscope />, title: "Medical Training", description: "3 specializations" },
        { id: 8, icon: <HeartPulse />, title: "Public Health & Epidemiology", description: "2 specializations" },
        { id: 9, icon: <Activity />, title: "Healthcare Services", description: "2 specializations" },
        { id: 10, icon: <Hospital />, title: "Healthcare Policy & Planning", description: "2 specializations" },
        { id: 11, icon: <ShieldCheck />, title: "Medical Quality & Safety", description: "2 specializations" },
        { id: 12, icon: <PillBottle />, title: "Hospital Management", description: "2 specializations" },
    ],
    2: [ // Upcoming Courses
        { id: 1, icon: <Stethoscope />, title: "Medical Training", description: "3 specializations" },
        { id: 2, icon: <HeartPulse />, title: "Cardiology", description: "1 specialization" },
        { id: 3, icon: <Activity />, title: "Emergency Medicine", description: "2 specializations" },
    ],
    3: [ // Past Courses
        { id: 1, icon: <Hospital />, title: "Hospital Management", description: "2 specializations" },
        { id: 2, icon: <ShieldCheck />, title: "Patient Safety", description: "1 specialization" },
    ],
}

function chunkArray(arr, size) {
    const chunks = []
    for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size))
    return chunks
}

const CourseBySpecialCard = ({ item }) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardImage}>
                {item.icon}
            </div>
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
            </div>

        </div>
    )
}

const CourseBySpecial = ({ items }) => {
    return (
        <div className={styles.courseBySpecial}>
            {
                items?.map((item) => (
                    <CourseBySpecialCard key={item.id} item={item} />
                ))
            }

        </div>
    )
}

const CoursesBySpecial = () => {
    const [activeTabId, setActiveTabId] = useState(1)

    const slides = useMemo(() => {
        const items = itemsByTab[activeTabId] ?? []
        return chunkArray(items, 6)
    }, [activeTabId])

    return (
        <section>
            <div className={styleContainer.container}>
                <Title title="Courses  " span='By Specialization' subtitle='British-European expertise and specialized cadres for your success.' />
                <Tabs activeTabId={activeTabId}
                    onTabChange={setActiveTabId} />
                <GenericSlider
                    key={activeTabId}
                    navId="coursebyspecial"
                    items={slides}
                    renderSlide={(slideItems) => <CourseBySpecial items={slideItems} />}
                    breakpoints={{
                        320: {
                            slidesPerView: 0.5,
                        },
                        640: {
                            slidesPerView: 0.5,
                        },
                        768: {
                            slidesPerView: 0.5,
                        },
                        1024: {
                            slidesPerView: 1,
                        },
                    }}
                    spaceBetween={20}
                    showViewAll={false}
                />
            </div>
        </section>
    );
};

export default CoursesBySpecial;