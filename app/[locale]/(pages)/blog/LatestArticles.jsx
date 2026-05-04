import { useState, useEffect } from "react";
import usePostsStore from "@/store/usePostsStore";
import { ArrowRight } from "lucide-react";
import LatestArticlesCard from "./LatestArticlesCard";
import styles from "@/sass/pages/blog/latest-articles.module.scss";

const LatestArticles = ({ view, posts }) => {
    const { handleGetPosts } = usePostsStore();
    const [visibleCount, setVisibleCount] = useState(6);

    const firstPostId = posts?.posts?.[0]?.id;

    // Reset visible count ONLY if the first post changes (e.g. category filter applied), 
    // NOT when we append new posts to the bottom.
    useEffect(() => {
        setVisibleCount(6);
    }, [firstPostId]);

    const handleViewMore = () => {
        if (posts?.posts && visibleCount < posts.posts.length) {
            setVisibleCount(prev => prev + 6);
        } else if (posts?.has_more) {
            setVisibleCount(prev => prev + 6); // Increase count to reveal the newly fetched ones
            const params = new URLSearchParams(window.location.search);
            params.set('cursor', posts.next_cursor);
            handleGetPosts(`?${params.toString()}`, true);
        }
    };

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