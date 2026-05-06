import { ChevronRight } from "lucide-react"
import styles from "@/sass/pages/search-course/search-course.module.scss"

const Category = ({ category, onClick, active }) => {
    return (
        <li
            className={`${styles.categoryItem} ${active ? styles.active : ''}`}
            onClick={onClick}
        >
            <span>{category.name}</span>
            <div className={styles.badgeWrapper} >
                <span className={styles.badge}>{category?.courses_count}</span>
                <ChevronRight size={12} />
            </div>
        </li>
    )
}

export default Category