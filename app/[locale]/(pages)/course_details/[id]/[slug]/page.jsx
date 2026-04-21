'use client'
import CategoriesBox from "@/components/common/CategoriesBox";
import Header from "./Header";
import Range from "@/components/ui/Range";
import { ArrowRight, ChevronRight, Filter, Play, Info, List, PlayCircle, MessageCircle, Mail, Copy, Printer, Calendar, Star, Users, Clock, Award } from "lucide-react";
import styles from "@/sass/pages/course-details/course-details.module.scss";
import stylesContainer from "@/sass/components/common/container.module.scss";
import UpcomingCouresCard from "@/components/ui/UpcomingCouresCard";
import { upcomingCourses } from "@/data/upcomingcourse";
import Tabs from "@/components/common/Tabs";
import { useState } from "react";
import Image from "next/image";
import CustomDatePicker from "@/components/common/DateInput";
import Link from "next/link";

const tabs = [
    {
        id: 1,
        title: "Course Details",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
    },
    {
        id: 2,
        title: "What You'll Learn",
        content: "By the end of this course, you will be able to: \n- Understand the Rijndael algorithm which AES is based on.\n- Perform manual AES encryption and decryption steps.\n- Implement AES-128, AES-192, and AES-256.\n- Identify secure vs insecure uses of AES in real-world software."
    },
    {
        id: 3,
        title: "Introduction",
        content: "Welcome to the Advanced Encryption Standard (AES) masterclass. AES is the most widely used symmetric encryption algorithm today, trusted by governments and corporations worldwide. This course is designed for security professionals and developers who want to master the gold standard of data protection."
    }
]

const CourseDetails = () => {
    const [activeTabId, setActiveTabId] = useState(1);
    const [date, setDate] = useState();

    const activeTab = tabs.find(tab => tab.id === activeTabId) || tabs[0];

    return (
        <section>
            <Header />
            <div className={stylesContainer.container}>
                <div className={styles.mainContent}>
                    <div className={styles.mainTitle}>
                        <h1>All Details For Course <span> AES</span></h1>
                        <button className={styles.filterBtn}>
                            <Filter size={20} />
                        </button>
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

                        <div className={styles.details}>
                            <div className={styles.contentCourse}>
                                <div className={styles.info}>
                                    <div className={styles.summaryContent}>
                                        <div className={styles.left}>
                                            <div className={styles.top}>
                                                <div className={styles.title}>
                                                    <h2>Advanced Diploma in Health Informatics</h2>
                                                    <p>This comprehensive program equips students with the knowledge and skills to manage and analyze health data effectively.</p>
                                                </div>

                                                <div className={styles.iconShare}>
                                                    <span>Share:</span>
                                                    <div className={styles.icons}>
                                                        <span><Mail /></span>
                                                        <span><MessageCircle /></span>
                                                        <span>
                                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <mask id="mask0_560_9573" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">
                                                                    <path d="M0 0H18V18H0V0Z" fill="white" />
                                                                </mask>
                                                                <g mask="url(#mask0_560_9573)">
                                                                    <path d="M14.175 0.843414H16.9354L10.9054 7.75284L18 17.1566H12.4457L8.09229 11.4544L3.11657 17.1566H0.353571L6.80271 9.7637L0 0.8447H5.69571L9.62486 6.0557L14.175 0.843414ZM13.2043 15.5006H14.7343L4.86 2.41327H3.21943L13.2043 15.5006Z" fill="#4A5565" />
                                                                </g>
                                                            </svg>
                                                        </span>
                                                        <span><Copy /></span>
                                                        <span><Printer /></span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={styles.img}>
                                                <Image
                                                    src="/asstes/details.jpg"
                                                    alt="course-details"
                                                    width={0}
                                                    height={0}
                                                    sizes="100vw"
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.right}>
                                            <div className={styles.priceTag}>
                                                <span>$555</span>
                                                <p>One-time payment</p>
                                            </div>

                                            <div className={styles.dateInfo}>
                                                <h4> <Calendar color="#1E2749" size={20} /> Select Course Date</h4>
                                                <div className={styles.dates}>
                                                    <div className={styles.date}>
                                                        <p>March 15,2026</p>
                                                        <span>10.00 am</span>
                                                    </div>
                                                    <div className={styles.date}>
                                                        <p>March 15,2026</p>
                                                        <span>10.00 am</span>
                                                    </div>
                                                    <div className={styles.date}>
                                                        <p>March 15,2026</p>
                                                        <span>10.00 am</span>
                                                    </div>
                                                    <div className={styles.selectDate}>
                                                        <h4> <Calendar color="#B12E33" size={20} /> Select Course Date</h4>
                                                        <CustomDatePicker
                                                            selected={date}
                                                            onChange={(date) => setDate(date)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={styles.register}>
                                                <Link href="/en/register" className={styles.primaryBtn}>
                                                    Enroll Now
                                                </Link>
                                                <Link href="/en/register">
                                                    Request an Internal Course
                                                </Link>
                                                <Link href="/en/register">
                                                    Quick Inquiry
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.summaryIcons}>
                                        <div className={styles.item}>
                                            <div className={`${styles.icon} ${styles.yellow}`}>
                                                <Star size={24} color="#D08700" />
                                            </div>
                                            <div className={styles.content}>
                                                <h4>4.9</h4>
                                                <p>1278 Reviews</p>
                                            </div>
                                        </div>

                                        <div className={styles.item}>
                                            <div className={`${styles.icon} ${styles.blue}`}>
                                                <Users size={24} color="#2F327D" />
                                            </div>
                                            <div className={styles.content}>
                                                <h4>1278</h4>
                                                <p>Students</p>
                                            </div>
                                        </div>

                                        <div className={styles.item}>
                                            <div className={`${styles.icon} ${styles.green}`}>
                                                <Clock size={24} color="#9810FA" />
                                            </div>
                                            <div className={styles.content}>
                                                <h4>4.9</h4>
                                                <p>1278 Reviews</p>
                                            </div>
                                        </div>

                                        <div className={styles.item}>
                                            <div className={`${styles.icon} ${styles.pink}`}>
                                                <Award size={24} color="#C41E3A" />
                                            </div>
                                            <div className={styles.content}>
                                                <h4>4.9</h4>
                                                <p>1278 Reviews</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.tabContainer}>
                                        <Tabs
                                            activeTabId={activeTabId}
                                            onTabChange={setActiveTabId}
                                            tabs={tabs}
                                            className={styles.courseTabs}
                                            tabClassName={styles.courseTabItem}
                                            activeTabClassName={styles.active}
                                        />

                                        <div className={styles.tabContent}>
                                            <h3>{activeTab.title}</h3>
                                            <p style={{ whiteSpace: 'pre-line' }}>{activeTab.content}</p>
                                        </div>
                                    </div>

                                    <div className={styles.similarCourses}>
                                        <div className={styles.top}>
                                            <h2>Similar Courses</h2>
                                            <span> see all <ArrowRight size={19} /></span>
                                        </div>
                                        <div className={styles.courses}>
                                            {
                                                upcomingCourses.slice(0, 3).map((course) => {
                                                    return (
                                                        <UpcomingCouresCard key={course.id} course={course} />
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.videos}>
                                    <div className={styles.top}>
                                        <span><Play /></span>
                                        <div className={styles.info}>
                                            <h2>Course Video</h2>
                                            <p>Preview what you'll learn in this comprehensive training</p>
                                        </div>
                                    </div>
                                    <video src=""></video>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CourseDetails
