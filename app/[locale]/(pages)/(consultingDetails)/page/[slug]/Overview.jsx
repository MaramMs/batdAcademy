import styles from "@/sass/pages/consulting/consulting-details/overview.module.scss";
import { Check, CircleCheck } from "lucide-react";

const Overview = () => {
    return (
        <div className={styles.overview}>
            <div className={styles.top}>
                <h3>Overview</h3>
                <p>Our Strategic Planning & Development consultation helps organizations create clear, actionable strategies aligned with their vision and goals. We work with leadership teams to analyze market dynamics, identify opportunities, and develop comprehensive strategic plans that drive sustainable growth.</p>

            </div>

            <div className={styles.bottom}>
                <h3>What's Included</h3>
                <ul>
                    <li>
                        <span> <Check size={12} /></span>
                        Market analysis and competitive positioning
                    </li>

                    <li>
                        <span> <Check size={12} /></span>
                        Market analysis and competitive positioning
                    </li>
                    <li>
                        <span> <Check size={12} /></span>
                        Market analysis and competitive positioning
                    </li>
                    <li>
                        <span> <Check size={12} /></span>
                        Market analysis and competitive positioning
                    </li>
                </ul>
            </div>

        </div>
    );
};

export default Overview;