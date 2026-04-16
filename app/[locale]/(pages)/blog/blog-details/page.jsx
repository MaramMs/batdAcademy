import Header from "./Header";
import MainContent from "./MainContent";
import ArticleParts from "./ArticleParts";
import Reactions from "./Reactions";
import styles from "@/sass/pages/blog/blog-details.module.scss";
import styleContainer from "@/sass/components/common/container.module.scss";

const BlogDetailsPage = () => {
    return (
        <div className={styles.blogDetailsPage}>
         
<Header />

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