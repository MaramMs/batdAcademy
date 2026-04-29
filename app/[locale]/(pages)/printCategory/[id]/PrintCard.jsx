import styles from "@/sass/pages/print-category/print-card.module.scss";
import { ArrowRight, Calendar, Clock, MapPin, Users } from "lucide-react";
import Link from "next/link";
const PrintCard = ({ card }) => {
    return (
        <div className={styles.card}>

            <div className={styles.info}>
                <span>{card.category}</span>
                <h2>{card.title}</h2>
                <div className={styles.numOfStudents}>
                    <p> <Users color='#4A5565' size={16} /> {card.numOfStudents} seats</p>
                    <span className={styles.dot}></span>
                    <span className={styles.type}>{card.courseType}</span>
                </div>

            </div>
            <div className={styles.dates}>
                <div className={styles.date1}>
                    <div className={styles.dateTitle}>
                        <Calendar color="#1E2749" size={16} />
                        Date 1
                    </div>
                    <span>{card.date1}</span>
                </div>
                <div className={styles.date2}>
                    <div className={styles.dateTitle}>
                        <Calendar color="#1E2749" size={16} />
                        Date 2
                    </div>
                    <span> {card.date2}</span>
                </div>


            </div>
            <div className={styles.durations}>
                <div className={styles.duration}>
                    <p className={styles.durationTitle}>
                        <Clock color="#1E2749" size={16} />
                        Duration
                    </p>
                    <span>{card.duration}</span>
                </div>
                <div className={styles.location}>
                    <div className={styles.locationTitle}>
                        <MapPin color="#1E2749" size={16} />
                        Location
                    </div>
                    <span className={styles.loctionSpan}> {card.location}</span>
                </div>


            </div>
            <div className={styles.prices}>
                <h4><span>$</span> Pricing Options</h4>
                <div className={styles.list}>
                    {
                        card.prices.map((price) => (
                            <div className={styles.price}>
                                <span className={styles.label}>
                                    {price.label}
                                </span>
                                <span className={styles.value}>
                                    {price.value}
                                </span>
                            </div>
                        ))}
                </div>
            </div>

            <div className={styles.btns}>
                <Link href='/en/course_details/1/test' className={styles.btnDetails}>
                    Details
                </Link>
                <Link href='/en/registerCourse' className={styles.btnReg}>
                    Register <ArrowRight size={16} />
                </Link>

            </div>
        </div>

    )
}

export default PrintCard