"use client";

import DropdownMenuCustom from "@/components/common/DropdownMenu";
import styles from "@/sass/pages/consulting/header.module.scss";
import { Aperture, ChevronDown } from "lucide-react";
import { useState } from "react";
import SearchCourse from "../search_course/Search";

const Header = () => {
    const [specialization, setSpecialization] = useState("");
    const [city, setCity] = useState("");

    return (
        <div className={styles.header}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <span><Aperture color="#B12E33" size={22} />Expert Consultants Worldwide</span>
                    <h1>Find Your Perfect <br />
                        Consultation Service</h1>
                    <p>Professional consulting services across multiple domains worldwide</p>
                </div>
                <div className={styles.searchCourse}>
                    <SearchCourse className={styles.filter} />
                    {/* <div className={styles.locationSelect}>
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
                    </div> */}
                </div>

            </div>
            <div className={styles.statistics}>
                <div className={styles.item}>
                    <h5>42+</h5>
                    <span>Countries</span>
                </div>
                <div className={styles.item}>
                    <h5>38+</h5>
                    <span>Cities</span>
                </div>

                <div className={styles.item}>
                    <h5>450+</h5>
                    <span>Courses</span>
                </div>
            </div>
        </div>
    );
};

export default Header;