import { MapPin, Phone, Mail, Clock, Building2 } from "lucide-react";
import styles from "@/sass/pages/contact/offices.module.scss";

const offices = [
    {
        icon: MapPin,
        title: "Central London HQ",
        lines: [
            "Training Venue 1: 3&4, 3rd& Gra's Inn Road, London, England, WC1V 6BP",
            "Training Venue 2: Latimer House, 9 Latimer Street, London, NW1 0TQ",
            "Address 3: PD",
        ],
    },
    {
        icon: Phone,
        title: "Call Us",
        lines: [
            "WhatsApp (EN):  +44-2035827999",
            "WhatsApp (AR):  +44-2035827999",
            "UAE:  +971-26408503",
            "Fax:  +44-7724023446",
        ],
    },
    {
        icon: Mail,
        title: "Email Us",
        lines: ["info@batacademy.org.uk"],
    },
    {
        icon: Clock,
        title: "Working Hours",
        lines: [
            "Monday - Friday: 9:00 AM – 6:00 PM",
            "Saturday: 10:00 AM – 4:00 PM",
            "Sunday: Closed",
        ],
    },
];

const OurOffices = () => {
    return (
        <div className={styles.officesCard}>
            <div className={styles.officesHeader}>
                <div className={styles.iconBox}>
                    <Building2 size={22} color="#fff" />
                </div>
                <h2>Our Offices</h2>
            </div>

            <div className={styles.list}>
                {offices.map(({ icon: Icon, title, lines }, i) => (
                    <div key={i} className={styles.item}>
                        <div className={styles.itemIcon}>
                            <Icon size={18} />
                        </div>
                        <div className={styles.itemContent}>
                            <h3>{title}</h3>
                            {lines.map((line, j) => (
                                <p key={j}>{line}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OurOffices;
