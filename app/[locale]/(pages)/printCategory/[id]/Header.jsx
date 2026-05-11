import { ChevronRight, House } from "lucide-react";
import container from "@/sass/components/common/container.module.scss";
import styles from "@/sass/pages/print-category/header.module.scss";

const Header = ({name, summary}) => {
    return (
        <div className={styles.header}>
            <div className={container.container}>
                <div className={styles.wrapper}>
                    <div className={styles.breadcrumb}>
                        <House />
                        <ChevronRight />
                        <span>{name}</span>
                    </div>
                    <div className={styles.content}>
                        <h1>Year Plans - {name}</h1>
                        <p dangerouslySetInnerHTML={{ __html: summary }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;