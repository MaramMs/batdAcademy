import Header from "./Header";
import ContactForm from "./ContactForm";
import OurOffices from "./OurOffices";
import styles from "@/sass/pages/contact/contact.module.scss";
import container from "@/sass/components/common/container.module.scss";

const ContactPage = () => {
    return (
        <section className={styles.contact}>
            <Header />
            <div className={styles.mainContent}>
                <div className={container.container}>
                    <div className={styles.grid}>
                        <ContactForm />
                        <OurOffices />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;
