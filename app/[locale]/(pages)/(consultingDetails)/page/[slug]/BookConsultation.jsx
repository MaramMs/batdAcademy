import styles from "@/sass/pages/consulting/consulting-details/book-consultation.module.scss"
import { Calendar, Clock, DollarSign } from "lucide-react";
const BookConsultation = () => {
    return (
        <div className={styles.bookConsultation}>
            <div className={styles.top}>
                <h3>Consultation Package</h3>
                <p>$50000 <span>-150000</span></p>

            </div>

            <div className={styles.content}>
              <div className={styles.contentItem}>
                  <div className={styles.item}>
                    <Clock size={20} color="#1E2749"/>
           <div className={styles.info}>
                     <h2>Duration</h2>
                    <p>5 weeks</p>
           </div>
                </div>
                <div className={styles.item}>
                     <Calendar size={20} color="#1E2749"/>

           <div className={styles.info}>

                    <h2>Availablility</h2>
                    <p>Flexible Scheduling</p>
           </div>
                </div>
                <div className={styles.item}>
                    <DollarSign size={20} color="#1E2749"/>
<div className={styles.info}>

                    <h2>Payment</h2>
                    <p>Flexible options</p>
                </div>
              </div>
              <div className={styles.footer}>
                  <button>Book Consultation</button>

                  <div className={styles.need}>
                  <div className={styles.head}>
                    <h3>Need help deciding?</h3>
                    <p>
Schedule a free 15-minute discovery call to discuss your needs
                    </p>
                    </div> 

                    <span>consult@example.com</span>

                  </div>
              </div>
            </div>
        </div>

        </div>
    );
};

export default BookConsultation;