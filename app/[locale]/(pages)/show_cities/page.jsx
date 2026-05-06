"use client";
import styles from "@/sass/pages/showCities/show-cities.module.scss";
import Header from "./Header";
import stylesContainer from "@/sass/components/common/container.module.scss";
import CityCard from "./CityCard";
import Skeleton from "@/components/ui/Skeleton";
import useCitiesStore from "@/store/useCitiesStore";
import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname, useParams } from "next/navigation";
import { ArrowRight } from "lucide-react";

const ShowCities = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { locale } = useParams();
    const { handleGetCities, handleLoadMore, cities, isLoading, hasMore } = useCitiesStore();

    useEffect(() => {
        handleGetCities();
    }, [handleGetCities]);

    useEffect(() => {
        const citySlug = searchParams.get("city");
        const specialization = searchParams.get("specialization");
        const search = searchParams.get("search");

        if ((citySlug || specialization || search) && cities.length > 0) {
            let targetCity;
            
            if (citySlug) {
                targetCity = cities.find((c) => c.slug === citySlug);
            } else {
                // If no city selected but other filters are present, use the first city
                targetCity = cities[0];
            }

            if (targetCity) {
                const params = new URLSearchParams(searchParams.toString());
                // Remove city from query params as it will be in the URL path
                params.delete("city");
                const queryString = params.toString() ? `?${params.toString()}` : "";
                router.push(`/${locale}/city/${targetCity.id}/${targetCity.slug}${queryString}`);
            }
        }
    }, [searchParams, cities, locale, router]);

    const updateFilter = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const onLoadMore = () => {
        const paramsString = searchParams.toString();
        const queryString = paramsString ? `?${paramsString}` : "";
        handleLoadMore(queryString);
    };

    return (
        <div className={styles.showCities}>
            <Header updateFilter={updateFilter} />

            <div className={styles.mainContent}>
                <div className={stylesContainer.container}>
                    <div className={styles.content}>
                        <div className={styles.title}>
                            <h2>Courses by city</h2>
                            <p>Our favorite cities with attractive attractions</p>
                        </div>

                        <div className={styles.cities}>
                            {isLoading ? (
                                Array.from({ length: 8 }).map((_, i) => (
                                    <Skeleton key={i} style={{ height: "320px", borderRadius: "12px" }} />
                                ))
                            ) : (
                                cities.map((city) => (
                                    <CityCard key={city.id} city={city} />
                                ))
                            )}
                        </div>

                        {!isLoading && hasMore && (
                            <button onClick={onLoadMore} className={styles.loadMoreBtn}>
                                View More <ArrowRight size={18} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowCities;
