import Image from "next/image";
import Link from "next/link";
import useLanguageStore from "@/store/useLanguageStore";
import { ChevronRight } from "lucide-react";
import styles from "@/sass/pages/consulting/consulting-category/consulting-category-card.module.scss";

const ConsultingCategoryCard = ({ service }) => {
    const {locale} = useLanguageStore();
    return (
        <div className={styles.consultingCategoryCard}>
            <div className={styles.image}>
                <Image src={service.image} alt={service.name} width={403} height={224} />
                <span>{service.duration || '1-2 weeks'}</span>
            </div>
            <div className={styles.content}>
                <div className={styles.info}>
                    <h2>{service.name}</h2>
                    <div  dangerouslySetInnerHTML={{ __html: service.description }} style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}/>
                </div>
                <span>{service.prices || '$4500'}</span>
                <Link href={`/${locale}/page/${service.slug}`} className={styles.viewDetails}>
                    View Details
                    <ChevronRight />
                </Link>

            </div>
        </div>
    );
};

export default ConsultingCategoryCard;  