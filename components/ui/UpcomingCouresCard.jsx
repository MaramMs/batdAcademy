'use client';
import { useState } from "react";
import { motion } from "framer-motion";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, MapPin, Star } from "lucide-react";
import DatePopUp from "./DatePopUp";
import styles from "@/sass/components/ui/Upcoming-Coures-Card.module.scss";
import useLanguageStore from "@/store/useLanguageStore";
const UpcomingCouresCard = ({ course, onModalOpen, onModalClose, slideIndex, swiperRef}) => {

    const [isOpen, setIsOpen] = useState(false);
    const locale = useLanguageStore((state) => state.locale);
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
    const placeholderImages = [
    "https://batdacademy.com/uploads/placeholder_image.webp",
    "/asstes/default-1.jpeg",
    "/asstes/course1.jpg",
];
      const randomImageIndex = course?.id ? course?.id % 3 : Math.floor(Math.random() * 3);
    const randomImage = placeholderImages[randomImageIndex];
    console.log(course,'course');
    return (
      
        <motion.div 
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        >
            <div className={styles.imageWrapper}>
                <Image
                    src={randomImage}
                    alt={course?.title || 'Course Image'}
                    width={361}
                    height={208}
                    style={{ objectFit: "cover" }}
                />

                <div className={styles.overlay} />
                <div className={styles.imageLabels}>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.top}>
                    {
                        course.category && (
                            <span className={styles.type}>{course.category?.name.slice(0, 15)}</span>
                        )
                    }
                    {
                        course.price && (
                            <span className={styles.price}>{course.price}</span>
                        )
                    }
                </div>
                <p className={styles.description}>
                    {course.name}
                </p>
                <div className={styles.meta}>
                    <div className={styles.time}>
                        <Clock color="#1E2749" size={14} />
                        <span className={styles.time}>
                            1-2 weeks
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
                    <Link href={`/${locale}/course_details/${course?.id}/${course?.slug}`} className={styles.btnDetails}> Details</Link>
                </div>
            </div>
        </motion.div>
           
    );
};

export default UpcomingCouresCard;


