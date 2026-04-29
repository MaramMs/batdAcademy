import RegisterForm from "./RegisterForm";
import InfoPanel from "./InfoPanel";
import styles from "@/sass/pages/sign-up/register.module.scss";

const RegisterPage = () => {
    return (
        <section className={styles.registerPage}>
            <div className={styles.grid}>
                <div className={styles.formSide}>
                    <RegisterForm />
                </div>
                <div className={styles.panelSide}>
                    <InfoPanel />
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;
