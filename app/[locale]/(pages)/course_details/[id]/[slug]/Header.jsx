import { ArrowLeft, ArrowRight, House } from "lucide-react"
import styles from "@/sass/pages/course-details/header.module.scss"
import stylesContainer from "@/sass/components/common/container.module.scss"

const Header = () => {
    return (
        <section className={styles.header}>
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
            <span>Course Details</span>
        </div>

       </div>
        </section>
    )
}

export default Header