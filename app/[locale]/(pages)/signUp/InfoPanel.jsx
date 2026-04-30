import { GraduationCap, CheckCircle2, CircleCheckBig } from "lucide-react";
import styles from "@/sass/pages/sign-up/register.module.scss";

const features = [
    {
        title: "Instant Access",
        description: "Get immediate access to all course materials upon registration",
    },
    {
        title: "Personalized Dashboard",
        description: "Track your progress and manage your learning path",
    },
    {
        title: "Community Support",
        description: "Connect with peers and instructors in our learning community",
    },
    {
        title: "Career Advancement",
        description: "Gain skills and certifications valued by employers worldwide",
    },
];

const InfoPanel = () => {
    return (
        <div className={styles.infoPanel}>
            <div className={styles.infoPanelInner}>
                <div className={styles.capIcon}>
                    <GraduationCap size={24} color="#ffffff" />
                </div>

                <h2 className={styles.panelTitle}>Start Your Journey Today</h2>

                <p className={styles.panelDesc}>
                    Join thousands of professionals advancing their careers through our comprehensive training programs.
                </p>

                <ul className={styles.featureList}>
                    {features.map((f) => (
                        <li key={f.title} className={styles.featureItem}>
                            <CircleCheckBig size={20} className={styles.checkIcon} />
                            <div className={styles.featureText}>
                                <strong>{f.title}</strong>
                                <span>{f.description}</span>
                            </div>
                        </li>
                    ))}
                </ul>

                <p className={styles.trustText}>
                    Trusted by professionals from leading companies worldwide
                </p>
            </div>
        </div>
    );
};

export default InfoPanel;
