'use client'
import { useEffect } from "react";
import ArticleParts from "./ArticleParts";
import Header from "./Header";
import MainContent from "./MainContent";
import styleContainer from "@/sass/components/common/container.module.scss";
import styles from "@/sass/pages/blog/blog-details.module.scss";
import usePostsStore from "@/store/usePostsStore";
import { useParams } from "next/navigation";

const BlogDetailsPage = () => {
    const { handleGetPostBySlug, post } = usePostsStore();
    const { slug } = useParams();
    useEffect(() => {
        handleGetPostBySlug(slug);
    }, [slug]);

    console.log(post, 'post');
    return (
        <div className={styles.blogDetailsPage}>

            <Header post={post}/>

            <div className={styleContainer.container}>
                <div className={styles.content}>
                    <ArticleParts />
                    <MainContent post={post}/>
                </div>


            </div>

        </div>
    );
};

export default BlogDetailsPage;