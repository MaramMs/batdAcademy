"use client";

import CategoriesBox from "@/components/common/CategoriesBox";
import Range from "@/components/ui/Range";
import Skeleton from "@/components/ui/Skeleton";
import UpcomingCouresCard from "@/components/ui/UpcomingCouresCard";
import stylesContainer from "@/sass/components/common/container.module.scss";
import styles from "@/sass/pages/category-details/category-details.module.scss";
import useCategoriesStore from "@/store/useCategoriesStore";
import useCoursesStore from "@/store/useCoursesStore";
import { ChevronRight, Filter } from "lucide-react";
import Link from "next/link";
import { use, useEffect } from "react";
import Header from "./Header";

const SpecializationDetails = ({ params }) => {
  const { id } = use(params);
  const { categories, handleGetCategories } = useCategoriesStore();
  const { data, handleGetCourses, isLoading } = useCoursesStore();

  useEffect(() => {
    handleGetCategories();
    handleGetCourses(`?specialization_id=${id}`);
  }, [id]);

  return (
    <div className={styles.categoryDetails}>
      <Header />

      <div className={styles.mainContent}>
        <div className={stylesContainer.container}>
          <div className={styles.contentWrapper}>
            <div className={styles.content}>
              <div className={styles.filter}>
                {/* Box 1: Filters/Settings */}
                <CategoriesBox
                  title="All Categories"
                  icon={<Filter size={18} />}
                >
                  <div className={styles.sidebarFilterContent}>
                    <div className={styles.range}>
                      <h4 className={styles.filterGroupTitle}>Price Range</h4>
                      <Range min={0} max={2000} step={10} />
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
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <li key={category.id}>
                          <Link
                            href={`/category/${category.id}/${category.slug}`}
                          >
                            <span>{category.name}</span>
                            <div className={styles.badgeWrapper}>
                              <span className={styles.badge}>
                                {category.count || category.courses_count}
                              </span>
                              <ChevronRight size={12} />
                            </div>
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li>No categories found</li>
                    )}
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
                    <h3>No courses found in this specialization</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecializationDetails;
