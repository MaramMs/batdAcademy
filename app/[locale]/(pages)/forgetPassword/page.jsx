import ForgetPasswordForm from "./ForgetPasswordForm";
import InfoPanel from "./InfoPanel";
import styles from "@/sass/pages/sign-In/login.module.scss";

const ForgetPasswordPage = () => {
    return (
        <section className={styles.loginPage}>
            <div className={styles.grid}>
                <div className={styles.formSide}>
                    <ForgetPasswordForm />
                </div>
                <div className={styles.panelSide}>
                    <InfoPanel />
                </div>
            </div>
        </section>
    );
};

export default ForgetPasswordPage;
