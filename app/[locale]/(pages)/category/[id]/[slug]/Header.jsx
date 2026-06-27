"use client";

import styles from "@/sass/pages/course-details-by-city/header.module.scss";
import { Aperture, ChevronDown } from "lucide-react";
import DropdownMenuCustom from "@/components/common/DropdownMenu";
import { useState } from "react";
import SearchCourse from "../../../search_course/Search";
import { useTranslations } from "next-intl";

const Header = () => {
    const t = useTranslations('CourseTraning');
    const [specialization, setSpecialization] = useState("");
    const [city, setCity] = useState("");

    return (
        <div className={styles.header}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <span><Aperture color="#B12E33" size={22} />{t('explore')}</span>
                    <h1>{t('title')} <br /> {t('titleLine2')}</h1>
                    <p>{t('subtitle')}</p>
                </div>
                <div className={styles.searchCourse}>
                    <SearchCourse className={styles.filter} />
                    <div className={styles.locationSelect}>
                        <DropdownMenuCustom
                            label={t('allSpecializations')}
                            options={["Specialization 1", "Specialization 2"]}
                            value={specialization}
                            onChange={(val) => setSpecialization(val)}
                            multi={false}
                            icon={<ChevronDown size={14} />}
                            triggerClassName={styles.dropdownTrigger}
                        />
                        <DropdownMenuCustom
                            label={t('allCities')}
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
