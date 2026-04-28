import Header from "./Header";
import styles from "@/sass/pages/consulting/consulting-details/consulting-details.module.scss";
import stylesContainer from "@/sass/components/common/container.module.scss";
import Overview from "./Overview";
import Process from "./Process";
import ClientTestimonials from "./ClientTestimonials";
import BookConsultation from "./BookConsultation";
import { Check } from "lucide-react";
import NavgationBar from "./NavgationBar";

const ConsultingDetails = () => {
    return (
        <div>
            <NavgationBar />
            <Header />
            <div className={styles.mainContent}>
                <div className={stylesContainer.container}>
                    <div className={styles.wrapper}>
                        <div className={styles.left}>
                            <Overview />

                            <Process />

                            <ClientTestimonials />

                        </div>

                        <div className={styles.right}>
                            <BookConsultation />

                            <div className={styles.chooseUs}>
                                <h3>
                                    Why Choose Us
                                </h3>
                                <ul>
                                    <li> <Check size={16} color="#009966" /> Expert consultants</li>
                                    <li> <Check size={16} color="#009966" /> Expert consultants</li>
                                    <li> <Check size={16} color="#009966" /> Expert consultants</li>
                                    <li> <Check size={16} color="#009966" /> Expert consultants</li>
                                    <li> <Check size={16} color="#009966" /> Expert consultants</li>
                                    <li> <Check size={16} color="#009966" /> Expert consultants</li>

                                </ul>

                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default ConsultingDetails;