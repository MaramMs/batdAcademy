"use client";
import { useEffect, useState } from "react";
import { Aperture, ChevronDown } from "lucide-react";
import DropdownMenuCustom from "@/components/common/DropdownMenu";
// import SearchCourse from "@/search_course/Search";
import useCitiesStore from "@/store/useCitiesStore";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import styles from "@/sass/pages/jobs/header.module.scss";

const Header = ({ updateFilter }) => {
    const { id, slug, locale } = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [specialization, setSpecialization] = useState(searchParams.get("specialization") || "");
    const [city, setCity] = useState(slug || "");
    const { stats, specializations, cities, handleGetCities } = useCitiesStore();

    useEffect(() => {
        handleGetCities();
    }, [handleGetCities]);

    const specializationOptions = specializations.map((s) => ({ label: s.name, value: s.slug }));
    const cityOptions = cities.map((c) => ({ label: c.name, value: c.slug }));

    const handleSpecializationChange = (val) => {
        setSpecialization(val);
        updateFilter?.("specialization", val);
    };

    const handleCityChange = (val) => {
        setCity(val);
        const targetCity = cities.find(c => c.slug === val);
        if (targetCity) {
            const params = new URLSearchParams(searchParams.toString());
            params.delete("city");
            router.push(`/${locale}/city/${targetCity.id}/${targetCity.slug}?${params.toString()}`);
        }
    };

    const currentCity = cities.find(c => String(c.id) === String(id));

    return (
        <div className={styles.header}>
            <div className={styles.content}>
                <div className={styles.title}>
                    {/* <span><Aperture color="#B12E33" size={22} />EXPLORE OUR GLOBAL LOCATIONS</span> */}
                    <h1>Find a job that suits your <span>
                    interest & skills </span></h1>
                    <p>Aliquam vitae turpis in diam convallis finibus in at risus. Nullam in scelerisque leo, eget sollicitudin velit bestibulum.</p>
                </div>
                <div className={styles.searchCourse}>
                  
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

                        <button className={styles.findJobBtn}>Find a Job</button>
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
