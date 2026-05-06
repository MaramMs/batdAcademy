"use client";

import DropdownMenuCustom from "@/components/common/DropdownMenu";
import styles from "@/sass/pages/showCities/header.module.scss";
import { Aperture, ChevronDown } from "lucide-react";
import { useState } from "react";
import SearchCourse from "../search_course/Search";
import useCitiesStore from "@/store/useCitiesStore";

const formatStat = (n) => {
    if (!n) return "0";
    if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
    return String(n);
};

const Header = ({ updateFilter }) => {
    const [specialization, setSpecialization] = useState("");
    const [city, setCity] = useState("");
    const { stats, specializations, cities } = useCitiesStore();

    const specializationOptions = specializations.map((s) => ({ label: s.name, value: s.slug }));
    const cityOptions = cities.map((c) => ({ label: c.name, value: c.slug }));

    const handleSpecializationChange = (val) => {
        setSpecialization(val);
        updateFilter?.("specialization", val);
    };

    const handleCityChange = (val) => {
        setCity(val);
        updateFilter?.("city", val);
    };

    return (
        <div className={styles.header}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <span><Aperture color="#B12E33" size={22} />EXPLORE OUR GLOBAL LOCATIONS</span>
                    <h1>Find Your Perfect <br /> Training Destination</h1>
                    <p>World-class training programs across {stats?.cities || "..."} cities worldwide</p>
                </div>
                <div className={styles.searchCourse}>
                    <SearchCourse className={styles.filter} updateFilter={(key, val) => updateFilter?.(key, val)} />
                    <div className={styles.locationSelect}>
                        <DropdownMenuCustom
                            label="All Specializations"
                            options={specializationOptions}
                            value={specialization}
                            onChange={handleSpecializationChange}
                            multi={false}
                            icon={<ChevronDown size={14} />}
                            triggerClassName={styles.dropdownTrigger}
                        />
                        <DropdownMenuCustom
                            label="All Cities"
                            options={cityOptions}
                            value={city}
                            onChange={handleCityChange}
                            multi={false}
                            icon={<ChevronDown size={14} />}
                            triggerClassName={styles.dropdownTrigger}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.statistics}>
                <div className={styles.item}>
                    <h5>{stats?.cities ? `${stats.cities}+` : "..."}</h5>
                    <span>Global Cities</span>
                </div>
                <div className={styles.item}>
                    <h5>{stats?.training_programs ? `${formatStat(stats.training_programs)}+` : "..."}</h5>
                    <span>Training Programs</span>
                </div>
                <div className={styles.item}>
                    <h5>{stats?.total_students !== undefined ? `${formatStat(stats.total_students)}+` : "..."}</h5>
                    <span>Happy Students</span>
                </div>
            </div>
        </div>
    );
};

export default Header;
