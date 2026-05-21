import styles from "@/sass/pages/fqa/header.module.scss";
import { ChevronRight, House } from "lucide-react";
import container from "@/sass/components/common/container.module.scss";

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={container.container}>
                <div className={styles.wrapper}>
                    <div className={styles.breadcrumb}>
                        <House aria-hidden="true" />
                        <ChevronRight aria-hidden="true" />
                        <span>FAQ</span>
                    </div>

                    <div className={styles.content}>
                        <h1>Frequently Asked Questions</h1>
                        <p>Find answers to common questions about our courses, programs, and services</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;