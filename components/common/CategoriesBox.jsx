import styles from "@/sass/components/common/categories-box.module.scss";

const CategoriesBox = ({ title, icon, children }) => {
    return (
        <section className={styles.categoriesBox}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    {icon && <span className={styles.icon}>{icon}</span>}
                    <h3 className={styles.titleText}>{title}</h3>
                </div>

                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </section>
    );
};

export default CategoriesBox;