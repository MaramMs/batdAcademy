import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import styles from "@/sass/pages/consulting/consulting-category/consulting-category-card.module.scss";

const ConsultingCategoryCard = ({ data }) => {
    return (
        <div className={styles.consultingCategoryCard}>
            <div className={styles.image}>
                <Image src={data.image} alt={data.name} width={403} height={224} />
                <span>{data.duration}</span>
            </div>
            <div className={styles.content}>
                <div className={styles.info}>
                    <h2>{data.title}</h2>
                    <p>{data.description}</p>
                </div>
                <span>{data.prices}</span>
                <Link href={`/en/page/${data.slug}`} className={styles.viewDetails}>
                    View Details
                    <ChevronRight />
                </Link>

            </div>
        </div>
    );
};

export default ConsultingCategoryCard;  