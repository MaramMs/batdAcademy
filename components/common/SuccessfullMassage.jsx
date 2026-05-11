import styles from "@/sass/components/common/successfull-massage.module.scss";
import useLanguageStore from "@/store/useLanguageStore";
import { Check, House } from "lucide-react";
import Link from "next/link";

const SuccessfullMassage = ({ message, onClose }) => {
    const {locale} = useLanguageStore();
  return (
    <div className={styles.successfull}>
      <div className={styles.head}>
        <Check  size={24} />
      </div>
      <h3>Application Submitted Successfully!</h3>
      <p>Thank you for applying to Consulting Service. we will contact you soon.</p>
       <div className={styles.buttons}>
          <Link href={`/${locale}/`}
        className={styles.backToHome} 
        onClick={onClose}
      >
        <House size={14} />
        Back To Home 
      </Link>
      <button 
        className={styles.closeButton} 
        onClick={onClose}
      >
        Close
      </button>
       </div>
      
    </div>
  );
};

export default SuccessfullMassage;