import Title from "@/components/common/Title"
import styles from '@/sass/pages/home/what-is.module.scss'
import Image from "next/image"
import whatis from '@/public/asstes/whatis.png'
import containerStyle from '@/sass/components/common/container.module.scss'
import { ArrowRight } from "lucide-react"
import Link from "next/link"
const items = [
    {
        img: '/asstes/icons/computer.svg',
        title: 'Courses with discount',
        desc: 'We provide the latest international courses at suitable prices.'
    },
    {
        img: '/asstes/icons/game-development.svg',
        title: 'Approvide Courses',
        desc: 'Our courses offer participants many services and features.'
    },
    {
        img: '/asstes/icons/promotion.svg',
        title: 'Featured Courses',
        desc: 'Constantly updated course lists to meet labor market needs.'
    },
    {
        img: '/asstes/icons/ux-interface.svg',
        title: 'Courses by specialization',
        desc: 'More than 20 specializations in many fields'
    },
    {
        img: '/asstes/icons/computer.svg',
        title: 'Courses by city',
        desc: ' Our favorite cities with attractive attractions'
    },
]
const WhatIs = () => {
    return (
        <section className={styles.whatIs}>
            <div className={containerStyle.container}>
                <Title title='What is' span='BRITISH ACADEMY?' subtitle='' />
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
                                <button className={styles.planBtn}>
                                    Go to plan
                                    <ArrowRight size={19} />
                                </button>
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
                                            <Link href='/' className={styles.itemContentLink}>
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