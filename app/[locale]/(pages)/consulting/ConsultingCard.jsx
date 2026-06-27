"use client";
import Image from "next/image";
import styles from "@/sass/pages/consulting/consulting-card.module.scss";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import useLanguageStore from "@/store/useLanguageStore";
import { useTranslations } from "next-intl";

const ConsultingCard = ({ data }) => {
    const locale = useLanguageStore.getState().locale;
    const t = useTranslations('Consulting');

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                {data?.image && <Image src={data.image} alt={data?.name || "consulting"} width={403} height={192} />}
                <div className={styles.cardHeader}>
                    <span style={{ fontWeight: 700, fontSize: '18px', color: '#1E2749' }}>£</span>
                    <h3>{data?.name}</h3>
                </div>
            </div>
            <div className={styles.body}>
                <div dangerouslySetInnerHTML={{ __html: data?.description?.substring(0, 50) }} />
                <Link href={`/${locale}/consulting/${data?.slug || ""}`}>
                    {t('viewMore')} <ChevronRight />
                </Link>
            </div>
        </div>
    );
};

export default ConsultingCard;
