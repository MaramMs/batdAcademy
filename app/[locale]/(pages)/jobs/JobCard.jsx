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

const JobCard = ({ job = MOCK_JOB }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const handleApplyNow = () => {
    setIsDetailsOpen(false);
    setIsApplyOpen(true);
  };

  return (
    <div className={styles.jobCard}>
      <div className={styles.cardHeader}>
        <span className={styles.jobType}>{job.tags[0]}</span>
        <Bookmark color="#99A1AF" size={20} />
      </div>
      <div className={styles.jobTitle}>
        <span>{job.logoLetter}</span>
        <p>
          <h2>{job.title}</h2>
          <span className={styles.companyName}>{job.company}</span>
        </p>
      </div>
      <div className={styles.jobInfo}>
        <span>
          <MapPin />
          {job.location}
        </span>
        <span className={styles.salary}>
          <DollarSign color="#1E2749" />
          {job.salary}
        </span>
        <span>
          <Clock />
          {job.postedAgo}
        </span>
      </div>
      <div className={styles.jobSkills}>
        <Award size={16} color="#99A1AF" />
        <span>{job.experience}</span>
      </div>
      <button
        type="button"
        className={styles.viewBtn}
        onClick={() => setIsDetailsOpen(true)}
      >
        View Details <ArrowRight size={16} />
      </button>

      <ApplicationModal
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        contentClassName={modalStyles.jobDetailsModal}
      >
        <JobDetailsForm job={job} onApplyNow={handleApplyNow} />
      </ApplicationModal>

      <ApplicationModal open={isApplyOpen} onOpenChange={setIsApplyOpen}>
        <ApplyJobForm jobId={job.id} onClose={() => setIsApplyOpen(false)} />
      </ApplicationModal>
    </div>
  );
};

export default JobCard;
