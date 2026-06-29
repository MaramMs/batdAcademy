"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, MapPin, Star } from "lucide-react";
import DatePopUp from "./DatePopUp";
import styles from "@/sass/components/ui/Upcoming-Coures-Card.module.scss";
import useLanguageStore from "@/store/useLanguageStore";
import img1 from "/public/asstes/default-1.jpeg";
import img2 from "/public/asstes/course1.jpg";
import img3 from "/public/asstes/default-2.webp";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const placeholderImages = [
  "https://batdacademy.com/uploads/placeholder_image.webp",
  img2,
  img1,
  img3,
];
const UpcomingCouresCard = ({
  course,
  onModalOpen,
  onModalClose,
  slideIndex,
  swiperRef,
  cityId,
  filterLanguage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const locale = useLanguageStore((state) => state.locale);
  const router = useRouter()
  const t =useTranslations();
  const handleOpen = () => {
    if (swiperRef?.current) {
      swiperRef.current.slideTo(slideIndex);
    }
    setIsOpen(true);
    onModalOpen?.();
  };

  const handleClose = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 1500);
    onModalClose?.();
  };
console.log(selectedDate , 'select')
  const handleSelect = (session) => {
    setSelectedDate(session.date);
    const params = new URLSearchParams();
    if (course?.id) params.set("course_id", course.id);
    if (session?.date) params.set("date", session.date);
  
    router.push(`/${locale}/registerCourse?${params.toString()}`);
  };

  // Build registration URL with all available query params
  const registerUrl = useMemo(() => {
  
    const params = new URLSearchParams();
    if (course?.id) params.set("course_id", course.id);
    if (selectedDate) params.set("date", selectedDate);
    if (cityId) params.set("city_id", cityId);
    const lang = course?.language || filterLanguage;
    if (lang) params.set("language", lang);
    return `/${locale}/registerCourse?${params.toString()}`;
  }, [
    locale,
    course?.id,
    selectedDate,
    cityId,
    course?.language,
    filterLanguage,
  ]);

  const randomImageIndex = course?.id
    ? course?.id % 3
    : Math.floor(Math.random() * 3);
  const randomImage = placeholderImages[randomImageIndex];
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -10,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={course?.image  || randomImage}
          alt={course?.name || course?.title || 'Course thumbnail'}
          width={361}
          height={208}
          style={{ objectFit: "cover" }}
        />

        <div className={styles.overlay} />
        <div className={styles.imageLabels}></div>
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          {course.category && (
            <span className={styles.type}>
              {course.category?.name.slice(0, 15)}
            </span>
          )}
          {course.price && <span className={styles.price}>£{course.price}</span>}
        </div>
        <p className={styles.description}>{course.name}</p>
        <div className={styles.meta}>
          <div className={styles.date}>
            <Calendar color="#1E2749" size={14} />
            <span className={styles.ceartedAt}>
              {course?.created_at?.split("T")[0]}
            </span>
          </div>

          <div className={styles.time}>
            <Clock color="#1E2749" size={14} />
            <span className={styles.time}>1-2 {t('weeks')}</span>
          </div>
        </div>
        <div className={styles.more}>
          <Calendar aria-hidden="true"/>

          <button
            type="button"
            className={styles.moreDates}
            onClick={(e) => {
              e.stopPropagation();
              handleOpen();
            }}
            aria-label={`View more dates for ${course?.name}`}
          >
            +2  {t('dateAvailable')}
          </button>
          <DatePopUp
            isOpen={isOpen}
            onClose={handleClose}
            onSelect={handleSelect}
            courseName={course.title}
            dates={course?.dates}
            id={course?.id}
          />
        </div>
        <div className={styles.btns}>
          <Link href={registerUrl} className={styles.btnRegister}>
            {t('register')}
            <span className="sr-only"> for {course?.name}</span>
          </Link>
          <Link
            href={`/${locale}/course_details/${course?.id}/${course?.slug}`}
            className={styles.btnDetails}
          >
            {t('details')}
            <span className="sr-only"> of {course?.name}</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default UpcomingCouresCard;
