import LoginForm from "./LoginForm";
import InfoPanel from "./InfoPanel";
import styles from "@/sass/pages/sign-In/login.module.scss";

const LoginPage = () => {
    return (
        <section className={styles.loginPage}>
            <div className={styles.grid}>
                <div className={styles.formSide}>
                    <LoginForm />
                </div>
                <div className={styles.panelSide}>
                    <InfoPanel />
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
