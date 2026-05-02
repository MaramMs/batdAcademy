'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, MapPin, Star } from "lucide-react";
import DatePopUp from "./DatePopUp";
import styles from "@/sass/components/ui/Upcoming-Coures-Card.module.scss";
const UpcomingCouresCard = ({ course, onModalOpen, onModalClose, slideIndex, swiperRef }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => {
        if (swiperRef?.current) {
            swiperRef.current.slideTo(slideIndex);
        }
        setIsOpen(true);
        onModalOpen?.();
    };

    const handleClose = () => {
        setIsOpen(false);
        onModalClose?.();
    };

    const handleSelect = (session) => {
        console.log('Selected session:', session);
    };
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={course.image}
                    alt={course.title}
                    width={361}
                    height={208}
                    style={{ objectFit: "cover" }}
                />

                <div className={styles.overlay} />
                <div className={styles.imageLabels}>
                    <span className={styles.location}>
                        <MapPin size={12} /> {course.location}
                    </span>
                    {
                        course.rating && (
                            <span className={styles.rating}>
                                <Star size={12} /> {course.rating}
                            </span>
                        )
                    }
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.top}>
                    <span className={styles.type}>{course.category?.name}</span>
                    <span className={styles.price}>{course.price}</span>
                </div>
                <p className={styles.description}>
                    {course.description}
                </p>
                <div className={styles.meta}>
                    <div className={styles.date}>
                        <Calendar color="#1E2749" size={14} />
                        <span>
                            {course.date}
                        </span>
                    </div>
                    <div className={styles.time}>
                        <Clock color="#1E2749" size={14} />
                        <span className={styles.time}>
                            {course?.week_number} weeks
                        </span>
                    </div>

                </div>
                <div className={styles.more}>
                    <Calendar />

                    <span
                        className={styles.moreDates}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleOpen();
                        }}
                    >
                        +2 more dates available
                    </span>
                    <DatePopUp
                        isOpen={isOpen}
                        onClose={handleClose}
                        onSelect={handleSelect}
                        courseName={course.title}
                    />
                </div>
                <div className={styles.btns}>
                    <Link href="/en/registerCourse" className={styles.btnRegister}>Register </Link>
                    <Link href="/en/course_details/1/dsd" className={styles.btnDetails}> Details</Link>
                </div>
            </div>
        </div>
    );
};

export default UpcomingCouresCard;


