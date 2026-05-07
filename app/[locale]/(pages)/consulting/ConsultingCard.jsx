import Image from "next/image";
import styles from "@/sass/pages/consulting/consulting-card.module.scss";
import { ChevronRight, DollarSign } from "lucide-react";
import Link from "next/link";
import useLanguageStore from "@/store/useLanguageStore";
const placeHolderImage = [
    "/asstes/logo.svg",
    "/asstes/logo.svg",
    "/asstes/logo.svg",
];

const ConsultingCard = ({ data }) => {
    const locale = useLanguageStore.getState().locale;
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                {data?.image && <Image src={data.image} alt={data?.name || "consulting"} width={403} height={192} />}
                <div className={styles.cardHeader}>
                    <DollarSign />
                    <h3>{data?.name}</h3>
                </div>
            </div>
          <div className={styles.body}>
            {/* <div className={styles.desc}> */}
            <div dangerouslySetInnerHTML={{__html: data?.description?.substring(0, 50)}} >

            {/* </div> */}
            </div>
           
            <Link href={`/${locale}/consulting/${data?.slug || ""}`}>View More <ChevronRight /></Link>
          </div>
        </div>
    );
};

export default ConsultingCard;