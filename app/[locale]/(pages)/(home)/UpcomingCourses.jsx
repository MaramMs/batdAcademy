'use client'
import { useRef, useState } from "react";
import Title from "@/components/common/Title";
import UpcomingCouresCard from "@/components/ui/UpcomingCouresCard";
import { upcomingCourses } from "@/data/upcomingcourse";
import GenericSlider from "@/components/common/GenericSlider";
import styles from "@/sass/components/common/container.module.scss";

const UpcomingCourses = () => {
    const swiperRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div>
            <div className={styles.container}>
                <Title title='Upcoming ' span='Courses' subtitle='Immersive learning experiences designed to transform your career' />
                <GenericSlider
                    navId="courses"
                    swiperRef={swiperRef}
                    pauseAutoplay={isModalOpen}
                    items={upcomingCourses}
                    centeredSlides={true}
                    renderSlide={(course, index) => (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ maxWidth: '400px', width: '100%' }}>
                                <UpcomingCouresCard course={course}
                                    slideIndex={index}
                                    swiperRef={swiperRef}
                                    onModalOpen={() => setIsModalOpen(true)}
                                    onModalClose={() => setIsModalOpen(false)} />
                            </div>
                        </div>
                    )}
                    slidesPerView={1}
                    autoplay={false}
                    pauseOnMouseEnter={true}
                    spaceBetween={5}
                    showViewAll={true}
                    viewAllLink="/courses"
                />

            </div>
        </div>
    );
};

export default UpcomingCourses;