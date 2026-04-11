'use client'
import styles from "@/sass/components/common/container.module.scss";
import Title from "@/components/common/Title";
import UpcomingCouresCard from "@/components/ui/UpcomingCouresCard";
import { upcomingCourses } from "@/data/upcomingcourse";
import GenericSlider from "@/components/common/GenericSlider";

const UpcomingCourses = () => {
    return (
        <div>
            <div className={styles.container}>
                <Title title='Upcoming ' span='Courses' subtitle='Immersive learning experiences designed to transform your career' />
                <GenericSlider
                    navId="courses"
                    items={upcomingCourses}
                    renderSlide={(course) => <UpcomingCouresCard course={course} />}
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
                            slidesPerView: 4,
                        },
                    }}  
                    // autoplay={{
                    //     delay: 2500,
                    //     disableOnInteraction: false,
                    // }}
                    spaceBetween={25}
                    showViewAll={true}
                    viewAllLink="/courses"
                />

            </div>
        </div>
    );
};

export default UpcomingCourses;