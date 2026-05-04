import Image from "next/image";
import styles from "@/sass/pages/blog/lastest-articles-card.module.scss";
import { ArrowRight, Clock, Eye, Heart, Star } from "lucide-react";
import Link from "next/link";

// Temporary placeholder images
const placeholderImages = [
    "https://batdacademy.com/uploads/placeholder_image.webp",
    "/asstes/default-1.jpeg",
    "/asstes/course1.jpg",
];

const LatestArticlesCard = ({ article, view }) => {
    // Select a random image based on the article's ID or randomly. 
    // Using article.id (if available) ensures the image doesn't change on every re-render.
    const randomImageIndex = article?.id ? article.id % 3 : Math.floor(Math.random() * 3);
    const randomImage = placeholderImages[randomImageIndex];

    return (
        <div className={`${styles.card} ${styles[view]}`}>

            <div className={styles.image}>
                {/* Temporarily using randomImage instead of article.image */}
                <Image src={randomImage} alt={article.title} width={363} height={207} unoptimized />
            </div>
            <div className={styles.content}>
                <div className={styles.articleInfo}>
                    <div className={styles.articleType}>
                        <div className={styles.type}>
                            {article?.category?.name}
                        </div>
                        <div className={styles.date}>
                            <Clock color="#6A7282" size={14} />
                            <span> {article.publish_date}</span>
                        </div>
                    </div>
                    <h2>{article?.name}</h2>
                    <p>{article?.description}</p>
                </div>

                <div className={styles.articleAuthor}>
                    <div className={styles.author}>
                        <h3>{article?.author_name}</h3>
                        <span>Author</span>
                    </div>
                    <div className={styles.articleReaction}>
                        <span> <Eye color="#6B7280" size={14} /> 2.4k</span>
                        <span> <Heart color="#6B7280" size={14} /> 200</span>
                    </div>
                </div>

                <Link className={styles.readMore} href={`/en/post/${article.slug}`}>
                    Read More
                    <ArrowRight size={14} color="#fff" />
                </Link>
            </div>


        </div>
    )
}

export default LatestArticlesCard