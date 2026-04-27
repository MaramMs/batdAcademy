import React from 'react';
import { Users, Plus, X } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';
import styles from '@/sass/pages/register-course/steps-form.module.scss';

const ParticipantsSection = ({ control, register, errors }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "participants"
    });

    return (
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
                            {fields.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className={styles.removeBtn}
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>

                        <div className={styles.participantFields}>
                            <div className={styles.inputGroup}>
                                <label>Full Name</label>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type="text"
                                        placeholder="Enter full name"
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
                                            placeholder="participant@company.com"
                                            {...register(`participants.${index}.email`)}
                                        />
                                    </div>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Job Title</label>
                                    <div className={styles.inputWrapper}>
                                        <input
                                            type="text"
                                            placeholder="Position or role"
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
                                            placeholder="+1 (555) 000-0000"
                                            {...register(`participants.${index}.phone`)}
                                        />
                                    </div>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Mobile</label>
                                    <div className={styles.inputWrapper}>
                                        <input
                                            type="tel"
                                            placeholder="+1 (555) 000-0000"
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
    );
};

export default ParticipantsSection;
