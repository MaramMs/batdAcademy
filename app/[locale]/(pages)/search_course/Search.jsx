import styles from "@/sass/pages/search-course/search.module.scss";
import { Search } from "lucide-react";

const SearchCourse = () => {
    return (
        <section className={styles.search}>
            <div className={styles.searchContent}>
                <div className={styles.searchContent__left}>
                    <div className={styles.searchContent__left__icon}>
                        <Search size={13} color="#99A1AF" />

                    </div>
                    <input type="text" placeholder="Search in specific course..." className={styles.input} />
                </div>
                <div className={styles.searchContent__right}>
                    <button>Search</button>
                </div>
            </div>

        </section>
    );
};

export default SearchCourse;