import Header from "./Header";
import PlanCard from "./PlanCard";

import stylesContainer from "@/sass/components/common/container.module.scss";
import styles from "@/sass/pages/year-plan/year-plan.module.scss";
const YearPlan = () => {
    return (
        <div className={styles.main}>
            <Header />

            <div className={styles.mainContent}>
                <div className={stylesContainer.container}>
                    <div className={styles.wrapper}>
                        <PlanCard />
                        <PlanCard />
                        <PlanCard />
                        <PlanCard />
                    </div>

                    <button className={styles.showMore}>
                        Show More
                    </button>

                </div>
            </div>
        </div>
    );
};
export default YearPlan;