
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronDown, Mail, Phone, User } from "lucide-react";
import DropdownMenuCustom from "@/components/common/DropdownMenu";
import styles from "@/sass/components/common/application-modal.module.scss";
import useConsultingStore from "@/store/useConsultingStore";
import useCitiesStore from "@/store/useCitiesStore";
import SuccessfullMassage from "./SuccessfullMassage";

const ApplicationForm = ({ onClose, consultingServiceId }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      country_id: null,
      details: "",
      consultancy_service_id: null
    },
  });


  const { isBookingLoading, handleBookingConsultation } = useConsultingStore();
  const { cities, handleGetCities } = useCitiesStore();

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);

    // Ensure we get the ID value
    const countryId = data.country_id?.value || data.country_id;
    formData.append('country_id', countryId);

    formData.append('details', data.details);
    formData.append('consultancy_service_id', consultingServiceId);

    try {
      const response = await handleBookingConsultation(formData);


      if (response?.success) {
         setTimeout(() => {
  setShowSuccessMessage(true);
}, 1000);
        reset();
      }
    } catch (error) {
      
      console.error("Store Error:", error);
    }
  };
  useEffect(() => {
    handleGetCities()
  }, [])


  if (showSuccessMessage) {
    return (
      <SuccessfullMassage
        message="Success!"
        onClose={onClose} 
      />
    );
  }

  return (
    <>
      {/* ── Header ── */}
      <div className={styles.header}>
        <div>
          <Dialog.Title className={styles.title}>Book a Consultation</Dialog.Title>
          <Dialog.Description className={styles.subtitle}>
            Fill in your details and we'll get back to you shortly.
          </Dialog.Description>
        </div>
        <Dialog.Close asChild>
          <button className={styles.closeBtn} aria-label="Close">✕</button>
        </Dialog.Close>
      </div>

      <div className={styles.body}>
        <form id="consultation-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.icon}> <User color="#1E2749" size={16} /></span> Personal Information
            </h3>

            <div className={styles.grid2}>
              {/* Full Name */}
              <div className={styles.field}>
                <label className={styles.label}>
                  Full Name <span className={styles.req}>*</span>
                </label>
                <div className={styles.inputWrap}>
                  <span className={styles.inputIcon}> <User color="#99A1AF" size={16} /> </span>
                  <input
                    className={`${styles.input} ${errors.fullName ? styles.inputError : ""}`}
                    placeholder="Enter your full name"
                    {...register("name", { required: "Full name is required" })}
                  />
                </div>
                {errors.name && (
                  <span className={styles.errorMsg}>{errors.name.message}</span>
                )}
              </div>

              {/* Email */}
              <div className={styles.field}>
                <label className={styles.label}>
                  Email <span className={styles.req}>*</span>
                </label>
                <div className={styles.inputWrap}>
                  <span className={styles.inputIcon}> <Mail color="#99A1AF" size={16} /></span>
                  <input
                    className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                    type="email"
                    placeholder="your.email@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <span className={styles.errorMsg}>{errors.email.message}</span>
                )}
              </div>
            </div>

            {/* Phone */}
            <div className={styles.field}>
              <label className={styles.label}>
                Phone Number <span className={styles.req}>*</span>
              </label>
              <div className={styles.inputWrap}>
                <span className={styles.inputIcon}> <Phone color="#99A1AF" size={16} /></span>
                <input
                  className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
                  placeholder="+1 (555) 000-0000"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[+\d\s\-()]{7,20}$/,
                      message: "Enter a valid phone number",
                    },
                  })}
                />
              </div>
              {errors.phone && (
                <span className={styles.errorMsg}>{errors.phone.message}</span>
              )}
            </div>

            {/* Country — wired via Controller so RHF tracks the value */}
            <div className={styles.field}>
              <label className={styles.label}>
                Choose Your Country <span className={styles.req}>*</span>
              </label>
              <Controller
                name="country_id"
                control={control}
                rules={{ required: "Please select a country" }}
                render={({ field }) => (
                  <div className={`${styles.dropdownWrap} ${errors.country ? styles.dropdownError : ""}`}>
                    <DropdownMenuCustom
                      label={field.value?.label ?? "Select your Country"}
                      options={cities?.map((item) => {
                        return {
                          label: item.name,
                          value: item.id,
                        }
                      })}
                      value={field.value}
                      onChange={(option) => field.onChange(option)}
                      triggerClassName={styles.dropdownTrigger}
                      icon={
                        <ChevronDown
                          size={16}
                          className={styles.dropdownArrow}
                        />
                      }
                    />
                  </div>
                )}
              />
              {errors.country && (
                <span className={styles.errorMsg}>{errors.country.message}</span>
              )}
            </div>
          </section>

          {/* Consulting Details */}
          <div className={styles.field}>
            <label className={styles.label}>Consulting Details</label>
            <textarea
              className={`${styles.textarea} ${errors.details ? styles.inputError : ""}`}
              placeholder="Describe what you need help with, your goals, and any relevant background…"
              rows={6}
              {...register("details", {
                maxLength: { value: 1000, message: "Maximum 1000 characters" },
              })}
            />
            {errors.details && (
              <span className={styles.errorMsg}>{errors.details.message}</span>
            )}
          </div>

        </form>
      </div>

      <div className={styles.footer}>
        <button
          type="submit"
          form="consultation-form"
          disabled={isBookingLoading}
          className={styles.submitBtn}
        >
          {isBookingLoading ? <span>Loading...</span> : "Book Consultation →"}
        </button>
      </div>


    </>
  );
}


export default ApplicationForm;
