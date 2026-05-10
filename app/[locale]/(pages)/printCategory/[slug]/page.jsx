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
const cards = [
    {
        id: 1,
        category: 'Management',
        title: 'project management',
        numOfStudents: '520',
        courseType: 'Advance',
        date1: '25 may 2025',
        date2: '28 may 2025',
        duration: '1 Year',
        location: 'Beirut, Lebanon',
        prices: [
            {
                label: 'Tuition Fees',
                value: '1800$'
            },
            {
                label: 'Books Fees',
                value: '250$'
            },
            {
                label: 'Total',
                value: '250$'
            },
        ]
    },
    {
        id: 2,
        category: 'Management',
        title: 'project management',
        numOfStudents: '520',
        courseType: 'Advance',
        date1: '25 may 2025',
        date2: '28 may 2025',
        duration: '1 Year',
        location: 'Beirut, Lebanon',
        prices: [
            {
                label: 'Tuition Fees',
                value: '1800$'
            },
            {
                label: 'Books Fees',
                value: '250$'
            },
            {
                label: 'Total',
                value: '250$'
            },
        ]
    },
    {
        id: 3,
        category: 'Management',
        title: 'project management',
        numOfStudents: '520',
        courseType: 'Advance',
        date1: '25 may 2025',
        date2: '28 may 2025',
        duration: '1 Year',
        location: 'Beirut, Lebanon',
        prices: [
            {
                label: 'Tuition Fees',
                value: '1800$'
            },
            {
                label: 'Books Fees',
                value: '250$'
            },
            {
                label: 'Total',
                value: '250$'
            },
        ]
    },
    {
        id: 4,
        category: 'Management',
        title: 'project management',
        numOfStudents: '520',
        courseType: 'Advance',
        date1: '25 may 2025',
        date2: '28 may 2025',
        duration: '1 Year',
        location: 'Beirut, Lebanon',
        prices: [
            {
                label: 'Tuition Fees',
                value: '1800$'
            },
            {
                label: 'Books Fees',
                value: '250$'
            },
            {
                label: 'Total',
                value: '250$'
            },
        ]
    },


]
const PrintCategory = () => {
    const { slug } = useParams();
    const searchParams = useSearchParams();
    const search = searchParams.get('search') || '';

    const { handleGetPlanBySlug, plan, isLoading } = usePlansStore();

    const items = plan?.courses?.items || [];
    console.log(items, 'items')
    useEffect(() => {
        const query = search ? `?search=${search}` : '';
        handleGetPlanBySlug(slug, query);
    }, [slug, search]);


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