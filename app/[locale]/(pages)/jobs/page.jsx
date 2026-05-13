import Header from "./Header";
import Filter from "./Filter";
import JobCard from "./JobCard";
import styles from "@/sass/pages/jobs/jobs.module.scss";
import stylesContainer from "@/sass/components/common/container.module.scss";
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