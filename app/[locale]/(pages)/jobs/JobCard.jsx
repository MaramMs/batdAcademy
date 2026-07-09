"use client";

import ApplicationModal from "@/components/common/ApplicationModal";
import styles from "@/sass/pages/jobs/jobs.module.scss";
import modalStyles from "@/sass/pages/jobs/job-details-modal.module.scss";
import {
  ArrowRight,
  Award,
  Bookmark,
  Clock,
  DollarSign,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import ApplyJobForm from "./ApplyJobForm";
import JobDetailsForm from "./JobDetailsForm";
import { MOCK_JOB } from "./jobData";
import { useTranslations } from "next-intl";

const JobCard = ({ job = MOCK_JOB }) => {
  const t = useTranslations('Jobs');
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const handleApplyNow = () => {
    setIsDetailsOpen(false);
    setIsApplyOpen(true);
  };

  return (
    <div className={styles.jobCard}>
      <div className={styles.cardHeader}>
        <span className={styles.jobType}>{job?.type}</span>
        <Bookmark color="#99A1AF" size={20} />
      </div>
      <div className={styles.jobTitle}>
        {/* <span>{job.logoLetter}</span> */}
        <p>
          <h2>{job.name}</h2>
          <span className={styles.companyName}>{job?.company?.name}</span>
        </p>
      </div>
      <div className={styles.jobInfo}>
        {job?.country && (
          job?.city && (
            <span>
              <MapPin />
            {job?.country} - {job?.city}
            </span>
          )
        )}
        
        
        <span className={styles.salary}>
          <DollarSign color="#1E2749" />
          {job?.salary_min} - {job?.salary_max}
        </span>
        {/* <span>
          <Clock />
          {job.postedAgo}
        </span> */}
      </div>
      {
        job?.experience_years && (
          <div className={styles.jobSkills}>
            <Award size={16} color="#99A1AF" />
            <span>{job?.experience_years}</span>
          </div>
        )
      }
      <button
        type="button"
        className={styles.viewBtn}
        onClick={() => setIsDetailsOpen(true)}
      >
        {t('viewDetails')} <ArrowRight size={16} />
      </button>

      <ApplicationModal
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        contentClassName={modalStyles.jobDetailsModal}
      >
        <JobDetailsForm slug={job?.slug} onApplyNow={handleApplyNow} />
      </ApplicationModal>

      <ApplicationModal open={isApplyOpen} onOpenChange={setIsApplyOpen}>
        <ApplyJobForm
          jobId={job.id}
          jobName={job.name}
          companyName={job?.company?.name}
          onClose={() => setIsApplyOpen(false)}
        />
      </ApplicationModal>
    </div>
  );
};

export default JobCard;
