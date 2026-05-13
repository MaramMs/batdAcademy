import styles from "@/sass/pages/jobs/jobs.module.scss";
import { ArrowRight, Award, Bookmark, Clock, DollarSign, MapPin } from "lucide-react";
const JobCard = () => {
    return (
        <div className={styles.jobCard}>
            <div className={styles.cardHeader}>
                <span className={styles.jobType}> full-time</span>
                <Bookmark color="#99A1AF" size={20}/>
            </div>
            <div className={styles.jobTitle}>
                <span>
                     G
                </span>
                <p>
                    <h2>Software Development Engineer</h2>
                   <span className={styles.companyName}>
                    Google Inc
                   </span>
                </p>
            </div>
           <div className={styles.jobInfo}>
            <span >
                <MapPin />
                New York, USA

            </span>
            <span className={styles.salary}> <DollarSign color="#1E2749"/> 200000$</span>
            <span> <Clock/> 2 days ago</span>

           </div>
           <div className={styles.jobSkills}>
             <Award size={16} color="#99A1AF"/>
            <span>2-3 years experience</span>
           </div>
           <button className={styles.viewBtn}>View Details <ArrowRight  size={16}/></button>
        </div>
    );
};

export default JobCard;