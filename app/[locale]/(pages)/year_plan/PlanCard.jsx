import styles from "@/sass/pages/year-plan/plan-card.module.scss";
import { ArrowRight, FileText, TvMinimal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PlanCard = () => {
    return (
        <div className={styles.card}>
            <div className={styles.img}>
                <Image src='/asstes/plan.jpg' alt={""} width={424} height={280} />
                <span className={styles.num}>01</span>
                <span className={styles.icon}><TvMinimal /></span>
            </div>
            <div className={styles.details}>
                <div className={styles.info}>
                 <div className={styles.head}>
                       <h4 className={styles.tag}><FileText color='#1E2749' size={12} /> Software Development</h4>
                    <h2 className={styles.title}>14-Week Program Structure</h2>
                 </div>
                    <p className={styles.description}>
                        The Management Strategic Plan represents a comprehensive framework for organizational excellence and leadership development. This multi-year initiative focuses on building robust management systems that drive sustainable growth and operational efficiency across all organizational levels.
<br /> 
                        <span>Read more....</span>
                    </p>
                </div>
                <Link href='/en/printCategory/1' className={styles.link}>
                  View Year Plans <ArrowRight />
                </Link>
            </div>
        </div>
    );
};
export default PlanCard;