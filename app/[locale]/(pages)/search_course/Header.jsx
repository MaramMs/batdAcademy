"use client";
import styleContainer from "@/sass/components/common/container.module.scss";
import styles from "@/sass/pages/search-course/header.module.scss";
import { ChevronRight, House } from "lucide-react";
import Filters from "./Filters";
import SearchCourse from "./Search";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

const Header = ({ updateFilter, categories, specializations, cities }) => {
    const t = useTranslations('SearchCourse');
    const { locale } = useParams();

    return (
        <section className={styles.header}>
            <div className={styleContainer.container}>
                <div className={styles.wrapper}>
                    <div className={styles.breadcrumb}>
                        <Link href={`/${locale}`}><House /></Link>
                        <ChevronRight />
                        <span>{t('breadcrumb')}</span>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.title}>
                            <h1>
                                {t('title')}{' '}
                                <span>{t('titleSpan')}</span>
                            </h1>
                            <p>{t('subtitle')}</p>
                        </div>

                        <div className={styles.search}>
                            <SearchCourse updateFilter={updateFilter} />
                            <Filters
                                updateFilter={updateFilter}
                                categories={categories}
                                specializations={specializations}
                                cities={cities}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Header;
