import Image from "next/image";
import styles from "@/sass/pages/consulting/expert-card.module.scss";
import { Briefcase } from "lucide-react";


const ExpertCard = ({ data }) => {
    return (
        <div className={styles.card}>
            <div className={styles.image}>
                {data?.image && <Image src={data.image} alt={data?.name || "expert"} width={313} height={239} />}
                <span>100+</span>
                {/* <span>{data?.year}</span> */}
            </div>
            <div className={styles.content}>
        <div className={styles.info}>
               <h2>{data?.name}</h2>
           <p>{data?.job_title}</p>
           {/* <span>{data?.specialty}</span> */}
        </div>
           <div className={styles.projectsNum}>
            <Briefcase size={17} color="#6A7282"/>
            {/* <p> {data?.projects} projects</p> */}
            <p> 1000+ projects</p>
          
           </div>
           
            </div>
        </div>
    );
};

export default ExpertCard;