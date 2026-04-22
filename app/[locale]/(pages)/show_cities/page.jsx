import styles from "@/sass/pages/showCities/show-cities.module.scss";
import Header from "./Header";
import stylesContainer from "@/sass/components/common/container.module.scss";
import CityCard from "./CityCard";

const cities = [
    {
        id: 1,
        image: "/asstes/london.jpg",
        title: "London",
        description: "World-class training programs in London"
    },
    {
        id: 2,
        image:  "/asstes/london.jpg",
        title: "Riyadh",
        description: "World-class training programs in Riyadh"
    },
    {
        id: 3,
        image:  "/asstes/london.jpg",
        title: "Riyadh",
        description: "World-class training programs in Riyadh"
    },
    {
        id: 4,
        image:  "/asstes/london.jpg",
        title: "Riyadh",
        description: "World-class training programs in Riyadh"
    },
    {
        id: 5,
        image:  "/asstes/london.jpg",
        title: "Riyadh",
        description: "World-class training programs in Riyadh"
    },
    {
        id: 6,
        image:  "/asstes/london.jpg",
        title: "Riyadh",
        description: "World-class training programs in Riyadh"
    },
]
const ShowCities = () => {
    return (
        <div className={styles.showCities}>
            <Header />

            <div className={styles.mainContent}>
                <div className={stylesContainer.container}>
                    <div className={styles.content}>
                        <div className={styles.title}>
                            <h2> Courses by city</h2>
                            <p>Our favorite cities with attractive attractions</p>

                        </div>

                        <div className={styles.cities}>
                            {
                                cities.map((city) => (
                                    <CityCard key={city.id} city={city} />
                                ))
                            }

                        </div>
                    </div>

                </div>


            </div>
        </div>
    );
};

export default ShowCities;