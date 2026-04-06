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
                    slidesPerView={4}
                    spaceBetween={25}
                    showViewAll={true}
                    viewAllLink="/courses"
                />

            </div>
        </div>
    );
};

export default UpcomingCourses;