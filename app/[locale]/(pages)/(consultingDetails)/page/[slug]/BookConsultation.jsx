import styles from "@/sass/pages/consulting/consulting-details/book-consultation.module.scss"
import { Calendar, Clock, DollarSign } from "lucide-react";
const BookConsultation = ({bookPackage}) => {
    return (
        <div className={styles.bookConsultation}>
            <div className={styles.top}>
                <h3>{bookPackage?.title}</h3>
                <p>{bookPackage?.price_min || '500$'} <span>-{bookPackage?.price_max || '1000$'}</span></p>

            </div>

            <div className={styles.content}>
              <div className={styles.contentItem}>
                  <div className={styles.item}>
                    <Clock size={20} color="#1E2749"/>
           <div className={styles.info}>
                     <h2>Duration</h2>
                    <p>{bookPackage?.duration || '1-3 weeks'}</p>
           </div>
                </div>
                <div className={styles.item}>
                     <Calendar size={20} color="#1E2749"/>

           <div className={styles.info}>

                    <h2>Availablility</h2>
                    <p>{bookPackage?.availability}</p>
           </div>
                </div>
                <div className={styles.item}>
                    <DollarSign size={20} color="#1E2749"/>
<div className={styles.info}>

                    <h2>Payment</h2>
                    <p>{bookPackage?.payment}</p>
                </div>
              </div>
              <div className={styles.footer}>
                  <button>{bookPackage?.cta?.label || 'Book Consultation'}</button>

                  <div className={styles.need}>
                  <div className={styles.head}>
                    <h3> {bookPackage?.help?.title || 'Need help deciding?'}</h3>
                    <p>
{bookPackage?.help?.description || 'Schedule a free 15-minute discovery call to discuss your needs'}
                    </p>
                    </div> 

                    <span>{bookPackage?.help?.email || 'consult@gmail.com'}</span>

                  </div>
              </div>
            </div>
        </div>

        </div>
    );
};

export default BookConsultation;