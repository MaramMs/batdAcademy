'use client'
import { useEffect } from "react";
import ArticleParts from "./ArticleParts";
import Header from "./Header";
import MainContent from "./MainContent";
import styleContainer from "@/sass/components/common/container.module.scss";
import styles from "@/sass/pages/blog/blog-details.module.scss";
import usePostsStore from "@/store/usePostsStore";
import { useParams } from "next/navigation";
import Skeleton from "@/components/ui/Skeleton";

const BlogDetails = () => {
    const { handleGetPostBySlug, post, isLoading } = usePostsStore();
    const { slug } = useParams();
    useEffect(() => {
        handleGetPostBySlug(slug);
    }, [slug]);

    return (

        <div className={styles.blogDetailsPage}>
            {
                isLoading ? (
                    <div className={styleContainer.container}>
                        <div className={styles.content}>
                            {
                                ['1', '2'].map(() => (<Skeleton type="Card" height='100vh' />))
                            }
                        </div>
                    </div>
                ) : (
                    <>
                        <Header post={post} />
                        <div className={styleContainer.container}>
                            <div className={styles.content}>
                                <ArticleParts post={post}/>
                                <MainContent post={post} />

                            </div>
                        </div>
                    </>
                )
            }

        </div>


    );
};

export default BlogDetails;