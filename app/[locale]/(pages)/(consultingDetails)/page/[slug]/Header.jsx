import container from "@/sass/components/common/container.module.scss";
import styles from "@/sass/pages/yean-plan/header.module.scss";
import { ChevronRight, House } from "lucide-react";

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={container.container}>
                <div className={styles.wrapper}>
                    <div className={styles.content}>
                        <h1>Strategic Planning & Development</h1>
                        <p>Comprehensive strategic planning services to help your business define goals and create actionable roadmaps</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;