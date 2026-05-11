import styles from "@/sass/pages/print-category/print-card.module.scss";
import { ArrowRight, Calendar, Clock, MapPin, Users } from "lucide-react";
import Link from "next/link";
const PrintCard = ({ item }) => {
    return (
        <div className={styles.card}>

            <div className={styles.info}>
                <span>{item?.category?.name.slice(0, 5)}</span>
                <h2>{item?.name}</h2>
                <div className={styles.numOfStudents}>
                    <p> <Users color='#4A5565' size={16} /> {item?.numOfStudents || "+600k"} seats</p>
                    <span className={styles.dot}></span>
                    <span className={styles.type}>{item?.courseType || 'Advance'}</span>
                </div>

            </div>
            <div className={styles.dates}>
                {
                    item?.dates?.map((date, index) => (
                        <div className={styles.date1}>
                            <div className={styles.dateTitle}>
                                <Calendar color="#1E2749" size={16} />
                                Date {index + 1}.
                            </div>
                            <span>{date.date}</span>
                        </div>
                    ))
                }



            </div>
            <div className={styles.durations}>
                <div className={styles.duration}>
                    <p className={styles.durationTitle}>
                        <Clock color="#1E2749" size={16} />
                        Duration
                    </p>
                    <span>{item.duration || '1-2 week'}</span>
                </div>
                <div className={styles.location}>
                    <div className={styles.locationTitle}>
                        <MapPin color="#1E2749" size={16} />
                        Location
                    </div>
                    <span className={styles.loctionSpan}> {item?.location || ' USA'}</span>
                </div>


            </div>
            <div className={styles.prices}>
                <h4><span>$</span> Pricing Options</h4>
                <div className={styles.list}>
                    {/* {
                        item?.[pricing]?.map((price) => (
                            <div className={styles.price}>
                                <span className={styles.label}>
                                    {price.label}
                                </span>
                                <span className={styles.value}>
                                    {price.value}
                                </span>
                            </div>
                        ))} */}
                    {item?.pricing && Object.entries(item.pricing).map(([key, details]) => (
                        <div className={styles.price} key={key}>
                            <span className={styles.label}>{details.name}</span>
                            <span className={styles.value}>{details.price}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.btns}>
                <Link href={`/en/course_details/${item.id}/${item.slug}`} className={styles.btnDetails}>
                    Details
                </Link>
                <Link href={`/en/registerCourse/${item.id}/${item.slug}`} className={styles.btnReg}>
                    Register <ArrowRight size={16} />
                </Link>

            </div>
        </div>

    )
}

export default PrintCard