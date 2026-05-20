'use client'
import styles from "@/sass/pages/consulting/consulting-category/consulting-category.module.scss";
import {usePathname, useRouter, useSearchParams } from "next/navigation";
import ConsultingCategoryCard from "./ConsultingCategoryCard";
import Header from "./Header";


const ConsultingService = ({serviceData}) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();


    const updateFilter = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };


    return (
        <div className={styles.consultingCategory}>
            <Header consultantName={serviceData?.name} updateFilter={updateFilter} />

            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <h1>Our Consulting Services</h1>
                    <p>Data-driven insights and strategic planning to guide your journey from planning to market entry.</p>
                </div>

                <div className={styles.contentCards}>
                    {
                        !serviceData?.services || serviceData.services.length === 0 ? (
                            <p>No Consulting Services Found</p>
                        ) : (
                            serviceData.services.map((service, index) => (
                                <ConsultingCategoryCard key={index} service={service} />
                            ))
                        )
                    }

                </div>

            </div>
        </div>
    );
};

export default ConsultingService;