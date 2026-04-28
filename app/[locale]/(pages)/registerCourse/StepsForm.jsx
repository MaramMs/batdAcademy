import React, { useEffect } from 'react';
import { User, Mail, Phone, Briefcase, ArrowRight, Users, Plus, X, ChevronDown } from 'lucide-react';
import { useFieldArray, Controller } from 'react-hook-form';
import RegistrationTypeToggle from './RegistrationTypeToggle';
import styles from '@/sass/pages/register-course/steps-form.module.scss';
import DropdownMenuCustom from '@/components/common/DropdownMenu';

const StepsForm = ({ handleSubmit, onSubmit, errors, register, control, setRegType, regType }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "participants"
  });

  // Ensure at least one participant if company
  useEffect(() => {
    if (regType === 'company' && fields.length === 0) {
      append({ fullName: '', email: '', jobTitle: '', phone: '', mobile: '' });
    }
  }, [regType, fields.length, append]);
  return (
    <div className={styles.formContent}>
      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <h2>Personal Information</h2>
          <p className={styles.subtitle}>Tell us about yourself to get started</p>
        </div>
        <div className={styles.registrationTypeSection}>
          <div className={styles.sectionTitle}>
            <Users  color='#C9302C' size={20}/> Registration Type *
          </div>

          <RegistrationTypeToggle
            value={regType}
            onChange={setRegType}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>


          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label>Full Name <span>*</span></label>
              <div className={styles.inputWrapper}>
                <User />
                <input
                  type="text"
                  placeholder="John"
                  {...register("fullName", { required: true })}
                />
              </div>
              {errors.fullName && <span className={styles.errorText}>This field is required</span>}
            </div>

            <div className={styles.inputGroup}>
              <label>Email Address <span>*</span></label>
              <div className={styles.inputWrapper}>
                <Mail />
                <input
                  type="email"
                  placeholder="john.doe@example.com"
                  {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                />
              </div>
              {errors.email && <span className={styles.errorText}>Please enter a valid email</span>}
            </div>

            <div className={styles.inputGroup}>
              <label>Phone Number <span>*</span></label>
              <div className={styles.inputWrapper}>
                <Phone />
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  {...register("phone", { required: true })}
                />
              </div>
              {errors.phone && <span className={styles.errorText}>This field is required</span>}
            </div>

            <div className={styles.inputGroup}>
              <label>Country <span>*</span></label>
              <div className={styles.inputWrapper}>

             

                <Controller
                name="country"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <DropdownMenuCustom 
                      label="Select your country"
                      options={[
                        { value: "US", label: "United States" },
                        { value: "UK", label: "United Kingdom" },
                        { value: "CA", label: "Canada" },
                      ]}
                      value={field.value}
                      onChange={field.onChange}
                      icon={<ChevronDown size={14} />}
                    />
                  )}
                />
              </div>
              {errors.country && <span className={styles.errorText}>Please select a country</span>}
            </div>
          </div>

          {regType === 'individual' && (
            <div className={styles.optionalSection}>
              <h3>Professional Information (Optional)</h3>
              <div className={styles.optinals} >
                <div className={styles.inputGroup}>
                  <label>Company Name</label>
                  <div className={styles.inputWrapper}>
                    <Briefcase />
                    <input
                      type="text"
                      placeholder="Your Company"
                      {...register("companyName")}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>Job Title</label>
                  <div className={styles.inputWrapper}>
                    <Briefcase />
                    <input
                      type="text"
                      placeholder="Your Position"
                      {...register("jobTitle")}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {regType === 'company' && (
            <div className={styles.participantsSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.titleWithBadge}>
                  <div className={styles.sectionTitle}>
                    <Users color='#C9302C' size={20} /> Course Participants
                  </div>
                  <span className={styles.participantBadge}>{fields.length} Participant{fields.length !== 1 ? 's' : ''}</span>
                </div>
                <p className={styles.sectionSubtitle}>Add participants who will attend this course</p>
              </div>

              <div className={styles.participantsList}>
                {fields.map((field, index) => (
                  <div key={field.id} className={styles.participantCard}>
                    <div className={styles.participantCardHeader}>
                      <h4>Participant {index + 1}</h4>
                      <button 
                        type="button" 
                        onClick={() => remove(index)} 
                        className={styles.removeBtn}
                        disabled={fields.length === 1}
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div className={styles.participantFields}>
                      <div className={styles.inputGroup}>
                        <label>Full Name</label>
                        <div className={styles.inputWrapper}>
                          <input
                            type="text"
                            placeholder="nourakhalil@gmail.com"
                            {...register(`participants.${index}.fullName`)}
                          />
                        </div>
                      </div>

                      <div className={styles.fieldRow}>
                        <div className={styles.inputGroup}>
                          <label>Email Address</label>
                          <div className={styles.inputWrapper}>
                            <input
                              type="email"
                              placeholder="nour@company.com"
                              {...register(`participants.${index}.email`)}
                            />
                          </div>
                        </div>
                        <div className={styles.inputGroup}>
                          <label>Job Title</label>
                          <div className={styles.inputWrapper}>
                            <input
                              type="text"
                              placeholder="ux.ui designer"
                              {...register(`participants.${index}.jobTitle`)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className={styles.fieldRow}>
                        <div className={styles.inputGroup}>
                          <label>Phone</label>
                          <div className={styles.inputWrapper}>
                            <input
                              type="tel"
                              placeholder="+2010947523945"
                              {...register(`participants.${index}.phone`)}
                            />
                          </div>
                        </div>
                        <div className={styles.inputGroup}>
                          <label>Mobile</label>
                          <div className={styles.inputWrapper}>
                            <input
                              type="tel"
                              placeholder="+2010947523945"
                              {...register(`participants.${index}.mobile`)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className={styles.addParticipantBtn}
                onClick={() => append({ fullName: '', email: '', jobTitle: '', phone: '', mobile: '' })}
              >
                <Plus size={18} /> Add Another Participant
              </button>
            </div>
          )}

          <div className={styles.footerActions}>
            <button type="submit" className={styles.btnContinue}>
              Continue <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StepsForm;