import styleContainer from "@/sass/components/common/container.module.scss";
import styles from "@/sass/pages/search-course/header.module.scss";
import { ChevronRight, House } from "lucide-react";
import Filters from "./Filters";
import SearchCourse from "./Search";
import { useSearchParams } from "next/navigation";

const Header = ({ updateFilter ,categories,specializations,cities}) => {
   const searchParams = useSearchParams();
   const type = searchParams.get('type');    
    return (
        <section className={styles.header}>
            <div className={styleContainer.container}>
                <div className={styles.wrapper}>
                    <div className={styles.breadcrumb}>
                        <House />
                        <ChevronRight />
                        <span> {type === '3' ? 'Diploma' : type === '2' ? "Master" : 'Training course'}</span>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.title}>
                            <h1>
                                Explore Our
                                <span>
                                    Professional Courses
                                </span>
                            </h1>

                            <p>
                                Find the perfect course to advance your career • 8 courses available
                            </p>
                        </div>

                        <div className={styles.search}>
                            <SearchCourse updateFilter={updateFilter} />
                            <Filters updateFilter={updateFilter} categories={categories} specializations={specializations} cities={cities}/>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Header;