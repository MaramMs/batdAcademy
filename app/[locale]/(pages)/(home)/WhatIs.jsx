'use client'
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Title from "@/components/common/Title"
import whatis from '@/public/asstes/whatis.webp'
import useLanguageStore from "@/store/useLanguageStore"
import computer from '@/public/asstes/icons/computer.svg';
import gameDevelopment from '@/public/asstes/icons/game-development.svg';
import promotion from '@/public/asstes/icons/promotion.svg';
import uxInterface from '@/public/asstes/icons/ux-interface.svg';
import containerStyle from '@/sass/components/common/container.module.scss'
import styles from '@/sass/pages/home/what-is.module.scss'
import { useTranslations } from "next-intl"

const WhatIs = () => {
    const t = useTranslations('WhatIs');
    const { locale } = useLanguageStore();

    const items = [
        {
            params: { query: { discounted: 22 } },
            img: computer,
            title: t('items.discounted.title'),
            desc: t('items.discounted.desc'),
        },
        {
            params: { query: { has_approval: 1 } },
            img: gameDevelopment,
            title: t('items.approved.title'),
            desc: t('items.approved.desc'),
        },
        {
            params: { query: { featured: 1 } },
            img: promotion,
            title: t('items.featured.title'),
            desc: t('items.featured.desc'),
        },
        {
            params: { query: { specialization_id: 22 } },
            img: uxInterface,
            title: t('items.specialization.title'),
            desc: t('items.specialization.desc'),
        },
        {
            img: computer,
            title: t('items.city.title'),
            desc: t('items.city.desc'),
        },
    ];

    return (
        <section className={styles.whatIs}>
            <div className={containerStyle.container}>
                <Title title={t('title')} span={t('titleSpan')} subtitle='' />
                <div className={styles.content}>
                    <div className={styles.left}>
                        <div className={styles.imgContainer}>
                            <Image src={whatis} alt={t('titleSpan')} />
                            <div className={styles.imgOverlay}>
                                <div className={styles.plan}>
                                    <span>{t('annualPlan')}</span>
                                    <p>{t('annualPlanSub')}</p>
                                </div>
                                <Link href={`/${locale}/year_plan`} className={styles.planBtn}>
                                    {t('goToPlan')}
                                    <ArrowRight size={19} />
                                </Link>
                            </div>
                        </div>

                        <p>{t('description')}</p>

                    </div>
                    <div className={styles.right}>
                        {items.map((item, index) => (
                            <div key={index} className={styles.item}>
                                <Image src={item.img} width={68} height={61} alt={item.title} />
                                <div className={styles.itemContent}>
                                    <div className={styles.itemContentText}>
                                        <h3>{item.title}</h3>
                                        <p>{item.desc}</p>
                                    </div>
                                    <Link
                                        href={item.params?.query
                                            ? `/${locale}/search_course?${new URLSearchParams(item.params.query).toString()}`
                                            : `/${locale}/search_course`}
                                        className={styles.itemContentLink}
                                    >
                                        {t('viewDetails')}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WhatIs