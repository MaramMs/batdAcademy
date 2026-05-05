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
import ChatAi from "./ChatAi"
import MotionWrapper from "@/components/common/MotionWrapper";

const Home = () =>{
    return (
        <div className={styles.home}>
            <Hero />
            <ChatAi />
           <div className={styles.mainContent}>
             <MotionWrapper><UpcomingCourses /></MotionWrapper>
             <MotionWrapper><CoursesBySpecial /></MotionWrapper>
             <MotionWrapper><RequestCoures /></MotionWrapper>
             <MotionWrapper><WhatIs /></MotionWrapper>
             <MotionWrapper><CourseByCity /></MotionWrapper>
             <MotionWrapper><LastestPublication /></MotionWrapper>
             <MotionWrapper><TeamWork /></MotionWrapper>
             <MotionWrapper><Customers /></MotionWrapper>
           </div>
        </div>
    )
}


export default Home