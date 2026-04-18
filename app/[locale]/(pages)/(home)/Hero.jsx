import Image from 'next/image';
import styles from '@/sass/pages/home/hero.module.scss';
import hero from "@/public/asstes/heroImage.jpg"
import { Building2, Search, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import stylesConteiner from '@/sass/components/common/container.module.scss'

export default function Hero() {
    const t = useTranslations('Hero');

    const statsData = [
        {
            id: 1,
            value: '3.5+',
            label: t('stats.participants'),
            icon: <Users />
        },
        {
            id: 2,
            value: '65,000+',
            label: t('stats.organisations'),
            icon: <Building2 />,
        },
    ];

    return (
        <section className={styles.hero}>
            <div className={stylesConteiner.container}>
              <div className={styles.content}>
                  {/* ── LEFT ── */}
                <div className={styles.left}>
                    <h1 className={styles.title}>
                        {t.rich('title', {
                            ideal: (chunks) => <span>{chunks}</span>,
                            skills: (chunks) => <span>{chunks}</span>,
                            br: () => <br />
                        })}
                    </h1>

                    <div className={styles.searchBar}>
                        <span className={styles.searchIcon}>
                            <Search color='#99A1AF' size={16} />
                        </span>
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            className={styles.searchInput}
                        />
                        <button className={styles.btnSearch}>{t('searchButton')}</button>
                    </div>

                    <p className={styles.subtitle}>
                        {t('subtitle')}
                    </p>

                    <div className={styles.cta}>
                        <button className={styles.btnPrimary}>{t('viewCourses')}</button>
                        <button className={styles.btnSecondary}>{t('trainingHalls')}</button>
                    </div>

                    <div className={styles.stats}>
                        {statsData.map((stat) => (
                            <div key={stat.id} className={styles.statItem}>
                                <div className={styles.statIcon}>{stat.icon}</div>
                                <div className={styles.statText}>
                                    <strong>{stat.value}</strong>
                                    <span>{stat.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT ── */}
                <div className={styles.right}>
                    <Image
                        src={hero}
                        alt={t('searchPlaceholder')} 
                        className={styles.heroImage}
                    
                    />
                </div>
              </div>
            </div>
        </section>
    );
}
