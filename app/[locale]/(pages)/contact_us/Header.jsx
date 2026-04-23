import styles from "@/sass/pages/contact/header.module.scss";
import container from "@/sass/components/common/container.module.scss";
import { ChevronRight, House, HeadphonesIcon } from "lucide-react";
import Link from "next/link";

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={container.container}>
                <div className={styles.wrapper}>
                    <div className={styles.breadcrumb}>
                        <Link href="/"><House size={18} /></Link>
                        <ChevronRight size={16} />
                        <span>Contact Us</span>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.badge}>
                            <HeadphonesIcon size={16} />
                            <span>WE&apos;RE HERE TO HELP</span>
                        </div>
                        <h1>Get in Touch <br /> With Our Team</h1>
                        <p>Have questions about our courses or services? We&apos;re ready to help you. Fill out the form below and we&apos;ll respond immediately.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
