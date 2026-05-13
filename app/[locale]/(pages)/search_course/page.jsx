"use client";
import { useState, useEffect } from "react";

import Header from "./Header";
import UpcomingCouresCard from "@/components/ui/UpcomingCouresCard";

import { ArrowRight, Filter } from "lucide-react";
import CategoriesBox from "@/components/common/CategoriesBox";
import Range from "@/components/ui/Range";
import styleContainer from "@/sass/components/common/container.module.scss";
import styles from "@/sass/pages/search-course/search-course.module.scss";
import MotionWrapper from "@/components/common/MotionWrapper";
import useCoursesStore from "@/store/useCoursesStore";
import Category from "@/components/ui/Categories";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Skeleton from "@/components/ui/Skeleton";


const SearchCoursePage = () => {
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
        <section className={styles.searchCourse}>
            <Header updateFilter={updateFilter} categories={data?.categories} specializations={data?.specializations} cities={data?.cities}/>
            <div className={styles.mainContent}>
                <div className={styleContainer.container}>
                    {!data ? (
                        <div className={styles.wrapper}>
                            <div className={styles.filter}>
                                <Skeleton type="card" height="300px" style={{ marginBottom: '20px' }} />
                                <Skeleton type="card" height="400px" />
                            </div>
                            <div className={styles.coursesWrapper}>
                                <div className={styles.courses}>
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <Skeleton key={i} type="card" height="400px" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.wrapper}>
                            <MotionWrapper className={styles.filter}>
                                <CategoriesBox title="All Categories" icon={<Filter size={18} />}>
                                    <div className={styles.sidebarFilterContent}>
                                        {data?.price_range && (
                                            <div className={styles.range}>
                                                <h4 className={styles.filterGroupTitle}>Price Range</h4>
                                                <Range
                                                    min={data.price_range.min}
                                                    max={data.price_range.max}
                                                    step={10}
                                                    onChange={({ min, max }) => {
                                                        updateFilter('min_price', min);
                                                        updateFilter('max_price', max);
                                                    }}
                                                />
                                            </div>
                                        )}

                                        <h4 className={styles.filterGroupTitle}>Course Type</h4>
                                        <div className={styles.checkboxGroup}>
                                            <label className={styles.checkboxLabel}>
                                                <input
                                                    type="checkbox"
                                                    checked={searchParams.get('is_master') === '2'}
                                                    onChange={(e) => updateFilter('is_master', e.target.checked ? '2' : null)}
                                                /> Master Courses
                                            </label>
                                            <label className={styles.checkboxLabel}>
                                                <input
                                                    type="checkbox"
                                                    checked={searchParams.get('is_diploma') === '3'}
                                                    onChange={(e) => updateFilter('is_diploma', e.target.checked ? '3' : null)}
                                                /> Diploma Courses
                                            </label>
                                            <label className={styles.checkboxLabel}>
                                                <input
                                                    type="checkbox"
                                                    checked={searchParams.get('is_training') === '1'}
                                                    onChange={(e) => updateFilter('is_training', e.target.checked ? '1' : null)}
                                                /> Training Courses
                                            </label>
                                        </div>
                                    </div>
                                </CategoriesBox>
                                <CategoriesBox title="All Category">
                                    <ul className={styles.sidebarCategoryList}>
                                        {data?.categories?.map(category => (
                                            <Category
                                                key={category.id}
                                                category={category}
                                                onClick={() => {
                                                    updateFilter('category_id', category.id);
                                                    updateFilter('specialization_id', null);
                                                }}
                                                active={searchParams.get('category_id') === String(category.id)}
                                                activeSpecializationId={searchParams.get('specialization_id')}
                                                onSpecializationClick={(specId) => {
                                                    updateFilter('category_id', category.id);
                                                    updateFilter('specialization_id', specId);
                                                }}
                                            />
                                        ))}
                                    </ul>
                                </CategoriesBox>
                                <CategoriesBox title="All Tags">
                                    <div className={styles.sidebarTagsContainer}>
                                        {data?.tags?.map((tag, index) => (
                                            <span
                                                key={index}
                                                className={`${styles.tagPill} ${searchParams.get('tag_id') === String(tag) ? styles.active : ''}`}
                                                onClick={() => updateFilter('tag_id', tag)}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </CategoriesBox>
                            </MotionWrapper>

                            <MotionWrapper className={styles.coursesWrapper}>
                                {isLoading ? (
                                    <div className={styles.courses}>
                                        {[1, 2, 3, 4, 5, 6].map((i) => (
                                            <Skeleton key={i} type="card" height="400px" />
                                        ))}
                                    </div>
                                ) : (
                                    <>
                                        <div className={styles.courses}>
                                            {data?.courses?.slice(0, visibleCount)?.map((course, index) => (
                                                <UpcomingCouresCard key={index} course={course} />
                                            ))}
                                        </div>

                                        {(visibleCount < (data?.courses?.length || 0) || data?.has_more) && (
                                            <button className={styles.viewMore} onClick={handleViewMore}>
                                                View More <ArrowRight />
                                            </button>
                                        )}
                                    </>
                                )}
                            </MotionWrapper>
                        </div>
                    )}
                </div>
            </div>
        </section>

    );
};


export default SearchCoursePage;