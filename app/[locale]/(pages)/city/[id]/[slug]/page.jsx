import { upcomingCourses } from "@/data/upcomingcourse";
import Header from "./Header";
import NavgationBar from "./NavgationBar";
import CategoriesBox from "@/components/common/CategoriesBox";
import Range from "@/components/ui/Range";
import { ChevronRight, Filter } from "lucide-react";
import styles from "@/sass/pages/course-details-by-city/course-details-by-city.module.scss";

import stylesContainer from "@/sass/components/common/container.module.scss";
import UpcomingCouresCard from "@/components/ui/UpcomingCouresCard";
const CourseByCityDetails = () => {
    return (
        <section className={styles.courseByCityDetails}>
            <NavgationBar />
            <Header />

                <div className={styles.mainContent}>
            <div className={stylesContainer.container}>

                    <div className={styles.content}>
                            <div className={styles.filter}>
                            {/* Box 1: Filters/Settings */}
                            <CategoriesBox title="All Categories" icon={<Filter size={18} />}>
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

                            {/* Box 2: Category List */}
                            <CategoriesBox title="All Category">
                                <ul className={styles.sidebarCategoryList}>
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

                            {/* Box 3: Tags */}
                            <CategoriesBox title="All Tags">
                                <div className={styles.sidebarTagsContainer}>
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
                        </div>


                    <div className={styles.rightContent}>
                        {upcomingCourses.slice(0, 6).map((course) => (
                           <UpcomingCouresCard key={course.id} course={course} />
                        ))}
                    </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
export default CourseByCityDetails;