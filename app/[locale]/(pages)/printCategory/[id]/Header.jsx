import { ChevronRight, House } from "lucide-react";
import container from "@/sass/components/common/container.module.scss";
import styles from "@/sass/pages/print-category/header.module.scss";

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={container.container}>
                <div className={styles.wrapper}>
                    <div className={styles.breadcrumb}>
                        <House />
                        <ChevronRight />
                        <span>Management</span>
                    </div>
                    <div className={styles.content}>
                        <h1>Year Plans - Management</h1>
                        <p>The annual training plan for the courses and programs of the British Academy</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;