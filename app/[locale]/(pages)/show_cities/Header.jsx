"use client";

import DropdownMenuCustom from "@/components/common/DropdownMenu";
import styles from "@/sass/pages/showCities/header.module.scss";
import { Aperture, ChevronDown } from "lucide-react";
import { useState } from "react";
import SearchCourse from "../search_course/Search";
import useCitiesStore from "@/store/useCitiesStore";
import { useTranslations } from "next-intl";

const formatStat = (n) => {
    if (!n) return "0";
    if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
    return String(n);
};

const Header = ({ updateFilter }) => {
    const t = useTranslations("header")
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
                    <span><Aperture color="#B12E33" size={22} />{t("globle")}</span>
                    <h1>{t("title")} <br /> {t("subTitle")} </h1>
                    <p>{t("text")} {stats?.cities || "..."} {t("subText")}</p>
                </div>
                <div className={styles.searchCourse}>
                    <SearchCourse className={styles.filter} updateFilter={(key, val) => updateFilter?.(key, val)} />
                    <div className={styles.locationSelect}>
                        <DropdownMenuCustom
                            label={t("allSpecialties")}
                            options={specializationOptions}
                            value={specialization}
                            onChange={handleSpecializationChange}
                            multi={false}
                            icon={<ChevronDown size={14} />}
                            triggerClassName={styles.dropdownTrigger}
                        />
                        <DropdownMenuCustom
                            label={t("allCities")}
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
                    <h2>{stats?.cities ? `${stats.cities}+` : "..."}</h2>
                    <span>{t("cityStat")}</span>
                </div>
                <div className={styles.item}>
                    <h2>{stats?.training_programs ? `${formatStat(stats.training_programs)}+` : "..."}</h2>
                    <span>{t("trainingPrograms")}</span>
                </div>
                <div className={styles.item}>
                    <h2>{stats?.total_students !== undefined ? `${formatStat(stats.total_students)}+` : "..."}</h2>
                    <span>{t("happyStudents")}</span>
                </div>
            </div>
        </div>
    );
};

export default Header;
