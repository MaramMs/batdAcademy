import { ArrowRight, Calendar, ClipboardPlus, Clock, Eye, Heart, Share2, Star, TrendingUp } from "lucide-react";
import styles from "@/sass/pages/blog/featured-article.module.scss";
import featured from "@/public/asstes/featured.jpg"
import Image from "next/image";

const FeaturedArticle = () => {
    return (
        <section className={styles.featuredArticle}>
            <h2> <Star fill="#C41E3A" size={18} color="#C41E3A" /> Featured Article</h2>
            <div className={styles.content}>
                <div className={styles.left}>
                    <Image src={featured} alt="" className={styles.image} />
                    <span> <TrendingUp fill="#00C950" size={12} color="#00C950" /> Trending</span>
                </div>
                <div className={styles.right}>
                    <span className={styles.featured}><Star fill="#fff" size={18} color="#fff" /> Featured</span>
                    <div className={styles.articleContent}>
                        <div className={styles.articleInfo}>
                            <div className={styles.articleType}>
                                <span className={styles.type}>Technology</span>
                                <div className={styles.date}>
                                    <span> <Calendar color="#6B7280" size={14} />  2 days ago</span>
                                    <span> <Clock color="#6B7280" size={14} /> 4 min read</span>
                                </div>

                            </div>
                            <h2>Why Swift UI Should Be on the Radar of Every Mobile Developer</h2>
                            <p>TOTC is a platform that allows educators to create online classes whereby they can store the course materials online; manTOTC is a platform that allows educators...</p>
                        </div>

                        <div className={styles.articleAuthor}>
                            <div className={styles.author}>
                                <h3>name</h3>
                                <span>Author</span>
                            </div>
                            <div className={styles.articleReaction}>
                                <span> <Eye color="#6B7280" size={14} /> 2.4k</span>
                                <span> <Heart color="#6B7280" size={14} /> 200</span>
                                <span> <Star color="#C41E3A" fill="#C41E3A" size={14} /> 100</span>
                            </div>
                        </div>

                        <div className={styles.articleActions}>
                            <button>Read Article <ArrowRight size={18} color="#fff" /></button>

                            <div className={styles.icons}>
                                <span><ClipboardPlus color="#364153" size={18} /></span>
                                <span><Share2 color="#364153" size={18} /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedArticle;