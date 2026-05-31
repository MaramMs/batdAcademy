import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "@/sass/pages/jobs/applly-job-form.module.scss";
import { Award, Briefcase, ChevronDown, Clock, FileText, Globe, GraduationCap, Mail, Phone, Upload, User } from "lucide-react";
import DropdownMenuCustom from "@/components/common/DropdownMenu";

 
const ApplyJobForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentPosition: "",
    yearsExperience: "",
    highestDegree: "",
    university: "",
    graduationYear: "",
    coverLetter: "",
    linkedin: "",
    portfolio: "",
    availability: "",
    expectedSalary: "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
 
  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
 
  const handleSubmit = () => {
    onClose?.();
  };
 
  return (
    <>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <Dialog.Title className={styles.title}>
          Apply for Software Engineer
          </Dialog.Title>
          <Dialog.Description className={styles.company}>
            Google Inc.
          </Dialog.Description>
        </div>
        <Dialog.Close asChild>
          <button className={styles.closeBtn} aria-label="Close">✕</button>
        </Dialog.Close>
      </div>
 
      {/* Scrollable body */}
      <div className={styles.body}>
 
        {/* Personal Information */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.icon}><User size={20} color="#1E2749"/></span> Personal Information
          </h3>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label className={styles.label}>Full Name <span className={styles.req}>*</span></label>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}> <User size={16} color="#99A1AF"/></span>
                <input className={styles.input} name="fullName" value={formData.fullName}
                  onChange={handleChange} placeholder="Enter your full name" />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Email <span className={styles.req}>*</span></label>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}> <Mail size={16} color="#99A1AF"/> </span>
                <input className={styles.input} name="email" type="email" value={formData.email}
                  onChange={handleChange} placeholder="your.email@example.com" />
              </div>
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Phone Number <span className={styles.req}>*</span></label>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}><Phone size={16} color="#99A1AF"/></span>
              <input className={styles.input} name="phone" value={formData.phone}
                onChange={handleChange} placeholder="+1 (555) 000-0000" />
            </div>
          </div>
       
        </section>


 
        {/* Professional Information */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.icon}> <Briefcase  size={16} color="#1E2749"/></span> Professional Information
          </h3>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label className={styles.label}>Current Position</label>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}> <Briefcase size={16} color="#99A1AF"/></span>
                <input className={styles.input} name="currentPosition" value={formData.currentPosition}
                  onChange={handleChange} placeholder="e.g. Senior Developer" />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Years of Experience <span className={styles.req}>*</span></label>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}><Award size={16} color="#99A1AF"/></span>
                <input className={styles.input} name="yearsExperience" value={formData.yearsExperience}
                  onChange={handleChange} placeholder="e.g. 5 years" />
              </div>
            </div>
          </div>
        </section>
  
        {/* Education */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.icon}> <GraduationCap size={20} color="#1E2749" /></span> Education
          </h3>
          <div className={styles.grid3}>
            <div className={styles.field}>
              <label className={styles.label}>Highest Degree</label>
              <input className={`${styles.input} ${styles.inputNoPad}`} name="highestDegree"
                value={formData.highestDegree} onChange={handleChange} placeholder="Academic degree" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>University / College</label>
              <input className={`${styles.input} ${styles.inputNoPad}`} name="university"
                value={formData.university} onChange={handleChange} placeholder="University name" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Graduation Year</label>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}>📅</span>
                <input className={styles.input} name="graduationYear" value={formData.graduationYear}
                  onChange={handleChange} placeholder="e.g. 2020" />
              </div>
            </div>
          </div>
        </section>
 
        {/* File Uploads */}
        <section className={styles.section}>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label className={styles.label}><span className={styles.fileIcon}> <FileText size={16} color="#1E2749"/></span> Personal Photo</label>
              <label className={styles.uploadBox}>
                <input type="file" accept=".pdf,.doc,.docx,image/*" className={styles.hiddenInput}
                  onChange={(e) => setPhotoFile(e.target.files[0])} />
                <span className={styles.uploadIcon}><Upload color="#99A1AF" size={24}/></span>
             <div className={styles.upload}>
             <span className={styles.uploadText}>{photoFile ? photoFile.name : "Click to upload your photo"}</span>
             <span className={styles.uploadHint}>PDF, DOC, DOCX (Max 5MB)</span>
             </div>
              </label>
            </div>
            <div className={styles.field}>
              <label className={styles.label}><span className={styles.fileIcon}> <FileText size={16} color="#1E2749"/></span> Resume / CV</label>
              <label className={styles.uploadBox}>
                <input type="file" accept=".pdf,.doc,.docx" className={styles.hiddenInput}
                  onChange={(e) => setResumeFile(e.target.files[0])} />
                <span className={styles.uploadIcon}><Upload color="#99A1AF" size={24}/></span>
               <div className={styles.upload}>
               <span className={styles.uploadText}>{resumeFile ? resumeFile.name : "Click to upload your resume"}</span>
               <span className={styles.uploadHint}>PDF, DOC, DOCX (Max 5MB)</span>
               </div>
              </label>
            </div>
          </div>
        </section>
 
        {/* Cover Letter */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.icon}> <FileText size={16} color="#1E2749"/></span> Cover Letter
          </h3>
          <textarea className={styles.textarea} name="coverLetter" value={formData.coverLetter}
            onChange={handleChange} rows={5}
            placeholder="Write a brief cover letter explaining why you're a great fit for this position..." />
        </section>
 
        {/* Professional Links */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.icon}><Globe size={16} color="#1E2749"/></span> Professional Links
          </h3>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label className={styles.label}>LinkedIn Profile</label>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}>in</span>
                <input className={styles.input} name="linkedin" value={formData.linkedin}
                  onChange={handleChange} placeholder="https://linkedin.com/in/yourprofile" />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Portfolio Website</label>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}><Globe size={16} color="#1E2749"/></span>
                <input className={styles.input} name="portfolio" value={formData.portfolio}
                  onChange={handleChange} placeholder="https://yourportfolio.com" />
              </div>
            </div>
          </div>
        </section>
 
        {/* Additional Information */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.icon}> <Clock size={16} color="#1E2749"/> </span> Additional Information
          </h3>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label className={styles.label}>Availability <span className={styles.req}>*</span></label>
              <select className={styles.select} name="availability" value={formData.availability} onChange={handleChange}>
                <option value="">Select Availability</option>
                <option>Immediately</option>
                <option>2 weeks notice</option>
                <option>1 month notice</option>
                <option>More than 1 month</option>
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Expected Salary</label>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}>$</span>
                <input className={styles.input} name="expectedSalary" value={formData.expectedSalary}
                  onChange={handleChange} placeholder="e.g. $50,000 – $60,000" />
              </div>
            </div>
          </div>
        </section>
      </div>
 
      {/* Footer */}
      <div className={styles.footer}>
        <button className={styles.submitBtn} onClick={handleSubmit}>
          Submit Application →
        </button>
      </div>
    </>
  );
}


export default ApplyJobForm