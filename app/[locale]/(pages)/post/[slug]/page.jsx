import ArticleParts from "./ArticleParts";
import Header from "./Header";
import MainContent from "./MainContent";
import styleContainer from "@/sass/components/common/container.module.scss";
import styles from "@/sass/pages/blog/blog-details.module.scss";

const BlogDetailsPage = ({ params }) => {
      const { locale, slug } = params;
    return (
        <div className={styles.blogDetailsPage}>

            <Header />
``
            <div className={styleContainer.container}>
                <div className={styles.content}>
                    <ArticleParts />
                    <MainContent />
                </div>


            </div>

        </div>
    );
};

export default BlogDetailsPage;