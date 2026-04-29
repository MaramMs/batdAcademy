"use client";
import styles from "@/sass/pages/consulting/consulting-category/header.module.scss";
import { Aperture } from "lucide-react";
import SearchCourse from "../../search_course/Search";
const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <span><Aperture color="#B12E33" size={22} />Expert Consultants Worldwide</span>
                    <h1>Business Strategy <br />
                        Consultations</h1>
                    <p>Expert guidance for strategic planning and business development</p>
                </div>
                <div className={styles.searchCourse}>
                    <SearchCourse className={styles.filter} />
                </div>

            </div>
       
        </div>
    );
};

export default Header;