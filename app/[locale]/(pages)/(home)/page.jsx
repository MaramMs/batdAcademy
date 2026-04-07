    import Hero from "./Hero"
import RequestCoures from "./RequestCoures"
import UpcomingCourses from "./UpcomingCourses"
import styles from '@/sass/pages/home/home.module.scss'
const Home = () =>{
    return (
        <div className={styles.home}>
            <Hero />
           <div className={styles.mainContent}>
             <UpcomingCourses />
             <RequestCoures />
           </div>
        </div>
    )
}

export default Home