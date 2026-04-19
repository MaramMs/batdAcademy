import styles from "@/sass/pages/fqa/fqa.module.scss";
import Header from "./Header";
import SearchInput from "../../blog/Search";
import { ChevronDown, TrendingUp } from "lucide-react";
import According from "./according";

const FQA = () => {
    return (
        <section className={styles.fqa}>
            <Header />
          <div className={styles.mainContent}>
               <SearchInput />
               <div className={styles.faqContent}>
             <div className={styles.popularFQA}>
                   <div className={styles.header}>
                    <span><TrendingUp size={20} color="#FFFFFF"/></span>
                   <div className={styles.content}>
                
                     <h2>Popular Questions</h2>
                    <p>
                        Most frequently asked questions
                    </p>
                   </div>
                </div>


                <div className={styles.faqList}>
                    <According />
                    <According />
                    <According />
                    <According />

                </div>
             </div>


             <div className={styles.allFQA}>
                <div className={styles.header}>
                    <h2>Every Question Answered</h2>
                    <p>18 questions found</p>
                </div>

                <div className={styles.listFQA}>
                    <According variant="all"/>
                    <According variant="all"/>
                    <According variant="all"/>
                    <According variant="all"/>
                </div>

             </div>
                
               </div>
          </div>
        </section>
    );
};

export default FQA;