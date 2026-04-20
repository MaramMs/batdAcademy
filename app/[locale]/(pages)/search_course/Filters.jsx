"use client";

import DropdownMenuCustom from "@/components/common/DropdownMenu";
import styles from "@/sass/pages/search-course/filters.module.scss";
import { Calendar, ChevronDown, MapPin } from "lucide-react";
import { useState } from "react";

const Filters = () => {
  const [language, setLanguage] = useState("English");
  const [category, setCategory] = useState("");
  const [specialization, setSpecialization] = useState("");

  return (
    <section className={styles.filter}>
      <div className={styles.filterRow}>
        <div className={styles.filterItem}>
          <DropdownMenuCustom
            label="Language"
            options={["English", "Arabic", "French"]}
            value={language}
            onChange={(value) => setLanguage(value)}
            icon={<ChevronDown size={12} />}
          />
        </div>
        <div className={styles.filterItem}>
          Month <Calendar size={14} />
        </div>
        <div className={styles.filterItem}>
          Year <Calendar size={14} />
        </div>
        <div className={styles.filterItem}>
          <DropdownMenuCustom
            label="Category"
            options={["Development", "Business", "Design", "Marketing"]}
            value={category}
            onChange={(value) => setCategory(value)}
            icon={<ChevronDown size={12} />}
          />
        </div>
        <div className={styles.filterItem}>
          <DropdownMenuCustom
            label="Specialization"
            options={["Frontend", "Backend", "Fullstack", "Data Science"]}
            value={specialization}
            onChange={(value) => setSpecialization(value)}
            icon={<ChevronDown size={12} />}
          />
        </div>
        <div className={styles.filterItem}>
          Place <MapPin size={14} />
        </div>
      </div>
    </section>
  );
};

export default Filters;