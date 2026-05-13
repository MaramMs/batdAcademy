'use client'
import Skeleton from "@/components/ui/Skeleton";
import styles from "@/sass/pages/consulting/consulting-category/consulting-category.module.scss";
import useConsultingStore from "@/store/useConsultingStore";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import ConsultingCategoryCard from "./ConsultingCategoryCard";
import Header from "./Header";


const ConsultingService = () => {
    const { isLoading, handleGetConsultantWithService, consulting } = useConsultingStore();
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();


    const { slug } = useParams();
    const updateFilter = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    useEffect(() => {
        const paramsString = searchParams.toString();
        const queryString = paramsString ? `?${paramsString}` : "";
        handleGetConsultantWithService(slug, queryString);
    }, [slug, searchParams]);


    return (
        <div className={styles.consultingCategory}>
            <Header consultantName={consulting?.name} updateFilter={updateFilter} />

            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <h1>Our Consulting Services</h1>
                    <p>Data-driven insights and strategic planning to guide your journey from planning to market entry.</p>
                </div>

                {
                    isLoading ? (
                        <div className={styles.contentCards}>
                            {[1, 2, 3, 4, 5, 6].map((item, index) => (
                                <Skeleton key={index} type="card" height={400} width="100%" />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.contentCards}>
                            {
                                consulting?.services?.length === 0 ? (
                                    <p>No Consulting Services Found</p>
                                ) : (
                                    consulting?.services?.map((service, index) => (
                                        <ConsultingCategoryCard key={index} service={service} />
                                    ))
                                )
                            }

                        </div>
                    )
                }


            </div>
        </div>
    );
};

export default ConsultingService;