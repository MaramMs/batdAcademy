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
                    renderSlide={(course, index) => <UpcomingCouresCard course={course}
                        slideIndex={index}
                        swiperRef={swiperRef}
                        onModalOpen={() => setIsModalOpen(true)}
                        onModalClose={() => setIsModalOpen(false)} />}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                        },
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
                            slidesPerView: 3,
                        },
                        1400: {
                            slidesPerView: 3,
                        },
                        1600: {
                            slidesPerView: 4,
                        },
                    }}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    spaceBetween={25}
                    showViewAll={true}
                    viewAllLink="/courses"
                />

            </div>
        </div>
    );
};

export default UpcomingCourses;