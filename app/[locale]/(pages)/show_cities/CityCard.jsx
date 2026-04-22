"use client";
import styles from "@/sass/pages/showCities/city-card.module.scss";
import { ChevronRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CityCard = ({ city }) => {
    return (
        <div className={styles.card}>
           <div className={styles.imageContainer}>
             <Image src={city.image} alt={city.title} width={302} height={224} />
             <div className={styles.location}>
              <span>  <MapPin />United Kingdom</span>
              <h5   >{city.title}</h5>
             </div>
           </div>
          <div className={styles.content}>
              <div className={styles.top}>
                <div className={styles.item}>
                    <h3>123</h3>
                    <span>Courses Available</span>
                </div>

                <div className={styles.item}>
                    <h3>452k+</h3>
                    <span>Students Trained</span>
                </div>

              </div>
            <Link href="#" className={styles.link}>
                 Explore Courses <ChevronRight />
            </Link>
          </div>
        </div>
    );
};

export default CityCard;