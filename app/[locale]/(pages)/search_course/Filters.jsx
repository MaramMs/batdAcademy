"use client";
import DropdownMenuCustom from "@/components/common/DropdownMenu";
import styles from "@/sass/pages/search-course/filters.module.scss";
import { Calendar, ChevronDown, MapPin } from "lucide-react";

import { useSearchParams } from "next/navigation";

const Filters = ({ updateFilter, categories, specializations, cities }) => {
  const searchParams = useSearchParams();

  // Get current values from URL
  const currentLang = searchParams.get("lang") || "English";
  const currentCategoryId = searchParams.get("category_id");
  const currentSpecializationId = searchParams.get("specialization_id");
  const currentCityId = searchParams.get("city_id");

  // Find names for display based on IDs from URL
  const selectedCategory = categories?.find(c => String(c.id) === currentCategoryId)?.name || "";
  const selectedSpecialization = specializations?.find(s => String(s.id) === currentSpecializationId)?.name || "";
  const selectedPlace = cities?.find(c => String(c.id) === currentCityId)?.name || "";

  return (
    <section className={styles.filter}>
      <div className={styles.filterRow}>
        <div className={styles.filterItem}>
          <DropdownMenuCustom
            label="Language"
            options={["English", "Arabic"]}
            value={currentLang}
            onChange={(value) => updateFilter("lang", value)}
            icon={<ChevronDown size={12} />}
          />
        </div>
        
        {/* Month/Year placeholders - can be implemented later if needed */}
        <div className={styles.filterItem}>
          Month <Calendar size={14} />
        </div>
        <div className={styles.filterItem}>
          Year <Calendar size={14} />
        </div>

        <div className={styles.filterItem}>
          <DropdownMenuCustom
            label="Category"
            options={categories?.map((item) => item.name)}
            value={selectedCategory}
            onChange={(name) => {
              const id = categories?.find(c => c.name === name)?.id;
              updateFilter("category_id", id);
            }}
            icon={<ChevronDown size={12} />}
          />
        </div>

        <div className={styles.filterItem}>
          <DropdownMenuCustom
            label="Specialization"
            options={specializations?.map((item) => item.name)}
            value={selectedSpecialization}
            onChange={(name) => {
              const id = specializations?.find(s => s.name === name)?.id;
              updateFilter("specialization_id", id);
            }}
            icon={<ChevronDown size={12} />}
          />
        </div>

        <div className={styles.filterItem}>
          <DropdownMenuCustom
            label="Place"
            options={cities?.map((item) => item.name)}
            value={selectedPlace}
            onChange={(name) => {
              const id = cities?.find(c => c.name === name)?.id;
              updateFilter("city_id", id);
            }}
            icon={<MapPin size={14} />}
          />
        </div>
      </div>
    </section>
  );
};

export default Filters;