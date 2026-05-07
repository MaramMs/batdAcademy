import styles from "@/sass/pages/course-details-by-city/navgation-bar.module.scss";
import stylesContainer from "@/sass/components/common/container.module.scss";
import { ArrowLeft, ArrowRight, House } from "lucide-react";
import Link from "next/link";
const NavgationBar = ({ breadcrumb }) => {
    console.log(breadcrumb, 'breadcrumb')
    return (
        <section className={styles.navgationBar}>
            <div className={stylesContainer.container}>
                <div className={styles.wrapper}>
                    <div className={styles.breadcrumb}>
                        <ArrowLeft color='#2F327D' size={20} />
                        <Link href={breadcrumb?.back_url || '/'}>{breadcrumb?.back_label}</Link>
                    </div>
                    <span>|</span>
                    <House color='#4A5565' size={20} />
                    {
                        breadcrumb?.items.map((item, index) => {
                            return (
                                <>
                                    <ArrowRight color='#4A5565' size={20} />
                                    <Link href={`${item?.slug}`} key={index}>{item?.label}</Link>
                                </>
                            )
                        })
                    }

                    {/* <ArrowRight color='#4A5565' size={20} />
            <span>Consultation</span>
            <ArrowRight color='#4A5565' size={20} />  
            <span>Strategic Planning & Development</span> */}
                </div>

            </div>
        </section>
    );
};
export default NavgationBar;