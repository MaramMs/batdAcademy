"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "./Header";
import UpcomingCouresCard from "@/components/ui/UpcomingCouresCard";
import { upcomingCourses } from "@/data/upcomingcourse";

import { ArrowRight, ChevronRight, Filter } from "lucide-react";
import CategoriesBox from "@/components/common/CategoriesBox";
import Range from "@/components/ui/Range";
import styleContainer from "@/sass/components/common/container.module.scss";
import styles from "@/sass/pages/search-course/search-course.module.scss";
import MotionWrapper from "@/components/common/MotionWrapper";

const SearchCoursePage = () => {
    const [visibleCount, setVisibleCount] = useState(6);

    return (
        <section className={styles.searchCourse}>
            <Header />

            <div className={styles.mainContent}>
                <div className={styleContainer.container}>
                    <div className={styles.wrapper}>
                        <MotionWrapper className={styles.filter}>
                            {/* Filters content */}
                            <CategoriesBox title="All Categories" icon={<Filter size={18} />}>
                                {/* ... */}
                                <div className={styles.sidebarFilterContent}>
                                  <div className={styles.range}>
                                      <h4 className={styles.filterGroupTitle}>Price Range</h4>
                                    <Range
                                        min={0}
                                        max={2000}
                                        step={10}
                                    />
                                  </div>

                                    <h4 className={styles.filterGroupTitle}>Course Type</h4>
                                    <div className={styles.checkboxGroup}>
                                        <label className={styles.checkboxLabel}>
                                            <input type="checkbox" /> Featured Courses
                                        </label>
                                        <label className={styles.checkboxLabel}>
                                            <input type="checkbox" /> Approved Courses
                                        </label>
                                        <label className={styles.checkboxLabel}>
                                            <input type="checkbox" /> Discounted Courses
                                        </label>
                                    </div>
                                </div>
                            </CategoriesBox>

                            <CategoriesBox title="All Category">
                                <ul className={styles.sidebarCategoryList}>
                                    {/* ... category items ... */}
                                    <li>
                                        <span>Business</span>
                                        <div className={styles.badgeWrapper} >
                                            <span className={styles.badge}>95</span>
                                            <ChevronRight size={12} />
                                              </div>
                                    </li>
                                    <li>
                                        <span>Technical</span>
                                         <div className={styles.badgeWrapper} >
                                            <span className={styles.badge}>32</span>
                                            <ChevronRight size={12} />
                                              </div>
                                    </li>
                                    <li>
                                        <span>Power</span>
                                         <div className={styles.badgeWrapper} >
                                            <span className={styles.badge}>32</span>
                                            <ChevronRight size={12} />
                                              </div>
                                    </li>
                                    <li>
                                        <span>Management</span>
                                         <div className={styles.badgeWrapper} >
                                            <span className={styles.badge}>32</span>
                                            <ChevronRight size={12} />
                                              </div>
                                    </li>
                                    <li>
                                        <span>Development</span>
                                         <div className={styles.badgeWrapper} >
                                            <span className={styles.badge}>32</span>
                                            <ChevronRight size={12} />
                                              </div>
                                    </li>
                                </ul>
                            </CategoriesBox>

                            <CategoriesBox title="All Tags">
                                <div className={styles.sidebarTagsContainer}>
                                    {/* ... tag pills ... */}
                                    <span className={styles.tagPill}>Business</span>
                                    <span className={styles.tagPill}>Graphic Design</span>
                                    <span className={styles.tagPill}>Technology</span>
                                    <span className={styles.tagPill}>Business Idea</span>
                                    <span className={styles.tagPill}>App Development</span>
                                    <span className={styles.tagPill}>Website Design</span>
                                    <span className={styles.tagPill}>Marketing</span>
                                    <span className={styles.tagPill}>Leadership</span>
                                    <span className={styles.tagPill}>Finance</span>
                                    <span className={styles.tagPill}>Project Management</span>
                                </div>
                            </CategoriesBox>
                        </MotionWrapper>

                        <MotionWrapper className={styles.coursesWrapper}>
                            <div className={styles.courses}>
                                {
                                    upcomingCourses.slice(0, 6).map((course, index) => (
                                        <UpcomingCouresCard key={index} course={course} />
                                    ))
                                }
                            </div>

                            {visibleCount < upcomingCourses.length && (
                                <Link href="/courses" className={styles.viewMore}>
                                    View more <ArrowRight />
                                </Link>
                            )}
                        </MotionWrapper>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default SearchCoursePage;