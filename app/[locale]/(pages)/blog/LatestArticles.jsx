import { useState, useEffect } from "react";
import usePostsStore from "@/store/usePostsStore";
import { ArrowRight } from "lucide-react";
import LatestArticlesCard from "./LatestArticlesCard";
import styles from "@/sass/pages/blog/latest-articles.module.scss";

const LatestArticles = ({ view, posts, visibleCount, handleViewMore }) => {
    return (
        <div className={styles.latestArticles}>
            <h2>Latest Articles</h2>
            <div className={`${styles.cards} ${styles[view]}`}>
                {
                    posts?.posts?.slice(0, visibleCount).map((article) => (
                        <LatestArticlesCard key={article.id} article={article} view={view} />
                    ))
                }
            </div>
            {
                (visibleCount < posts?.posts?.length || posts?.has_more) && (
                    <button className={styles.viewMore} onClick={handleViewMore}>
                        View More <ArrowRight />
                    </button>
                )
            }


        </div>
    );
};


export default LatestArticles;