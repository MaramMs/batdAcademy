"use client";

import styles from "@/sass/pages/course-details-by-city/header.module.scss";
import { Aperture, ChevronDown } from "lucide-react";
import DropdownMenuCustom from "@/components/common/DropdownMenu";
import { useState } from "react";
import SearchCourse from "../../../search_course/Search";

const Header = () => {
    const [specialization, setSpecialization] = useState("");
    const [city, setCity] = useState("");

    return (
        <div className={styles.header}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <span><Aperture color="#B12E33" size={22} />EXPLORE OUR GLOBAL LOCATIONS</span>
                    <h1>Find Your Perfect <br /> Training Destination</h1>
                    <p>World-class training programs across 12 cities worldwide</p>
                </div>
                <div className={styles.searchCourse}>
                    <SearchCourse className={styles.filter} />
                    <div className={styles.locationSelect}>
                        <DropdownMenuCustom
                            label="All Specializations"
                            options={["Specialization 1", "Specialization 2"]}
                            value={specialization}
                            onChange={(val) => setSpecialization(val)}
                            multi={false}
                            icon={<ChevronDown size={14} />}
                            triggerClassName={styles.dropdownTrigger}
                        />
                        <DropdownMenuCustom
                            label="All Cities"
                            options={["City 1", "City 2"]}
                            value={city}
                            onChange={(val) => setCity(val)}
                            multi={false}
                            icon={<ChevronDown size={14} />}
                            triggerClassName={styles.dropdownTrigger}
                        />
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Header;