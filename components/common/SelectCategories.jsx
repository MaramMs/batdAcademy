import styles from "@/sass/components/common/select-categories.module.scss";

const SelectCategories = ({ category }) => {
    return (
        <div className={styles.selectCategories}>
            <div className={styles.item}>
                <div className={styles.item__content}>
                    <label className={styles.checkbox}>
                        <input type="checkbox" />
                        <span className={styles.custom}></span>
                    </label>
                    <h1 className={styles.name}>{category.name}</h1>
                </div>
                <span>{category.count}</span>
            </div>
        </div>
    );
};

export default SelectCategories;