import { useSearchParams, useRouter, useParams } from "next/navigation";
import { Filter } from "lucide-react";
import MotionWrapper from "./MotionWrapper";
import CategoriesBox from "./CategoriesBox";
import Range from "../ui/Range";
import Category from "../ui/Categories";
import styles from "@/sass/components/common/sidebar-filter.module.scss";

const SidebarFilter = ({ updateFilter, data ,className}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { locale } = useParams();
  return (
    <MotionWrapper className={styles[className]}>
      <CategoriesBox title="All Categories" icon={<Filter size={18} />} aria-hidden="true" as="h2">
        <div className={styles.sidebarFilterContent}>
          {data?.price_range && (
            <div className={styles.range}>
              <h3 className={styles.filterGroupTitle}>Price Range</h3>
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

          <h3 className={styles.filterGroupTitle}>Course Type</h3>
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={searchParams.get("featured") === "featured"}
                onChange={(e) =>
                  updateFilter("featured", e.target.checked ? "1" : 0)
                }
              />{" "}
              featured Courses
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={searchParams.get("has_approval") === "has_approval"}
                onChange={(e) =>
                  updateFilter("has_approval", e.target.checked ? "1" : 0)
                }
              />{" "}
              Approval Courses
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={searchParams.get("discounted") === "1"}
                onChange={(e) =>
                  updateFilter("discounted", e.target.checked ? "1" : 0)
                }
              />{" "}
              Discounted Courses
            </label>
          </div>
        </div>
      </CategoriesBox>
      <CategoriesBox title="All Category" as="h2">
        <ul className={styles.sidebarCategoryList}>
          {data?.categories?.map((category) => (
            <Category
              key={category.id}
              category={category}
            
              active={searchParams.get("category_id") === String(category.id)}
              activeSpecializationId={searchParams.get("specialization_id")}
              onSpecializationClick={(specId, specSlug) => {
                router.push(`/${locale}/course_training/${specId}/${specSlug}`);
              }}
            />
          ))}
        </ul>
      </CategoriesBox>
      <CategoriesBox title="All Tags" as="h2">
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
