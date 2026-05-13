'use client'
import Header from "./Header";
import styles from "@/sass/pages/consulting/consulting-details/consulting-details.module.scss";
import stylesContainer from "@/sass/components/common/container.module.scss";
import Overview from "./Overview";
import Process from "./Process";
import ClientTestimonials from "./ClientTestimonials";
import BookConsultation from "./BookConsultation";
import { Check } from "lucide-react";
import NavgationBar from "./NavgationBar";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import useConsultingStore from "@/store/useConsultingStore";
import Skeleton from "@/components/ui/Skeleton";

const ConsultingDetails = () => {
    const { slug } = useParams();
    const { handleGetConsultingDetailsBySlug, consultingDetails, isLoading } = useConsultingStore();
    useEffect(() => {
        handleGetConsultingDetailsBySlug(slug)
    }, [slug]);

    return (
        <>
            {isLoading ? (
                <div className={styles.left}>
                    <Skeleton type="card" height={300} />
                    <Skeleton type="card" height={300} />
                    <Skeleton type="card" height={300} />
                </div>
            ) : (
                <>
                    <NavgationBar breadcrumb={consultingDetails?.breadcrumb} />
                    <Header />
                    <div className={styles.mainContent}>
                        <div className={stylesContainer.container}>
                            <div className={styles.wrapper}>
                                <div className={styles.left}>
                                    <Overview overview={consultingDetails?.overview} />
                                    <Process process={consultingDetails?.process} />
                                    <ClientTestimonials testimonials={consultingDetails?.testimonials} />
                                </div>
                                <div className={styles.right}>
                                    <BookConsultation bookPackage={consultingDetails?.package} consultingServiceId={consultingDetails?.id}/>
                                    <div className={styles.chooseUs}>
                                        <h3>{consultingDetails?.why_choose_us?.title}</h3>
                                        <ul>
                                            {consultingDetails?.why_choose_us?.items?.map((item, index) => (
                                                <li key={index}>
                                                    <Check size={16} color="#009966" /> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ConsultingDetails;