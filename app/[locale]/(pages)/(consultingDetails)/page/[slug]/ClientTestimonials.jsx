import styles from "@/sass/pages/consulting/consulting-details/client-testimonials.module.scss";
import { Star } from "lucide-react";

const ClientTestimonials = () => {
    return (
        <div className={styles.clientTestimonials}>
            <h2>
                Client Testimonials
            </h2>

            <div className={styles.cards}>
                <div className={styles.card}>
                    <div className={styles.stars}>
                        <Star fill="#F0B100" size={18}/>
                        <Star fill="#F0B100" size={18}/>
                        <Star fill="#F0B100" size={18}/>
                        <Star fill="#F0B100" size={18}/>
                        <Star fill="#F0B100" size={18}/>
                    </div>
                    <p>"Outstanding service! The consultant provided invaluable insights that transformed our business strategy. Highly recommended!"</p>
                    <span className={styles.name}>
                        - Sarah Smith, CEO
                    </span>

                </div>

                 <div className={styles.card}>
                    <div className={styles.stars}>
                        <Star fill="#F0B100" size={18}/>
                        <Star fill="#F0B100" size={18}/>
                        <Star fill="#F0B100" size={18}/>
                        <Star fill="#F0B100" size={18}/>
                        <Star fill="#F0B100" size={18}/>
                    </div>
                    <p>"Outstanding service! The consultant provided invaluable insights that transformed our business strategy. Highly recommended!"</p>
                    <span className={styles.name}>
                        - Sarah Smith, CEO
                    </span>

                </div>
                 <div className={styles.card}>
                    <div className={styles.stars}>
                        <Star fill="#F0B100" size={18}/>
                        <Star fill="#F0B100" size={18}/>
                        <Star fill="#F0B100" size={18}/>
                        <Star fill="#F0B100" size={18}/>
                        <Star fill="#F0B100" size={18}/>
                    </div>
                    <p>"Outstanding service! The consultant provided invaluable insights that transformed our business strategy. Highly recommended!"</p>
                    <span className={styles.name}>
                        - Sarah Smith, CEO
                    </span>

                </div>
            </div>

        </div>
    );
};

export default ClientTestimonials;