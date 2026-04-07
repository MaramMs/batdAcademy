    import Hero from "./Hero"
import RequestCoures from "./RequestCoures"
import UpcomingCourses from "./UpcomingCourses"
import styles from '@/sass/pages/home/home.module.scss'
import WhatIs from "./WhatIs"
import CourseByCity from "./CourseByCity"
import Customers from "./Customers"
const Home = () =>{
    return (
        <div className={styles.home}>
            <Hero />
           <div className={styles.mainContent}>
             <UpcomingCourses />
             <RequestCoures />
             <WhatIs />
             <CourseByCity />
             <Customers />
           </div>
        </div>
    )
}

export default Home