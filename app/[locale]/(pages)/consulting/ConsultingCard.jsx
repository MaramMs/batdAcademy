import Image from "next/image";
import styles from "@/sass/pages/consulting/consulting-card.module.scss";
import { ChevronRight, DollarSign } from "lucide-react";
import Link from "next/link";

const ConsultingCard = ({ data }) => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <Image src={data.image} alt={data.title} width={403} height={192} />
                <div className={styles.cardHeader}>
                    <DollarSign />
                    <h3>{data.title}</h3>
                </div>
            </div>
          <div className={styles.body}>
              <p>{data.description}</p>
            <Link href="#">View More <ChevronRight /></Link>
          </div>
        </div>
    );
};

export default ConsultingCard;