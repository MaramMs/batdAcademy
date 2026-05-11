'use client';
import styleContainer from "@/sass/components/common/container.module.scss";
import styles from "@/sass/pages/print-category/print-category.module.scss";
import usePlansStore from "@/store/usePlansStore";
import { useEffect } from "react";
import Header from "./Header";
import Print from "./print";
import PrintCard from "./PrintCard";
import { useParams, useSearchParams } from "next/navigation";
import Skeleton from "@/components/ui/Skeleton";

const PrintCategory = () => {
    const searchParams = useSearchParams();
    const {id} =useParams()
    const search = searchParams.get('search') || '';

    const { handleGetPlanById, plan, isLoading } = usePlansStore();

    const items = plan?.courses?.items || [];
    useEffect(() => {
        const query = search ? `?search=${search}` : '';
        handleGetPlanById(id, query);
    }, [search,id]);


    return (
        <>
            {
                isLoading ? (
                    <div className={styles.list}>
                        {
                            [1, 2, 3, 4, 5].map(i => (
                                <Skeleton key={i} type="card" height='100px' />
                            ))
                        }

                    </div>

                ) : (
                    <section className={styles.printCategory}>
                        <Header name={plan?.name} summary={plan?.summary} />
                        <Print />

                        <div className={styles.mainContent}>

                            <div className={styleContainer.container}>
                                <div className={styles.list}>
                                    {
                                        items?.map((item) => (
                                            <PrintCard key={item.id} item={item} />
                                        ))
                                    }

                                </div>

                            </div>


                        </div>

                    </section>
                )
            }
        </>
    )
}

export default PrintCategory