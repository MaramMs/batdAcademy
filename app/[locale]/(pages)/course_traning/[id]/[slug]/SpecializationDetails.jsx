"use client";

import Skeleton from "@/components/ui/Skeleton";
import UpcomingCouresCard from "@/components/ui/UpcomingCouresCard";
import SidebarFilter from "@/components/common/SidebarFilter";
import stylesContainer from "@/sass/components/common/container.module.scss";
import styles from "@/sass/pages/category-details/category-details.module.scss";
import useCoursesStore from "@/store/useCoursesStore";
import { use, useEffect, useMemo } from "react";
import Header from "./Header";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";

const SpecializationDetails = ({ params }) => {
  const { id } = use(params);
  const t = useTranslations('CourseTraning');
  const { data, handleGetCourses, isLoading } = useCoursesStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    handleGetCourses(`?specialization_id=${id}`);
  }, [id]);

  // Find the parent category that contains this specialization
  const parentCategoryId = useMemo(() => {
    if (!data?.categories) return null;
    const parent = data.categories.find((cat) =>
      cat.specializations?.some((spec) => String(spec.id) === String(id))
    );
    return parent ? String(parent.id) : null;
  }, [data?.categories, id]);

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('cursor');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className={styles.categoryDetails}>
      <Header />

      <div className={styles.mainContent}>
        <div className={stylesContainer.container}>
          <div className={styles.contentWrapper}>
            <div className={styles.content}>

              <SidebarFilter
                data={data}
                updateFilter={updateFilter}
                activeCategoryId={parentCategoryId}
                activeSpecializationId={String(id)}
              />

              <div className={styles.rightContent}>
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} type="card" height="400px" />
                  ))
                ) : data?.courses?.length > 0 ? (
                  data.courses.map((course, index) => (
                    <UpcomingCouresCard key={index} course={course} />
                  ))
                ) : (
                  <div className={styles.noCourses}>
                    <h3>{t('noCoursesFound')}</h3>
                  </div>
                )}

                {data?.has_more && (
                  <button className={styles.viewMore} onClick={() => handleGetCourses(`?specialization_id=${id}&cursor=${data.next_cursor}`, true)}>
                    {t('viewMore')} <ArrowRight />
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecializationDetails;
