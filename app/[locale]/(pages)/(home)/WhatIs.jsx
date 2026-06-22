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
const items = [
    {
        params: {query: {discounted: 22}},
        img: computer,
        title: 'Courses with discount',
        desc: 'We provide the latest international courses at suitable prices.'
    },
    {
         params: {query: {has_approval: 1}},
        img: gameDevelopment,
        title: 'Approvide Courses',
        desc: 'Our courses offer participants many services and features.'
    },
    {
         params: {query: {featured: 1}},
        img: promotion,
        title: 'Featured Courses',
        desc: 'Constantly updated course lists to meet labor market needs.'
    },
    {
         params: {query: {specialization_id: 22}},
        img: uxInterface,
        title: 'Courses by specialization',
        desc: 'More than 20 specializations in many fields'
    },
    {
        //  params: {query: {city_id: 22}},
        img: computer,
        title: 'Courses by city',
        desc: ' Our favorite cities with attractive attractions'
    },
]
const WhatIs = () => {
    const {locale} = useLanguageStore();

     const t = useTranslations('what-is');
  
    return (
        <section className={styles.whatIs}>
            <div className={containerStyle.container}>
                <Title title={t('title')} span={t('span')} subtitle={t('subtitle')} />
                <div className={styles.content}>
                    <div className={styles.left}>
                        <div className={styles.imgContainer}>
                            <Image src={whatis} alt="What is British Academy" />
                            <div className={styles.imgOverlay}>
                                <div className={styles.plan}>
                                    <span>
                                        Annual Training Plan
                                    </span>
                                    <p>Courses & Programs</p>

                                </div>
                                <Link href={`/${locale}/year_plan`} className={styles.planBtn}>
                                    Go to plan
                                    <ArrowRight size={19} />
                                </Link>
                            </div>
                        </div>

                        <p>The annual training plan for the courses and programs of the British Academy provides comprehensive learning pathways designed to enhance your professional development and career growth.</p>

                    </div>
                    <div className={styles.right}>
                        {
                            items.map((item,index) => {
                                return (
                                    <div key={index} className={styles.item}>
                                        <Image src={item.img} width={68} height={61} alt={item.title}/>
                                        <div className={styles.itemContent}>
                                          <div className={styles.itemContentText}>
                                            <h3>{item.title}</h3>
                                            <p>{item.desc}</p>
                                          </div>
                                            <Link 
                                            href={item.params?.query ? `/${locale}/search_course?${new URLSearchParams(item.params?.query).toString()}` : `/${locale}/search_course`}
                                            
                                             className={styles.itemContentLink}>
                                            View details
                                            
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        </section>
    )
}

export default WhatIs