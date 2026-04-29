import { Award, Calendar, Download, ImageIcon } from "lucide-react";
import styles from "@/sass/pages/my-profile/my-profile.module.scss";

const certificates = [
    {
        id: 1,
        title: "Digital Marketing Masterclass",
        issuedDate: "2024-12-20",
        certId: "BA-DM-2024-001234",
        image: null,
    },
];

const Certificates = () => {
    return (
        <div>
            <div className={styles.certHeader}>
                <h2>My Certificates</h2>
                <div className={styles.certCount}>
                    <Award size={14} />
                    <span>{certificates.length} Certificate(s) Earned</span>
                </div>
            </div>

            {certificates.length === 0 ? (
                <div className={styles.noCerts}>
                    <Award size={40} />
                    <p>No certificates earned yet</p>
                </div>
            ) : (
                <div className={styles.certGrid}>
                    {certificates.map((cert) => (
                        <div key={cert.id} className={styles.certCard}>
                            <div className={styles.certImageArea}>
                                {cert.image ? (
                                    <img src={cert.image} alt={cert.title} />
                                ) : (
                                    <div className={styles.certImagePlaceholder}>
                                        <ImageIcon size={40} color="#ffffff" />
                                    </div>
                                )}
                                <div className={styles.certBadge}>
                                    <Award size={18} />
                                </div>
                            </div>

                            <div className={styles.certContent}>
                                <h3 className={styles.certTitle}>{cert.title}</h3>

                                <div className={styles.certMeta}>
                                    <span className={styles.certMetaItem}>
                                        <Calendar size={12} />
                                        Issued: {cert.issuedDate}
                                    </span>
                                </div>

                                <p className={styles.certId}>{cert.certId}</p>

                                <button className={styles.downloadBtn}>
                                    <Download size={14} />
                                    Download Certificate
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Certificates;
