const CategoriesBox = ({ title, icon, children, as: Tag = "h3" }) => {
    return (
        <section className={styles.categoriesBox}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    {icon && <span className={styles.icon}>{icon}</span>}
                    <Tag className={styles.titleText}>{title}</Tag>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </section>
    );
};