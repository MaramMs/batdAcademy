"use client";
import { useEffect, useState } from "react";
import { Aperture, ChevronDown } from "lucide-react";
import DropdownMenuCustom from "@/components/common/DropdownMenu";
import useCitiesStore from "@/store/useCitiesStore";
import styles from "@/sass/pages/jobs/header.module.scss";
import { useTranslations } from "next-intl";

const Header = ({ updateFilter }) => {
    const t = useTranslations('Jobs');
    const [specialization, setSpecialization] = useState("");
    const [city, setCity] = useState("");
    const { stats, specializations, cities, handleGetCities } = useCitiesStore();

    useEffect(() => {
        handleGetCities();
    }, [handleGetCities]);

    const specializationOptions = specializations.map((s) => ({ label: s.name, value: s.slug }));
    const cityOptions = cities.map((c) => ({ label: c.name, value: c.slug }));

    const handleFindJob = () => {
        const selectedSpecialization = specializations.find((s) => s.slug === specialization);
        const selectedCity = cities.find((c) => c.slug === city);
        const searchText = [selectedSpecialization?.name, selectedCity?.name]
            .filter(Boolean)
            .join(" ");

        updateFilter?.({ key: "search", value: searchText });
    };

    return (
        <div className={styles.header}>
            <div className={styles.content}>
                <div className={styles.title}>
                    {/* <span><Aperture color="#B12E33" size={22} />EXPLORE OUR GLOBAL LOCATIONS</span> */}
                    <h1>{t('headerTitle')}</h1>
                    <p>{t('headerSubtitle')}</p>
                </div>
                <div className={styles.searchCourse}>

                    <div className={styles.locationSelect}>
                        <DropdownMenuCustom
                            label={t('allSpecializations')}
                            options={specializationOptions}
                            value={specialization}
                            onChange={setSpecialization}
                            multi={false}
                            icon={<ChevronDown size={14} />}
                            triggerClassName={styles.dropdownTrigger}
                        />
                        <DropdownMenuCustom
                            label={t('allCities')}
                            options={cityOptions}
                            value={city}
                            onChange={setCity}
                            multi={false}
                            icon={<ChevronDown size={14} />}
                            triggerClassName={styles.dropdownTrigger}
                        />

                        <button className={styles.findJobBtn} onClick={handleFindJob}>{t('findJob')}</button>
                    </div>
                      <p className={styles.suggestions}>Suggestions: 
                        <span>Programing</span>
                        <span>Programing</span>
                        <span>Programing</span>
                        <span>Programing</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Header;
