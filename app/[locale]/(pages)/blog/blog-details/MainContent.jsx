import LatestArticlesCard from "../LatestArticlesCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import style from "@/sass/pages/blog/blog-details.module.scss";
import Reactions from "./Reactions";
const articles = [
    {
        id: 1,
        image: "/asstes/last.jpg",
        type: 'article',
        title: "The Future of AI in Education",
        description: "Artificial intelligence is revolutionizing the way we learn and teach. From personalized learning paths to automated grading, AI is transforming the educational landscape.",
        date: "2022-01-01",
        author: "John Doe",
        // authorImage:"/images/blog/latest-articles/1.png",
        authorDescription: "John Doe is a writer and educator with over 10 years of experience in the field of education.",
        authorSocial: {
            twitter: "@johndoe",
            linkedin: "@johndoe",
            instagram: "@johndoe",
        },
        authorSocialLinks: {
            twitter: "https://twitter.com/johndoe",
            linkedin: "https://linkedin.com/johndoe",
            instagram: "https://instagram.com/johndoe",
        },
        authorSocialLinks: {
            twitter: "https://twitter.com/johndoe",
            linkedin: "https://linkedin.com/johndoe",
            instagram: "https://instagram.com/johndoe",
        },
    }
    ,
    {
        id: 2,
        image: "/asstes/last.jpg",
        type: 'media',
        title: "The Future of AI in Education",
        description: "Artificial intelligence is revolutionizing the way we learn and teach. From personalized learning paths to automated grading, AI is transforming the educational landscape.",
        date: "2022-01-01",
        author: "John Doe",
        // authorImage:"/images/blog/latest-articles/1.png",
        authorDescription: "John Doe is a writer and educator with over 10 years of experience in the field of education.",
        authorSocial: {
            twitter: "@johndoe",
            linkedin: "@johndoe",
            instagram: "@johndoe",
        },
        authorSocialLinks: {
            twitter: "https://twitter.com/johndoe",
            linkedin: "https://linkedin.com/johndoe",
            instagram: "https://instagram.com/johndoe",
        },
        authorSocialLinks: {
            twitter: "https://twitter.com/johndoe",
            linkedin: "https://linkedin.com/johndoe",
            instagram: "https://instagram.com/johndoe",
        },
    },
    {
        id: 3,
        image: "/asstes/last.jpg",
        type: 'video',
        title: "The Future of AI in Education",
        description: "Artificial intelligence is revolutionizing the way we learn and teach. From personalized learning paths to automated grading, AI is transforming the educational landscape.",
        date: "2022-01-01",
        author: "John Doe",
        // authorImage:"/images/blog/latest-articles/1.png",
        authorDescription: "John Doe is a writer and educator with over 10 years of experience in the field of education.",
        authorSocial: {
            twitter: "@johndoe",
            linkedin: "@johndoe",
            instagram: "@johndoe",
        },
        authorSocialLinks: {
            twitter: "https://twitter.com/johndoe",
            linkedin: "https://linkedin.com/johndoe",
            instagram: "https://instagram.com/johndoe",
        },
        authorSocialLinks: {
            twitter: "https://twitter.com/johndoe",
            linkedin: "https://linkedin.com/johndoe",
            instagram: "https://instagram.com/johndoe",
        },
    },
  
   
]
const MainContent = () => {
    return (
        <div className={style.mainContent}>
               <Reactions />
            <div className={style.content}>
                Swift UI represents a paradigm shift in how we build user interfaces for Apple platforms. Introduced at WWDC 2019, this declarative framework has transformed the iOS development landscape,
                offering developers a more intuitive and efficient way to create stunning applications.
            </div>
            <div className={style.relatedArticles}>
                <h2 className={style.relatedArticlesTitle}>Similar Blog</h2>
                <div className={style.relatedArticlesContent}>
                    {
                        articles.map((article) => (
                            <LatestArticlesCard key={article.id} article={article} />
                        ))
                    }
                    
                  

                </div>

                  <Link href="/blog" className={style.viewMore}>
                        View More <ArrowRight />
                    </Link>

            </div>
        </div>
    );
};

export default MainContent;