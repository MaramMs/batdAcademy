import Header from "./Header";
import styles from "@/sass/pages/consulting/consulting.module.scss";
import stylesContainer from "@/sass/components/common/container.module.scss";
import ConsultingCard from "./ConsultingCard";
import { ArrowBigRight, ArrowRight, MoveRight } from "lucide-react";
import ExpertCard from "./ExpertCard";
import According from "../page/FQA/according";


const consultingData = [
    {
        image: '/asstes/const.jpg',
        title: "Consulting 1",
        description: "Description 1"
    },
    {
        image: "/asstes/const.jpg",
        title: "Consulting 2",
        description: "Description 2"
    },
    {
        image: "/asstes/const.jpg",
        title: "Consulting 3",
        description: "Description 3"
    },
    {
        image: '/asstes/const.jpg',
        title: "Consulting 1",
        description: "Description 1"
    },
    {
        image: "/asstes/const.jpg",
        title: "Consulting 2",
        description: "Description 2"
    },
    {
        image: "/asstes/const.jpg",
        title: "Consulting 3",
        description: "Description 3"
    },
]

const expertData = [
   
 {
          image: '/asstes/expert.jpg',
        year: "+15 year",
        name: "Expert 1",
        course: "Business Planning & Strategy",
        plan: 'Strategy & Planning',
        projects:'200',
    },
    {
          image: '/asstes/expert.jpg',
        year: "+15 year",
        name: "Expert 1",
        course: "Business Planning & Strategy",
        plan: 'Strategy & Planning',
        projects:'200',
    },
    {
          image: '/asstes/expert.jpg',
        year: "+15 year",
        name: "Expert 1",
        course: "Business Planning & Strategy",
        plan: 'Strategy & Planning',
        projects:'200',
    },
    {
          image: '/asstes/expert.jpg',
        year: "+15 year",
        name: "Expert 1",
        course: "Business Planning & Strategy",
        plan: 'Strategy & Planning',
        projects:'200',
        description: "Description 3"
    },
]

const ConsultingPage = () => {
    return (
        <div className={styles.consulting}>
            <Header />
            <div className={styles.mainContent}>
                <div className={styles.content}>
                    <div className={stylesContainer.container}>
                        <section className={styles.consultingCategory}>
                            <div className={styles.heading}>
                                <h2>Consultation Categories</h2>
                                <p>
                                    Explore our comprehensive range of professional consulting services tailored to your needs

                                </p>
                            </div>
                            <div className={styles.consultingCard}>
                                {
                                    consultingData.map((item, index) => (
                                        <ConsultingCard key={index} data={item} />
                                    ))
                                }


                            </div>
                            <button className={styles.viewMoreBtn}>View more <ArrowRight /></button>

                        </section>

                    </div>

                    <section className={styles.expertConsultants}>
                        <div className={styles.heading}>
                            <h2>
                                Our Expert Consultants
                            </h2>
                            <p>

                                Meet our team of experienced professionals ready to help you succeed
                            </p>

                        </div>
                        <div className={styles.expertCards}>
                            {
                                expertData.map((item, index) => (
                                    <ExpertCard key={index} data={item} />
                                ))
                            }

                        </div>

                    </section>


                      <div className={stylesContainer.container}>
                    <section className={styles.frequentlyQuestions}>
                          <div className={styles.heading}>
                            <h2>Frequently Asked Questions</h2>
                            <p>Here are answers to some of the most common questions about our consulting services.</p>
                        </div>
                        <div className={styles.questions}>
                            <According variant="popular" />
                            <According variant="popular" />
                            <According variant="popular" />
                            <According variant="popular" />
                            <According variant="popular" />
                            <According variant="popular" />
                        </div>

                    </section>
                      </div>

                </div>
            </div>
        </div>
    );
};

export default ConsultingPage;