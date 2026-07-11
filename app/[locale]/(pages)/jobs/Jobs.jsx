'use client'

import Header from "./Header";
import Filter from "./Filter";
import JobCard from "./JobCard";
import styles from "@/sass/pages/jobs/jobs.module.scss";
import stylesContainer from "@/sass/components/common/container.module.scss";
import { useEffect } from "react";
import useJobsStore from "@/store/useJobsStore";
import Skeleton from "@/components/ui/Skeleton";

const Jobs = () =>{
    const {handleGetJobs , jobs ,isLoading} = useJobsStore();
    useEffect(() => {
      handleGetJobs();
    }, []);

    return (
          <div className={styles.jobs}>
      <Header />
      <div className={styles.mainContent}>
      <Filter />
<div className={stylesContainer.container}>
  <div className={styles.jobsCards}>
    {
        isLoading
          ? [1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} type="card" height="280px" />
            ))
          : jobs?.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
    }
      </div>
</div>


      </div>
    </div>
    )
}


export default Jobs