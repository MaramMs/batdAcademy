'use client'
import { useEffect, useRef, useState } from "react";
import Title from "@/components/common/Title";
import UpcomingCouresCard from "@/components/ui/UpcomingCouresCard";
import GenericSlider from "@/components/common/GenericSlider";
import styles from "@/sass/components/common/container.module.scss";
import useCoursesStore from "@/store/useCoursesStore";
import Skeleton from "@/components/ui/Skeleton";

const UpcomingCourses = () => {
    const swiperRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {handleGetCourses,data,isLoading} = useCoursesStore();


    useEffect(() => {
        handleGetCourses();
    }, []);
    return (
        <div>
            <div className={styles.container}>
                <Title title='Upcoming ' span='Courses' subtitle='Immersive learning experiences designed to transform your career' />
             {
                isLoading ? (
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                      <Skeleton type="card" className={styles.skeletonCard} />
                      <Skeleton type="card" className={styles.skeletonCard} />
                      <Skeleton type="card" className={styles.skeletonCard} />
                      <Skeleton type="card" className={styles.skeletonCard} />
                    </div>
                ) : (
                    <GenericSlider
                        navId="courses"
                        swiperRef={swiperRef}
                        pauseAutoplay={isModalOpen}
                        items={data?.courses}
                        renderSlide={(course, index) => (
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ maxWidth: '400px', width: '100%' }}>
                                
                                        <UpcomingCouresCard course={course}
                                            slideIndex={index}
                                            swiperRef={swiperRef}
                                            onModalOpen={() => setIsModalOpen(true)}
                                            onModalClose={() => setIsModalOpen(false)} isLoading={isLoading}/>
                                 
                                </div>
                            </div>
                        )}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                            1200: {
                                slidesPerView: 4,
                            }
                        }}
                        autoplay={false}
                        pauseOnMouseEnter={true}
                        spaceBetween={5}
                        showViewAll={true}
                        viewAllLink="/courses"
                    />
                )
             }

            </div>
        </div>
    );
};

export default UpcomingCourses;