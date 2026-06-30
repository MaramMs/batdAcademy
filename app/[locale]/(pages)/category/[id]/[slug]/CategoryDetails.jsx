"use client";

import { useEffect, use, useState } from "react";
import useCategoriesStore from "@/store/useCategoriesStore";
import useCoursesStore from "@/store/useCoursesStore";
import UpcomingCouresCard from "@/components/ui/UpcomingCouresCard";
import Skeleton from "@/components/ui/Skeleton";
import SidebarFilter from "@/components/common/SidebarFilter";
import NoData from "@/components/common/NoData";
import Header from "./Header";
import stylesContainer from "@/sass/components/common/container.module.scss";
import styles from "@/sass/pages/category-details/category-details.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

const CategoryDetails = ({ params }) => {
    const { id } = use(params);
    const t = useTranslations('CourseTraning');
    const locale = useLocale();
    const { categories, handleGetCategories } = useCategoriesStore();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [visibleCount, setVisibleCount] = useState(6);
    const { data, handleGetCourses, isLoading } = useCoursesStore();

    useEffect(() => {
        const paramsString = searchParams.toString();
        const queryString = paramsString ? `?${paramsString}` : "";
        handleGetCourses(queryString);
    }, [searchParams]);
    const firstCourseId = data?.courses?.[0]?.id;
    useEffect(() => {
        setVisibleCount(6);
    }, [firstCourseId]);

    const handleViewMore = () => {
        if (data?.courses && visibleCount < data.courses.length) {
            setVisibleCount(prev => prev + 6);
        } else if (data?.has_more) {
            setVisibleCount(prev => prev + 6);
            const params = new URLSearchParams(window.location.search);
            params.set('cursor', data.next_cursor);
            handleGetCourses(`?${params.toString()}`, true);
        }
    };


    useEffect(() => {
        handleGetCategories();
        handleGetCourses(`?category_id=${id}`);
    }, [id]);

    const updateFilter = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        params.delete('cursor');

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };
    return (
        <div className={styles.categoryDetails}>
            <Header />
            <div className={styles.mainContent}>
                <div className={stylesContainer.container}>
                    <div className={styles.contentWrapper}>
                        {/* <div className={styles.description}>
                            <h1>
                                About Management
                            </h1>
                            <p>
                                Management and managerial skills are considered one of the most vital modern
                                sciences relied upon by organizations and companies alike. The British Academy for
                                Training and Development offers training courses in management due to the significant importance this field holds for participants, as well as the real value it provides to trainees in both their personal
                                lives and current jobs.</p>
                            <p>
                                In the current competitive landscape among various institutions striving to provide the best services, effective management and leadership sciences have become the true benchmarks for success and excellence. Successful management is seen as a key factor in achieving institutional success
                                and reaching leadership positions in the market.
                            </p>
                        </div>

                        <div className={styles.exploreCategory}>
                            <h2>Explore Categories</h2>
                            <div className={styles.categories}>
                                {
                                    categories.map((category) => {
                                        return (
                                            <div key={category.id} className={styles.category}>
                                                <span className={styles.icon}>{category?.icon}</span>
                                                <div className={styles.info}>
                                                    <span className={styles.title}>{category?.name}</span>
                                                    <span className={styles.count}>{category?.count}</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div> */}

                        <div className={styles.content}>
                            <SidebarFilter data={data} updateFilter={updateFilter} />
                            <div className={styles.rightWrapper}>

                            <div className={styles.rightContent}>
                                {isLoading ? (
                                    Array.from({ length: 6 }).map((_, i) => (
                                        <Skeleton key={i} type="card" height="400px" />
                                    ))
                                ) : data?.courses?.length > 0 ? (
                                    data.courses.map((course, index) => (
                                        <UpcomingCouresCard key={index} course={course} />
                                    ))
                                ) : (
                                    <div className={styles.noCourses}>
                                        <NoData message={t('noCategoryCoursesFound')} />
                                    </div>
                                )}
                              
                            </div>

                              {(visibleCount < (data?.courses?.length || 0) || data?.has_more) && (
                                    <button className={styles.showMoreBtn} onClick={handleViewMore}>
                                        {t('showMore')} {locale === 'ar' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default CategoryDetails;
