'use client'
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, Calendar, ChevronRight, Clock, Copy, Filter, Mail, MessageCircle, Play, Printer, Star, Users, X } from "lucide-react";
import CustomDatePicker from "@/components/common/DateInput";
import Tabs from "@/components/common/Tabs";
import Skeleton from "@/components/ui/Skeleton";
import UpcomingCouresCard from "@/components/ui/UpcomingCouresCard";
import useCategoriesStore from "@/store/useCategoriesStore";
import useCoursesStore from "@/store/useCoursesStore";
import useLanguageStore from "@/store/useLanguageStore";
import Header from "./Header";
import stylesContainer from "@/sass/components/common/container.module.scss";
import styles from "@/sass/pages/course-details/course-details.module.scss";
import SidebarFilter from "@/components/common/SidebarFilter";


const CourseDetails = () => {
     const [activeTabId, setActiveTabId] = useState(1);
     const [date, setDate] = useState();
     const [mounted, setMounted] = useState(false);
     const { handleGetCourseBySlug, handleGetCourses, course, isLoading, data } = useCoursesStore();
     console.log(course, "coursecoursecoursecoursecourse");
     console.log(data, "coursecoursecoursecoursecourse data");
     const { categories, handleGetCategories } = useCategoriesStore();
     const searchParams = useSearchParams();
     const pathname = usePathname();
     const router = useRouter();
     const { locale } = useLanguageStore();
     const { slug, id } = useParams();

     // Build registration URL with selected date
     const registerUrl = useMemo(() => {
         const params = new URLSearchParams();
         params.set('course_id', id);
         if (date) {
             const formattedDate = date instanceof Date
                 ? date.toISOString().split('T')[0]
                 : date;
             params.set('date', formattedDate);
         }
         return `/${locale}/registerCourse?${params.toString()}`;
     }, [locale, id, date]);

     const updateFilter = (key, value) => {
          console.log(key, value, 'value');
          const params = new URLSearchParams(searchParams.toString());

          if (value) {
               params.set(key, value);
          } else {
               params.delete(key);
          }

          params.delete('cursor');

          router.push(`${pathname}?${params.toString()}`, { scroll: false });
     };

     useEffect(() => {
          setMounted(true);
          handleGetCourseBySlug(slug)
          handleGetCategories();

          const params = new URLSearchParams(searchParams.toString());
          if (params.has('type')) {
              params.set('taxonomy', params.get('type'));
              params.delete('type');
          }
          const queryString = params.toString() ? `?${params.toString()}` : "";
          handleGetCourses(queryString);
     }, [slug, searchParams]);


     const courseTabs = course?.tabs;
     const activeTab = courseTabs?.find(tab => tab.id === activeTabId) || courseTabs?.[0];

     return (
          <section>
               <Header />
               <div className={stylesContainer.container}>
                    <div className={styles.mainContent}>
                         <div className={styles.mainTitle}>
                              <h1>All Details For Course <span> {course?.name}</span></h1>   <Dialog.Root modal={true}>
                                   <Dialog.Trigger asChild>
                                        <button className={styles.filterBtn}>
                                             <Filter size={20} />
                                        </button>
                                   </Dialog.Trigger>

                                   {mounted && (
                                        <Dialog.Portal>
                                             <Dialog.Overlay className={styles.drawerOverlay} />
                                             <Dialog.Content className={styles.drawerContent}>
                                                  <div className={styles.drawerHeader}>
                                                       <Dialog.Title className={styles.drawerTitle}>Filters</Dialog.Title>
                                                       <Dialog.Close className={styles.drawerClose}>
                                                            <X size={20} />
                                                       </Dialog.Close>
                                                  </div>
                                                 <SidebarFilter  data={data} updateFilter={updateFilter} />


                                             </Dialog.Content>
                                        </Dialog.Portal>
                                   )}
                              </Dialog.Root>


                         </div>

                         {
                              isLoading ? (
                                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem' }}>
                                        <Skeleton type='card' height='100vh' />
                                        <Skeleton type='card' height='100vh' />
                                   </div>

                              ) : (
                                   <div className={styles.content}>
                                    <SidebarFilter  data={data} updateFilter={updateFilter} />

                                        <div className={styles.details}>
                                             <div className={styles.contentCourse}>
                                                  <div className={styles.info}>
                                                       <div className={styles.summaryContent}>
                                                            <div className={styles.left}>
                                                                 <div className={styles.top}>
                                                                      <div className={styles.title}>
                                                                           <h2>{course?.name}</h2>
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
                                                                      <div dangerouslySetInnerHTML={{ __html: course?.details }} />


                                                                 </div>

                                                                 <div className={styles.img}>
                                                                      {
                                                                           course?.image ? (
                                                                                <Image
                                                                                     src={course?.image}
                                                                                     alt="course-details"
                                                                                     width={0}
                                                                                     height={0}
                                                                                     sizes="100vw"
                                                                                />
                                                                           ) : (
                                                                                <Image
                                                                                     src={'/asstes/details.jpg'}
                                                                                     alt="course-details"
                                                                                     width={0}
                                                                                     height={0}
                                                                                     sizes="100vw"
                                                                                />
                                                                           )
                                                                      }
                                                                 </div>
                                                            </div>

                                                            <div className={styles.right}>
                                                                 <div className={styles.priceHeaderMobile}>
                                                                      <div className={styles.priceTag}>
                                                                           <span>{course?.price}</span>
                                                                           <p>One-time payment</p>
                                                                      </div>
                                                                      <Link href={registerUrl} className={styles.enrollBtnMobile}>
                                                                           Enroll Now
                                                                      </Link>
                                                                 </div>

                                                                 <div className={styles.mobileStatsRow}>
                                                                      <div className={styles.mobileStatItem}>
                                                                           <div className={styles.statIcon}><Star size={16} fill="#FACC15" color="#FACC15" /></div>
                                                                           <div className={styles.statInfo}>
                                                                                <span className={styles.statValue}>4.5</span>
                                                                                <span className={styles.statLabel}>Rating</span>
                                                                           </div>
                                                                      </div>
                                                                      <div className={styles.mobileStatItem}>
                                                                           <div className={styles.statIcon}><Users size={16} color="#2F327D" /></div>
                                                                           <div className={styles.statInfo}>
                                                                                <span className={styles.statValue}>8,643</span>
                                                                                <span className={styles.statLabel}>Students</span>
                                                                           </div>
                                                                      </div>
                                                                      <div className={styles.mobileStatItem}>
                                                                           <div className={styles.statIcon}><Clock size={16} color="#B12E33" /></div>
                                                                           <div className={styles.statInfo}>
                                                                                <span className={styles.statValue}>8 weeks</span>
                                                                                <span className={styles.statLabel}>Duration</span>
                                                                           </div>
                                                                      </div>
                                                                 </div>

                                                                 <div className={styles.dateInfo}>
                                                                      <h3 >{course?.price}</h3>
                                                                      <div className={styles.infoContainer}>
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
                                                                 </div>

                                                                 <div className={styles.register}>
                                                                      <Link href={registerUrl} className={styles.primaryBtn}>
                                                                           Register Now
                                                                      </Link>
                                                                      <Link href={`/${locale}/registerInternalCourse?course_id=${id}`}>
                                                                           Request an Internal Course
                                                                      </Link>
                                                                      <Link href={`/${locale}/contact_us?course_id=${id}`}>
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
                                                                      <h4>+600k</h4>
                                                                      <p>Reviews</p>
                                                                 </div>
                                                            </div>


                                                            <div className={styles.item}>
                                                                 <div className={`${styles.icon} ${styles.blue}`}>
                                                                      <Users size={24} color="#2F327D" />
                                                                 </div>
                                                                 <div className={styles.content}>
                                                                      <h4>+800k</h4>
                                                                      <p>Students</p>
                                                                 </div>
                                                            </div>

                                                            <div className={styles.item}>
                                                                 <div className={`${styles.icon} ${styles.green}`}>
                                                                      <Clock size={24} color="#9810FA" />
                                                                 </div>
                                                                 <div className={styles.content}>
                                                                      <h4>1-2 weeks</h4>
                                                                      <p>Duration</p>
                                                                 </div>
                                                            </div>
                                                                 </div>

                                                       <div className={styles.tabContainer}>
                                                           

                                                            <Tabs
                                                                 tabs={course?.tabs}
                                                                 activeTabId={activeTabId}
                                                                 onTabChange={setActiveTabId}
                                                                 className={styles.courseTabs}
                                                                 tabClassName={styles.courseTabItem}
                                                                 activeTabClassName={styles.active}
                                                            />
                                                            <div className={styles.tabContent}>
                                                                 <h3>{activeTab?.title}</h3>
                                                                 <div dangerouslySetInnerHTML={{ __html: activeTab?.content }} />
                                                            </div>
                                                       </div>

                                                       <div className={styles.similarCourses}>
                                                            <div className={styles.top}>
                                                                 <h2>Similar Courses</h2>
                                                                 <Link href={`/${locale}/search_course`} className={styles.seeAll}>
                                                                      see all <ArrowRight size={19} />
                                                                 </Link>
                                                            </div>
                                                            <div className={styles.courses}>
                                                                 {
                                                                      course?.similar_courses?.slice(0, 3).map((course) => {
                                                                           return (
                                                                                <UpcomingCouresCard key={course.id} course={course} />
                                                                           )
                                                                      })
                                                                 }
                                                            </div>
                                                       </div>
                                                  </div>

                                                  {
                                                       course?.video && (
                                                            <div className={styles.videos}>
                                                                 <div className={styles.top}>
                                                                      <span><Play /></span>
                                                                      <div className={styles.info}>
                                                                           <h2>Course Video</h2>
                                                                           <p>Preview what you'll learn in this comprehensive training</p>
                                                                      </div>
                                                                 </div>
                                                                 <video src={course?.video}></video>
                                                            </div>
                                                       )
                                                  }
                                             </div>
                                        </div>
                                   </div>

                              )
                         }


                    </div>
               </div>
          </section>
     )
}

export default CourseDetails
