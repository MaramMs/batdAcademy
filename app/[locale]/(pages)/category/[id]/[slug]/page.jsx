import Header from "./Header";
import styles from "@/sass/pages/category-details/category-details.module.scss";
import stylesContainer from "@/sass/components/common/container.module.scss";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Filter, User } from "lucide-react";
import UpcomingCouresCard from "@/components/ui/UpcomingCouresCard";
import { upcomingCourses } from "@/data/upcomingcourse";
import CategoriesBox from "@/components/common/CategoriesBox";
import Range from "@/components/ui/Range";
const categories = [
    {
        icon: <User />,
        id: 1,
        name: "Management and Administrative Skills",
        count: '5 courses',
    },
    {
        icon: <User />,
        id: 1,
        name: "Management and Administrative Skills",
        count: '5 courses',
    },
    {
        icon: <User />,
        id: 1,
        name: "Management and Administrative Skills",
        count: '5 courses',
    },
    {
        icon: <User />,
        id: 1,
        name: "Management and Administrative Skills",
        count: '5 courses',
    },
    {
        icon: <User />,
        id: 1,
        name: "Management and Administrative Skills",
        count: '5 courses',
    },
    {
        icon: <User />,
        id: 1,
        name: "Management and Administrative Skills",
        count: '5 courses',
    },
    {
        icon: <User />,
        id: 1,
        name: "Management and Administrative Skills",
        count: '5 courses',
    },

]
const CategoryDetailsPage = () => {
    return (
        <div className={styles.categoryDetails}>
            <Header />

            <div className={styles.mainContent}>
                <div className={stylesContainer.container}>

                    <div className={styles.contentWrapper}>
                        <div className={styles.description}>
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
                        </div>

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

            </div>
        </div>
    );
};


export default CategoryDetailsPage;
