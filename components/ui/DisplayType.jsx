import styles from "@/sass/components/ui/display-type.module.scss";
import { Grid3x3, List } from "lucide-react";
const DisplayType = ({view,onChange}) => {
    console.log(view ,'view in the display type')
    return (
        <div className={styles.displayType}>
            <button className={`${styles.btn} ${view === "grid" ? styles.active : ""}`} onClick={() => onChange("grid")}>
                <Grid3x3 className={styles.icon} />
            </button>
            <button className={`${styles.btn} ${view === "list" ? styles.active : ""}`} onClick={() => onChange("list")}>
                <List className={styles.icon} />
            </button>

        </div>
    );
};

export default DisplayType;