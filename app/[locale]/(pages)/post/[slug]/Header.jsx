import stylesContainer from "@/sass/components/common/container.module.scss";
import styles from "@/sass/pages/blog/blog-details.module.scss";
import { ArrowLeft, Calendar, Clock, Eye, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.back}>
                        <Link href="/blog">
                            <ArrowLeft size={20} color="#FFFFFFCC" />
                            Back to Blog
                        </Link>

                    </div>
                    <div className={styles.contentItem}>
                        <div className={styles.type}>
                            <span> Technology</span>
                            <span className={styles.featured}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.39034 1.72401C8.14035 1.47394 7.80127 1.33342 7.44767 1.33334H2.66634C2.31272 1.33334 1.97358 1.47382 1.72353 1.72387C1.47348 1.97392 1.33301 2.31305 1.33301 2.66668V7.44801C1.33308 7.8016 1.47361 8.14069 1.72367 8.39068L7.52634 14.1933C7.82935 14.4944 8.23917 14.6634 8.66634 14.6634C9.09351 14.6634 9.50333 14.4944 9.80634 14.1933L14.193 9.80668C14.4941 9.50367 14.6631 9.09385 14.6631 8.66668C14.6631 8.23951 14.4941 7.82969 14.193 7.52668L8.39034 1.72401Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5.00033 5.33332C5.18442 5.33332 5.33366 5.18408 5.33366 4.99999C5.33366 4.81589 5.18442 4.66666 5.00033 4.66666C4.81623 4.66666 4.66699 4.81589 4.66699 4.99999C4.66699 5.18408 4.81623 5.33332 5.00033 5.33332Z" fill="white" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                                Featured</span>
                        </div>
                        <h2>
                            The Future of AI: Trends and Predictions for 2025
                        </h2>
                        <div className={styles.media}>
                            <div className={styles.reactions}>
                                <div className={styles.reaction}>
                                    <Calendar size={20} />
                                    <span>December 7, 2024</span>
                                </div>
                                <div className={styles.reaction}>
                                    <Clock size={20} />
                                    <span> 8 min read </span>
                                </div>
                                <div className={styles.reaction}>
                                    <Eye size={20} />
                                    <span>2.3k views</span>
                                </div>
                                <div className={styles.reaction}>
                                    <Heart size={20} />
                                    <span>150 likes</span>
                                </div>

                            </div>
                                  <div className={styles.social}>
                                <Link href="#">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_344_11265)">
                                            <path d="M1.78781 12.1576C1.28818 9.79978 1.28818 7.36339 1.78781 5.00553C1.85346 4.76609 1.9803 4.54785 2.15586 4.37229C2.33142 4.19673 2.54966 4.06989 2.7891 4.00424C6.62509 3.36875 10.5395 3.36875 14.3755 4.00424C14.615 4.06989 14.8332 4.19673 15.0087 4.37229C15.1843 4.54785 15.3112 4.76609 15.3768 5.00553C15.8764 7.36339 15.8764 9.79978 15.3768 12.1576C15.3112 12.3971 15.1843 12.6153 15.0087 12.7909C14.8332 12.9664 14.615 13.0933 14.3755 13.1589C10.5395 13.7946 6.62508 13.7946 2.7891 13.1589C2.54966 13.0933 2.33142 12.9664 2.15586 12.7909C1.9803 12.6153 1.85346 12.3971 1.78781 12.1576Z" stroke="white" strokeWidth="1.43042" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M7.15234 10.7269L10.7284 8.58124L7.15234 6.43561V10.7269Z" stroke="white" strokeWidth="1.43042" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_344_11265">
                                                <rect width="17.165" height="17.165" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                </Link>
                                <Link href="#">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.1588 1.42969H5.00671C3.03172 1.42969 1.43066 3.03074 1.43066 5.00574V12.1578C1.43066 14.1328 3.03172 15.7339 5.00671 15.7339H12.1588C14.1338 15.7339 15.7349 14.1328 15.7349 12.1578V5.00574C15.7349 3.03074 14.1338 1.42969 12.1588 1.42969Z" stroke="white" strokeWidth="1.43042" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M11.4427 8.13228C11.531 8.72751 11.4293 9.33541 11.1521 9.86953C10.875 10.4037 10.4365 10.8368 9.899 11.1073C9.36151 11.3779 8.75239 11.472 8.1583 11.3764C7.5642 11.2808 7.01537 11.0003 6.58988 10.5748C6.16438 10.1493 5.88389 9.60051 5.78829 9.00642C5.69269 8.41232 5.78686 7.8032 6.05739 7.26571C6.32793 6.72821 6.76106 6.28971 7.29518 6.01257C7.8293 5.73542 8.4372 5.63375 9.03244 5.72202C9.63959 5.81205 10.2017 6.09497 10.6357 6.52899C11.0697 6.96301 11.3527 7.52512 11.4427 8.13228Z" stroke="white" strokeWidth="1.43042" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12.5166 4.64771H12.524" stroke="white" strokeWidth="1.43042" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                </Link>
                                <Link href="#">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_344_11274)">
                                            <path d="M15.7349 2.85961C15.7349 2.85961 15.2342 4.36155 14.3044 5.29132C15.4488 12.4434 7.58147 17.6645 1.43066 13.5878C3.00413 13.6593 4.57759 13.1586 5.72192 12.1573C2.14587 11.0845 0.357849 6.86478 2.14587 3.57482C3.71934 5.43436 6.15105 6.50718 8.58277 6.43566C7.93908 3.43178 11.4436 1.71527 13.5892 3.71786C14.376 3.71786 15.7349 2.85961 15.7349 2.85961Z" stroke="white" strokeWidth="1.43042" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_344_11274">
                                                <rect width="17.165" height="17.165" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                </Link>

                                <Link href="#">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.4436 5.71997C12.5817 5.71997 13.6732 6.17208 14.478 6.97685C15.2828 7.78162 15.7349 8.87312 15.7349 10.0112V15.0177H12.874V10.0112C12.874 9.63186 12.7233 9.26803 12.4551 8.99977C12.1868 8.73152 11.823 8.58081 11.4436 8.58081C11.0642 8.58081 10.7004 8.73152 10.4321 8.99977C10.1639 9.26803 10.0132 9.63186 10.0132 10.0112V15.0177H7.15234V10.0112C7.15234 8.87312 7.60446 7.78162 8.40923 6.97685C9.21399 6.17208 10.3055 5.71997 11.4436 5.71997Z" stroke="white" strokeWidth="1.43042" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M4.2915 6.43588H1.43066V15.0184H4.2915V6.43588Z" stroke="white" strokeWidth="1.43042" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M2.86108 4.29047C3.65108 4.29047 4.2915 3.65005 4.2915 2.86005C4.2915 2.07005 3.65108 1.42963 2.86108 1.42963C2.07108 1.42963 1.43066 2.07005 1.43066 2.86005C1.43066 3.65005 2.07108 4.29047 2.86108 4.29047Z" stroke="white" strokeWidth="1.43042" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                </Link>
                                <Link href="#">
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.8732 1.42969H10.7275C9.77911 1.42969 8.86953 1.80645 8.19889 2.47709C7.52825 3.14773 7.15149 4.05731 7.15149 5.00574V7.15137H5.00586V10.0122H7.15149V15.7339H10.0123V10.0122H12.158L12.8732 7.15137H10.0123V5.00574C10.0123 4.81605 10.0877 4.63414 10.2218 4.50001C10.3559 4.36588 10.5379 4.29053 10.7275 4.29053H12.8732V1.42969Z" stroke="white" strokeWidth="1.43042" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>

                                </Link>
                            </div>

                        </div>

                        <div className={styles.author}>
                            <div className={styles.avatar}>
                                <Image src="/asstes/person.jpg" alt="Author" width={50} height={50} />
                            </div>
                            <div className={styles.authorInfo}>
                                <h3>John Doe</h3>
                                <p>Author</p>
                            </div>

                        </div>

                  

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Header;