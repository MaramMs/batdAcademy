import { ChevronRight, House } from "lucide-react";
import container from "@/sass/components/common/container.module.scss";
import styles from "@/sass/pages/year-plan/header.module.scss";

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={container.container}>
                <div className={styles.wrapper}>
                    <div className={styles.breadcrumb}>
                        <House />
                        <ChevronRight />
                        <span>Year Plan</span>
                    </div>

                    <div className={styles.content}>
                        <h1>Strategic Plan Pages</h1>
                        <p>Comprehensive Planning for Future Development</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;