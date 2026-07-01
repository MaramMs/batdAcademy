'use client';
import { motion } from 'framer-motion';

import heroImage from '@/public/asstes/heroImage.webp';
import stylesConteiner from '@/sass/components/common/container.module.scss';
import styles from '@/sass/pages/home/hero.module.scss';
import { Building2, Search, Users } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import useSearchAutocomplete from '@/hooks/useSearchAutocomplete';
import { useEffect, useState } from 'react';
import useCoursesStore from '@/store/useCoursesStore';
import SearchSuggestions from '@/components/ui/SearchSuggestions';
import { useRouter } from 'next/navigation';

export default function Hero() {
    const t = useTranslations('Hero');
    const locale = useLocale();
    const router = useRouter()
    const { query, setQuery, suggestions, isLoading, showDropdown, clearSuggestions } = useSearchAutocomplete();
    // User clicks a suggestion
    const handleSelect = async(course) => {
        setQuery(course.name);
        clearSuggestions();
        router.push(`/${locale}/search_course?search=${encodeURIComponent(course.name)}`);
        
    // }
        
    };

    // User clicks Search button or presses Enter
    const handleSearch = () => {
        if (!query.trim()) return;
        clearSuggestions();
        router.push(`/${locale}/search_course?search=${encodeURIComponent(query)}`);
    };
useEffect(() => {
    const handleClickOutside = (e) => {
        if (!e.target.closest(`.${styles.searchBar}`)) {
            clearSuggestions();
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

    const statsData = [
        {
            id: 1,
            value: '2.5k+',
            label: t('stats.participants'),
            icon: <Users />
        },
        {
            id: 2,
            value: '65,000k+',
            label: t('stats.organisations'),
            icon: <Building2 />,
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section className={styles.hero}>
            <div className={stylesConteiner.container}>
                <motion.div
                    className={styles.content}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* ── LEFT ── */}
                    <div className={styles.left}>
                        <motion.h1 className={styles.title} variants={itemVariants}>
                            {t.rich('title', {
                                ideal: (chunks) => <span>{chunks}</span>,
                                skills: (chunks) => <span>{chunks}</span>,
                                br: () => <br />
                            })}
                        </motion.h1>

{/* ── Wrap the motion.div with this plain div ── */}
<div className={styles.searchWrapper} >
    <motion.div
        className={`${styles.searchBar} ${styles.searchBarRelative}`}
        variants={itemVariants}
    >
        <span className={styles.searchIcon}>
            <Search color='#99A1AF' size={16} />
        </span>
        <input
            type="text"
            placeholder={t('searchPlaceholder')}
            className={styles.searchInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className={styles.btnSearch} onClick={handleSearch}>
            {t('searchButton')}
        </button>

        <SearchSuggestions
            suggestions={suggestions}
            isLoading={isLoading}
            onSelect={handleSelect}
            visible={showDropdown}
            query={query}
        />
    </motion.div>
</div>

                        <motion.p className={styles.subtitle} variants={itemVariants}>
                            {t('subtitle')}
                        </motion.p>

                        <motion.div className={styles.cta} variants={itemVariants}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={styles.btnPrimary}
                            >
                                <Link href='/search_course'>{t('viewCourses')}</Link>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={styles.btnSecondary}
                            >
                                <Link href='/show_cities'>{t('trainingHalls')}</Link>
                            </motion.button>
                        </motion.div>

                        <motion.div className={styles.stats} variants={itemVariants}>
                            {statsData.map((stat) => (
                                <div key={stat.id} className={styles.statItem}>
                                    <div className={styles.statIcon}>{stat.icon}</div>
                                    <div className={styles.statText}>
                                        <strong>{stat.value}</strong>
                                        <span>{stat.label}</span>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── RIGHT ── */}
                    <motion.div
                        className={styles.right}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <Image
                            src={heroImage}
                            alt={t('searchPlaceholder')}
                            className={styles.heroImage}
                            width={600}
                            height={400}
                            priority
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

