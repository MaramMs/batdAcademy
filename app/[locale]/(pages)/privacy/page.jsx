import styles from '@/sass/pages/privacy/privacy.module.scss';
import PrivacyHeader from './PrivacyHeader';
import styleContainer from "@/sass/components/common/container.module.scss";

const PrivacyPage = () => {
    return (
        <div className={styles.privacyPage}>
            <PrivacyHeader />
            <div className={styles.contentWrapper}>
                <div className={styleContainer.container}>
                    <div className={styles.card}>
                        <div className={styles.privacyContent}>
                            <h2>Introduction</h2>
                            <p>
                                Welcome to the British Academy for Training and Development. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                            </p>

                            <h2>Information We Collect</h2>
                            <p>
                                We may collect information about you in a variety of ways. The information we may collect on the Site includes:
                            </p>
                            <ul>
                                <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number.</li>
                                <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times.</li>
                                <li><strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g. valid credit card number, card brand, expiration date).</li>
                            </ul>

                            <h2>How We Use Your Information</h2>
                            <p>
                                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
                            </p>
                            <ul>
                                <li>Create and manage your account.</li>
                                <li>Process your payments and refunds.</li>
                                <li>Email you regarding your account or order.</li>
                                <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
                            </ul>

                            <h2>Security of Your Information</h2>
                            <p>
                                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
                            </p>

                            <div className={styles.lastUpdated}>
                                Last updated: May 13, 2026
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;