import styles from "@/sass/pages/blog/latest-articles.module.scss";
import LatestArticlesCard from "./LatestArticlesCard";
import { ArrowRight } from "lucide-react";


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
        slug: "institutional-partnerships-in-resource-protection"
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
    {
        id: 4,
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
    {
        id: 5,
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
    {
        id: 6,
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
    }
]
const LatestArticles = ({ view }) => {
    return (
        <div className={styles.latestArticles}>
            <h2>Latest Articles</h2>
            <div className={`${styles.cards} ${styles[view]}`}>
                {
                    articles.map((article) => (
                        <LatestArticlesCard key={article.id} article={article} view={view} />
                    ))
                }
            </div>

            <button className={styles.viewMore}>
                view More <ArrowRight />
            </button>
        </div>
    );
};

export default LatestArticles;