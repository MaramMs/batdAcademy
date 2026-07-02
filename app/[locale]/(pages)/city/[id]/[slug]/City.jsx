"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter, usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, ArrowLeft, X } from "lucide-react";
import Header from "./Header";
import NavgationBar from "./NavgationBar";
import UpcomingCouresCard from "@/components/ui/UpcomingCouresCard";
import useCoursesStore from "@/store/useCoursesStore";
import Skeleton from "@/components/ui/Skeleton";
import SidebarFilter from "@/components/common/SidebarFilter";
import NoData from "@/components/common/NoData";
import stylesContainer from "@/sass/components/common/container.module.scss";
import styles from "@/sass/pages/course-details-by-city/course-details-by-city.module.scss";
import { useTranslations, useLocale } from "next-intl";

const CourseByCityDetails = () => {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const t = useTranslations();
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const { data, handleGetCourses, isLoading } = useCoursesStore();
    const [visibleCount, setVisibleCount] = useState(6);
    const [mounted, setMounted] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (params.has('type')) {
            params.set('taxonomy', params.get('type'));
            params.delete('type');
        }
        params.set("city_id", id);
        const queryString = `?${params.toString()}`;
        handleGetCourses(queryString);
    }, [searchParams, id, handleGetCourses]);

    const updateFilter = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        params.delete("cursor");
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleViewMore = () => {
        if (data?.courses && visibleCount < data.courses.length) {
            setVisibleCount(prev => prev + 6);
        } else if (data?.has_more) {
            setVisibleCount(prev => prev + 6);
            const params = new URLSearchParams(searchParams.toString());
            if (params.has('type')) {
                params.set('taxonomy', params.get('type'));
                params.delete('type');
            }
            params.set("city_id", id);
            params.set('cursor', data.next_cursor);
            handleGetCourses(`?${params.toString()}`, true);
        }
    };

    return (
        <section className={styles.courseByCityDetails}>
            <NavgationBar />
            <Header updateFilter={updateFilter} onOpenFilters={() => setFilterOpen(true)} />

            <div className={styles.mainContent}>
                <div className={stylesContainer.container}>
                    <Dialog.Root modal={true} open={filterOpen} onOpenChange={setFilterOpen}>
                        {mounted && (
                            <Dialog.Portal>
                                <Dialog.Overlay className={styles.drawerOverlay} />
                                <Dialog.Content className={styles.drawerContent}>
                                    <div className={styles.drawerHeader}>
                                        <Dialog.Title className={styles.drawerTitle}>
                                            {t('filters')}
                                        </Dialog.Title>
                                        <Dialog.Close className={styles.drawerClose}>
                                            <X size={20} aria-hidden="true" />
                                        </Dialog.Close>
                                    </div>

                                    <SidebarFilter updateFilter={updateFilter} data={data} className='mobileFilter' />
                                </Dialog.Content>
                            </Dialog.Portal>
                        )}
                    </Dialog.Root>

                    <div className={styles.content}>
                        <SidebarFilter updateFilter={updateFilter} data={data}  className='filter'/>
                        <div className={styles.rightContent}>
                            {isLoading && !data?.courses ? (
                                <div className={styles.cards}>
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <Skeleton key={i} type="card" height="400px" />
                                    ))}
                                </div>
                            ) : (
                                <>
                                    <div className={styles.cards}>
                                        {
                                        data?.courses?.length === 0 ? (
                                            <div className={styles.noDataFound}> 
                                              <NoData message='No Courses Found' />
                                             </div>
                                        ) : (
                                            data?.courses?.slice(0, visibleCount)?.map((course, index) => (
                                                <UpcomingCouresCard key={index} course={course} cityId={id} />
                                            ))
                                        )}
                                    </div>
                                    {(visibleCount < (data?.courses?.length || 0) || data?.has_more) && (
                                        <button className={styles.showMoreBtn} onClick={handleViewMore}>
                                            {t('showMore')} {locale === 'ar' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CourseByCityDetails;
