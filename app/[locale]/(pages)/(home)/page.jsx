    import Hero from "./Hero"
import RequestCoures from "./RequestCoures"
import UpcomingCourses from "./UpcomingCourses"
import styles from '@/sass/pages/home/home.module.scss'
import WhatIs from "./WhatIs"
import CourseByCity from "./CourseByCity"
import Customers from "./Customers"
import CoursesBySpecial from "./CoursesBySpecial"
import LastestPublication from "./LastestPublication"
import TeamWork from "./TeamWork"
const Home = () =>{
    return (
        <div className={styles.home}>
            <Hero />
           <div className={styles.mainContent}>
             <UpcomingCourses />
             <CoursesBySpecial />
             <RequestCoures />
             <WhatIs />
             <CourseByCity />
             <LastestPublication />
             <TeamWork />
             <Customers />
           </div>
        </div>
    )
}

export default Home