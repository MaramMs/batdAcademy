    import Hero from "./Hero"
import RequestCoures from "./RequestCoures"
import UpcomingCourses from "./UpcomingCourses"
import styles from '@/sass/pages/home/home.module.scss'
import WhatIs from "./WhatIs"
const Home = () =>{
    return (
        <div className={styles.home}>
            <Hero />
           <div className={styles.mainContent}>
             <UpcomingCourses />
             <RequestCoures />
             <WhatIs />
           </div>
        </div>
    )
}

export default Home