"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reactions from "./Reactions";
import LatestArticlesCard from "../../blog/LatestArticlesCard";
import NoData from "@/components/common/NoData";
import style from "@/sass/pages/blog/blog-details.module.scss";
import useLanguageStore from "@/store/useLanguageStore";

const MainContent = ({ post }) => {
    const locale = useLanguageStore((state) => state.locale);
    return (
        <div className={style.mainContent}>

{/* className={style.content}  */}
            <Reactions />
            <div className={style.content}  dangerouslySetInnerHTML={{ __html: post?.content }}></div>
            <div className={style.relatedArticles}>
                <h2 className={style.relatedArticlesTitle}>Similar Blog</h2>
                <div className={style.relatedArticlesContent}>
                    {
                        post?.related_posts?.length > 0 ? (
                            post?.related_posts?.map((article) => (
                                <LatestArticlesCard key={article.id} article={article} />
                            ))
                        ) :
                            <NoData message="No similar posts" />
                    }



                </div>

                {
                    post?.related_posts?.length > 0 ? (
                        <Link href={`/${locale}/blog`} className={style.viewMore}>
                            View More <ArrowRight />
                        </Link>
                    )
                        : (
                            null
                        )
                }

            </div>



        </div>
    );
};

export default MainContent;