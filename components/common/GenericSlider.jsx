'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import styles from '@/sass/components/common/generic-slider.module.scss'
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export default function GenericSlider({
    items = [],
    renderSlide,
    slidesPerView = 4,
    spaceBetween = 24,
    showViewAll = false,
    viewAllLink = "/courses",
    breakpoints,
    navId
}) {
    const prevSel = `[data-prev="${navId}"]`;
    const nextSel = `[data-next="${navId}"]`;


    const defaultBreakpoints = {
        320: { slidesPerView: 1.5 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: slidesPerView },
    };

    return (
        <div className={styles.genericSlider}>

            <button data-prev={navId} className={styles.sliderPrev}>
                <svg width="28" height="28" viewBox="0 0 9 15" fill="none">
                    <path d="M8 1L1 7.5L8 14" stroke="currentColor" strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <Swiper
                modules={[Navigation]}
               navigation={{
                    prevEl: prevSel,
                    nextEl: nextSel,
                }}
            
                spaceBetween={spaceBetween}
                slidesPerView={slidesPerView}
                breakpoints={breakpoints ?? defaultBreakpoints}
            >
                {items.map((item, index) => (
                    <SwiperSlide key={item.id ?? index}>
                        {renderSlide(item)}
                    </SwiperSlide>
                ))}
            </Swiper>

            <button data-next={navId} className={styles.sliderNext}>
                <svg width="28" height="28" viewBox="0 0 9 15" fill="none">
                    <path d="M1 1L8 7.5L1 14" stroke="currentColor" strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {showViewAll && (
                <div className={styles.viewAll}>
                    <Link href={viewAllLink}>
                        View All Courses <ArrowRight color='#1E2749' size={14} />
                    </Link>
                </div>
            )}
        </div>
    );
}