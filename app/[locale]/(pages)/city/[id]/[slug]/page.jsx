"use client";
import Header from "./Header";
import NavgationBar from "./NavgationBar";
import CategoriesBox from "@/components/common/CategoriesBox";
import Range from "@/components/ui/Range";
import { ChevronRight, Filter, ArrowRight } from "lucide-react";
import styles from "@/sass/pages/course-details-by-city/course-details-by-city.module.scss";
import stylesContainer from "@/sass/components/common/container.module.scss";
import UpcomingCouresCard from "@/components/ui/UpcomingCouresCard";
import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter, usePathname } from "next/navigation";
import useCoursesStore from "@/store/useCoursesStore";
import Skeleton from "@/components/ui/Skeleton";
import Category from "@/components/ui/Categories";
import MotionWrapper from "@/components/common/MotionWrapper";

const CourseByCityDetails = () => {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { data, handleGetCourses, isLoading } = useCoursesStore();
    const [visibleCount, setVisibleCount] = useState(6);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("city_id", id);
        const queryString = `?${params.toString()}`;
        handleGetCourses(queryString);
    }, [searchParams, id, handleGetCourses]);

    const updateFilter = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        params.delete("cursor");
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleViewMore = () => {
        if (data?.courses && visibleCount < data.courses.length) {
            setVisibleCount(prev => prev + 6);
        } else if (data?.has_more) {
            setVisibleCount(prev => prev + 6);
            const params = new URLSearchParams(searchParams.toString());
            params.set("city_id", id);
            params.set('cursor', data.next_cursor);
            handleGetCourses(`?${params.toString()}`, true);
        }
    };

    return (
        <section className={styles.courseByCityDetails}>
            <NavgationBar />
            <Header updateFilter={updateFilter} />

            <div className={styles.mainContent}>
                <div className={stylesContainer.container}>
                    <div className={styles.content}>
                        <div className={styles.filter}>
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
                                                checked={searchParams.get('is_featured') === '1'}
                                                onChange={(e) => updateFilter('is_featured', e.target.checked ? '1' : null)}
                                            /> Featured Courses
                                        </label>
                                        <label className={styles.checkboxLabel}>
                                            <input
                                                type="checkbox"
                                                checked={searchParams.get('is_approved') === '1'}
                                                onChange={(e) => updateFilter('is_approved', e.target.checked ? '1' : null)}
                                            /> Approved Courses
                                        </label>
                                        <label className={styles.checkboxLabel}>
                                            <input
                                                type="checkbox"
                                                checked={searchParams.get('is_discounted') === '1'}
                                                onChange={(e) => updateFilter('is_discounted', e.target.checked ? '1' : null)}
                                            /> Discounted Courses
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
                                            onClick={() => updateFilter('category_id', category.id)}
                                            active={searchParams.get('category_id') === String(category.id)}
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
                        </div>

                        <div className={styles.rightContent}>
                            {isLoading && !data?.courses ? (
                                <div className={styles.cards}>
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <Skeleton key={i} type="card" height="400px" />
                                    ))}
                                </div>
                            ) : (
                                <>
                                    <div className={styles.cards}>
                                        {data?.courses?.slice(0, visibleCount)?.map((course, index) => (
                                            <UpcomingCouresCard key={index} course={course} />
                                        ))}
                                    </div>
                                    {(visibleCount < (data?.courses?.length || 0) || data?.has_more) && (
                                        <button className={styles.showMoreBtn} onClick={handleViewMore}>
                                            Show More <ArrowRight size={18} />
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CourseByCityDetails;