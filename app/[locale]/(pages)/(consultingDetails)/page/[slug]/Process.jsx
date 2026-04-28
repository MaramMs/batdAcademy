import styles from "@/sass/pages/consulting/consulting-details/process.module.scss";

const Process = () => {
    return (
        <div className={styles.process}>
            <h2>
                Our Process
            </h2>
            <div className={styles.content}>
                <div className={styles.item}>
                    <span>
                        1
                    </span>

                    <div className={styles.info}>
                        <h3>Initial Consultation</h3>
                        <p>We start with a comprehensive discussion to understand your needs, goals, and challenges.</p>

                    </div>

                </div>
                   <div className={styles.item}>
                    <span>
                        2
                    </span>

                    <div className={styles.info}>
                        <h3>Initial Consultation</h3>
                        <p>We start with a comprehensive discussion to understand your needs, goals, and challenges.</p>

                    </div>

                </div>
                   <div className={styles.item}>
                    <span>
                        3
                    </span>

                    <div className={styles.info}>
                        <h3>Initial Consultation</h3>
                        <p>We start with a comprehensive discussion to understand your needs, goals, and challenges.</p>

                    </div>

                </div>
                   <div className={styles.item}>
                    <span>
                        4
                    </span>

                    <div className={styles.info}>
                        <h3>Initial Consultation</h3>
                        <p>We start with a comprehensive discussion to understand your needs, goals, and challenges.</p>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default Process;