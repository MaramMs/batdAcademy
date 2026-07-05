'use client';
import { motion } from 'framer-motion';

import stylesConteiner from '@/sass/components/common/container.module.scss';
import styles from '@/sass/pages/home/hero.module.scss';
import {
    Award,
    CheckCircle2,
    Search,
    ShieldCheck,
} from 'lucide-react';
import HeroVisual from '@/components/ui/HeroVisual';
import { useLocale, useTranslations } from 'next-intl';
import { Plus_Jakarta_Sans } from 'next/font/google';
import heroImage from "@/public/asstes/heroup.jpeg"
import { useRouter } from 'next/navigation';
import useSearchAutocomplete from '@/hooks/useSearchAutocomplete';
import { useEffect } from 'react';
import SearchSuggestions from '@/components/ui/SearchSuggestions';

const plusJakarta = Plus_Jakarta_Sans({
    subsets: ['latin'],
    weight: ['600', '700', '800'],
    variable: '--font-heading',
});

export default function Hero() {
    const t = useTranslations('Hero');

    const trustItems = [
        t('trust.experience'),
        t('trust.professionals'),
        t('trust.programs'),
        t('trust.clients'),
        t('trust.standards'),
    ];

    const programsStat = {
        value: '600+',
        label: t('stats.programsLabel'),
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const locale = useLocale();
    const router = useRouter()
    const { query, setQuery, suggestions, isLoading, clearSuggestions } = useSearchAutocomplete();
    console.log(suggestions, 'sug from hero')
    const showDropdown = query.length >= 2 && suggestions.length > 0;

    console.log(showDropdown, 'show drop')
    // User clicks a suggestion
    const handleSelect = async (course) => {
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

    return (
        <section className={`${styles.hero} ${plusJakarta.variable}`}>
            <div className={styles.bgPattern} aria-hidden="true" />
            <div className={stylesConteiner.container}>
                <motion.div
                    className={styles.content}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* ── LEFT ── */}
                    <div className={styles.left}>
                        <motion.div className={styles.badge} variants={itemVariants}>
                            <span className={styles.badgeIcon}>
                                <ShieldCheck size={16} />
                                <span className={styles.badgeIconAccent}>
                                    <Award size={9} />
                                </span>
                            </span>
                            <span className={styles.badgeText}>{t('badge')}</span>
                        </motion.div>

                        <motion.h1 className={`${styles.title} ${locale === 'en' ? styles.titleEn : ''}`} variants={itemVariants}>
                            {t.rich('title', {
                                highlight: (chunks) => <span>{chunks}</span>,
                            })}
                        </motion.h1>

                        <motion.p className={styles.subtitle} variants={itemVariants}>
                            {t('subtitle')}
                        </motion.p>

                        <motion.ul className={styles.trustBar} variants={itemVariants}>
                            {trustItems.map((item, index) => (
                                <li key={index} className={styles.trustItem}>
                                    <CheckCircle2 size={16} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </motion.ul>
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
                                />
                            </motion.div>
                        </div>

                        <motion.div className={styles.cta} variants={itemVariants}>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={styles.btnPrimary}
                            >
                                {t('explorePrograms')}
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={styles.btnSecondary}
                            >
                                {t('requestConsultation')}
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* ── RIGHT — HeroVisual component ── */}
                    <motion.div
                        className={styles.right}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <HeroVisual config={{
                            mainImage: {
                                src: { heroImage },
                                alt: t('subtitle'),
                            },
                            coursesCard: {
                                number: programsStat.value,
                                label: programsStat.label,
                            },
                            certifiedCard: {
                                image: "/asstes/expert.jpg",
                                alt: "Certified program",
                                text: "Certified Programs",
                            },
                            teamCard: {
                                title: "Our Specialized Team",
                                members: ["S", "M", "E", "J"],
                                moreText: "+500",
                            },
                        }} />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
