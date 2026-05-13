import styles from '@/sass/pages/privacy/privacy.module.scss';

const PrivacyHeader = () => {
    return (
        <div className={styles.header}>
            <div className="container">
                <h1>Privacy Policy</h1>
                <p>We value your privacy and are committed to protecting your personal data.</p>
            </div>
        </div>
    );
};

export default PrivacyHeader;
