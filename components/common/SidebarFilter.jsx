"use client";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { Filter } from "lucide-react";
import MotionWrapper from "./MotionWrapper";
import CategoriesBox from "./CategoriesBox";
import Range from "../ui/Range";
import Category from "../ui/Categories";
import styles from "@/sass/components/common/sidebar-filter.module.scss";
import { useTranslations } from "next-intl";

const SidebarFilter = ({ updateFilter, data, className, activeCategoryId, activeSpecializationId: activeSpecIdProp }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { locale } = useParams();
  const t = useTranslations('SearchCourse');

  const resolvedCategoryId = activeCategoryId ?? searchParams.get("category_id");
  const resolvedSpecId = activeSpecIdProp ?? searchParams.get("specialization_id");

  return (
    <MotionWrapper className={styles[className]}>
      <CategoriesBox title={t('allCategories')} icon={<Filter size={18} />} aria-hidden="true" as="h2">
        <div className={styles.sidebarFilterContent}>
          {data?.price_range && (
            <div className={styles.range}>
              <h3 className={styles.filterGroupTitle}>{t('priceRange')}</h3>
              <Range
                min={data.price_range.min}
                max={data.price_range.max}
                step={10}
                onChange={({ min, max }) => {
                  updateFilter("min_price", min);
                  updateFilter("max_price", max);
                }}
              />
            </div>
          )}

          <h3 className={styles.filterGroupTitle}>{t('courseType')}</h3>
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={searchParams.get("featured") === "1"}
                onChange={(e) => updateFilter("featured", e.target.checked ? "1" : 0)}
              />{" "}
              {t('featuredCourses')}
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={searchParams.get("has_approval") === "1"}
                onChange={(e) => updateFilter("has_approval", e.target.checked ? "1" : 0)}
              />{" "}
              {t('approvedCourses')}
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={searchParams.get("discounted") === "1"}
                onChange={(e) => updateFilter("discounted", e.target.checked ? "1" : 0)}
              />{" "}
              {t('discountedCourses')}
            </label>
          </div>
        </div>
      </CategoriesBox>

      <CategoriesBox title={t('allCategory')} as="h2">
        <ul className={styles.sidebarCategoryList}>
          {data?.categories?.map((category) => (
            <Category
              key={category.id}
              category={category}
              onClick={() => router.push(`/${locale}/category/${category.id}/${category.slug}`)}
              active={resolvedCategoryId === String(category.id)}
              activeSpecializationId={resolvedSpecId}
              onSpecializationClick={(specId, specSlug) =>
                router.push(`/${locale}/course_traning/${specId}/${specSlug}`)
              }
            />
          ))}
        </ul>
      </CategoriesBox>

      <CategoriesBox title={t('allTags')} as="h2">
        <div className={styles.sidebarTagsContainer}>
          {data?.tags?.map((tag, index) => (
            <button
              key={index}
              className={`${styles.tagPill} ${searchParams.get("tag") === String(tag) ? styles.active : ""}`}
              onClick={() => updateFilter("tag", tag)}
              type="button"
            >
              {tag}
            </button>
          ))}
        </div>
      </CategoriesBox>
    </MotionWrapper>
  );
};

export default SidebarFilter;
