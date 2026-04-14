import Image from "next/image";
import styles from "@/sass/pages/blog/lastest-articles-card.module.scss";
import { ArrowRight, Clock, Eye, Heart, Star} from "lucide-react";
const LatestArticlesCard = ({article , view}) => {
    return (
        <div className={`${styles.card} ${styles[view]}`}>

            <div className={styles.image}>
                <Image src={article.image} alt={article.title} width={363} height={207} />
            </div>
            <div className={styles.content}>
                <div className={styles.articleInfo}>
                    <div className={styles.articleType}>
                        <div className={styles.type}>
                            {article.type}
                        </div>
                        <div className={styles.date}>
                             <Clock color="#6A7282" size={14} />
                            <span> {article.date}</span>
                        </div>
                    </div>
                    <h2>{article.title}</h2>
                    <p>{article.description}</p>
                </div>
             
                        <div className={styles.articleAuthor}>
                            <div className={styles.author}>
                                <h3>name</h3>
                                <span>Author</span>
                            </div>
                            <div className={styles.articleReaction}>
                                <span> <Eye color="#6B7280" size={14} /> 2.4k</span>
                                <span> <Heart color="#6B7280" size={14} /> 200</span>
                            </div>
                        </div>

                <button className={styles.readMore}>
                    Read More
                    <ArrowRight size={14} color="#fff" />
                </button>
            </div>
            
            
        </div>
    )
}

export default LatestArticlesCard