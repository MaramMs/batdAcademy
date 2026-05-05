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

const BlogDetailsPage = () => {
    const { handleGetPostBySlug, post, isLoading } = usePostsStore();
    const { slug } = useParams();
    useEffect(() => {
        handleGetPostBySlug(slug);
    }, [slug]);

    console.log(post, 'post');
    return (

        <div className={styles.blogDetailsPage}>
            {
                isLoading ? (
                    <div className={styleContainer.container}>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', paddingTop: '24px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: 0 }}>
                                <Skeleton type="card" height="180px" />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <Skeleton type="text" count={3} />
                                    <Skeleton type="text" width="65%" />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: 0 }}>
                                <Skeleton type="title" width="65%" />
                                <Skeleton type="card" height="260px" />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <Skeleton type="text" count={4} />
                                    <Skeleton type="text" width="70%" />
                                </div>
                                <Skeleton type="title" width="45%" />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <Skeleton type="text" count={5} />
                                    <Skeleton type="text" width="75%" />
                                </div>
                            </div>

                        </div>
                    </div>
                ) : (
                    <>
                        <Header post={post} />
                        <div className={styleContainer.container}>
                            <div className={styles.content}>
                                <ArticleParts post={post} />
                                <MainContent post={post} />

                            </div>
                        </div>
                    </>
                )
            }

        </div>


    );
};

export default BlogDetailsPage;