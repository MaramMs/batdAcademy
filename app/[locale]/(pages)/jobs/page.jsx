import Header from "./Header";
import Filter from "./Filter";
import JobCard from "./JobCard";
import styles from "@/sass/pages/jobs/jobs.module.scss";
import stylesContainer from "@/sass/components/common/container.module.scss";
import { SITE_URL, buildAlternates } from "@/lib/seoMeta";

export async function generateMetadata({ params }) {
    const { locale } = await params;
    return {
        metadataBase: new URL(SITE_URL),
        title: "Careers",
        description: "Explore job opportunities at the British Academy for Training & Development and find a job that suits your interest & skills.",
        alternates: { canonical: `/${locale}/jobs`, ...buildAlternates("/jobs") },
    };
}

const JobsPage = () => {
  return (
    <div className={styles.jobs}>
      <Header />
      <div className={styles.mainContent}>
      <Filter />
<div className={stylesContainer.container}>
  <div className={styles.jobsCards}>
        <JobCard />
        <JobCard />
         <JobCard />
        <JobCard />
         <JobCard />
        <JobCard />

      </div>
</div>
    

      </div>
    </div>
  );
};

export default JobsPage;