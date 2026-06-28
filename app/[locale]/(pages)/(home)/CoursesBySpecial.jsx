'use client'
import GenericSlider from "@/components/common/GenericSlider";
import Tabs from "@/components/common/Tabs";
import Title from "@/components/common/Title";
import Skeleton from "@/components/ui/Skeleton";
import styleContainer from '@/sass/components/common/container.module.scss';
import styles from '@/sass/pages/home/course-by-special.module.scss';
import useCategoriesStore from "@/store/useCategoriesStore";
import { BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

function chunkArray(arr, size) {
    const chunks = []
    for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size))
    return chunks
}

const CourseBySpecialCard = ({ item }) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardImage}>
                {item.icon ?  <Image src={item.icon} alt={item.name} width={40} height={40} /> : <BookOpen /> }
            </div>
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.name}</h3>
                <p className={styles.cardDescription}>{item.courses_count} courses</p>
            </div>

        </div>
    )
}

const CourseBySpecial = ({ items }) => {
    return (
        <div className={styles.courseBySpecial}>
            {
                items?.map((item) => (
                   <Link href={`/course_training/${item.id}/${item.slug}`} key={item.id}>
                    <CourseBySpecialCard  item={item} />
                   </Link>
                ))
            }

        </div>
    )
}

const CoursesBySpecial = () => {
    const { categories, handleGetCategories, isLoading } = useCategoriesStore();
    const [activeTabId, setActiveTabId] = useState(null)
    const [chunkSize, setChunkSize] = useState(6);
    const t = useTranslations('specialized');

    useEffect(() => {
        handleGetCategories();

        const handleResize = () => {
            setChunkSize(window.innerWidth < 1024 ? 1 : 6);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    useEffect(() => {
        if (categories?.length > 0 && !activeTabId) {
            setActiveTabId(categories[0].id)
        }
    }, [categories, activeTabId])

    const slides = useMemo(() => {
        const activeCategory = categories?.find((item) => item.id === activeTabId);
        const specializations = activeCategory?.specializations || [];
        return chunkArray(specializations, chunkSize)
    }, [categories, activeTabId, chunkSize])

    const tabsData = useMemo(() => {
        return categories
            ?.filter(cat => cat?.specializations?.length > 0)
            .map(cat => ({
                id: cat.id,
                title: cat.name,
            })) || [];
    }, [categories]);

    return (
        <section>
            <div className={styleContainer.container}>
                <Title title={t('title')} span={t('span')} subtitle={t('subtitle')} />
                {
                    isLoading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                            <Skeleton type="card" className={styles.skeletonCard} />
                            <Skeleton type="card" className={styles.skeletonCard} />

                        </div>) : (
                        <>
                            <Tabs
                                activeTabId={activeTabId}
                                onTabChange={setActiveTabId}
                                className={styles.specialTabs}
                                tabClassName={styles.specialTab}
                                tabs={tabsData?.slice(0, 4)}
                            />
                            <GenericSlider
                                key={`${activeTabId}-${chunkSize}`}
                                navId="coursebyspecial"
                                items={slides}
                                renderSlide={(slideItems) => <CourseBySpecial items={slideItems} />}
                                breakpoints={{
                                    320: {
                                        slidesPerView: 1.5,
                                    },
                                    768: {
                                        slidesPerView: 1,
                                    },
                                    1024: {
                                        slidesPerView: 1,
                                    },
                                }}

                                
                                spaceBetween={20}
                                showViewAll={false}
                            />
                        </>
                    )
                }
            </div>
        </section>
    );
};

export default CoursesBySpecial;