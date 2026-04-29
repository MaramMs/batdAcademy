import styles from "@/sass/pages/course-details-by-city/navgation-bar.module.scss";
import stylesContainer from "@/sass/components/common/container.module.scss";
import { ArrowLeft, ArrowRight, House } from "lucide-react";
const NavgationBar = () => {
    return (
        <section className={styles.navgationBar}>
       <div className={stylesContainer.container}>
        <div className={styles.wrapper}>
                     <div className={styles.breadcrumb}>
                <ArrowLeft color='#2F327D' size={20}/>
                <span>Back to Courses</span>
            </div>
            <span>|</span>
            <House color='#4A5565' size={20} />
            <ArrowRight color='#4A5565' size={20} />
            <span>Courses</span>
            <ArrowRight color='#4A5565' size={20} />  
            <span>Request a course</span>
        </div>

       </div>
        </section>
    );
};
export default NavgationBar;