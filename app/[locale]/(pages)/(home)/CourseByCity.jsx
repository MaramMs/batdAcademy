'use client'
import GenericSlider from "@/components/common/GenericSlider";
import Title from "@/components/common/Title";
import styleContainer from "@/sass/components/common/container.module.scss";
import styles from "@/sass/pages/home/course-by-city.module.scss";
import Image from "next/image";

const couresByCitiesItem = [
    {
        id: 1,
        title: "Course By City",
        image: "/asstes/icons/city.png",
    },
    {
        id: 2,
        title: "Course By City",
        image: "/asstes/icons/city.png",
    },
    {
        id: 3,
        title: "Course By City",
        image: "/asstes/icons/city.png",
    },
    {
        id: 4,
        title: "Course By City",
        image: "/asstes/icons/city.png",
    },
    {
        id: 5,
        title: "Course By City",
        image: "/asstes/icons/city.png",
    },
    {
        id: 6,
        title: "Course By City",
        image: "/asstes/icons/city.png",
    },
    {
        id: 7,
        title: "Course By City",
        image: "/asstes/icons/city.png",
    },
    {
        id: 8,
        title: "Course By City",
        image: "/asstes/icons/city.png",
    },
    {
        id: 9,
        title: "Course By City",
        image: "/asstes/icons/city.png",
    },
    {
        id: 10,
        title: "Course By City",
        image: "/asstes/icons/city.png",
    },
]
const CouresByCities = ({city}) => {
    return (
        <div className={styles.couresByCities}>
            <div className={styles.couresByCities__image}>
                <Image src={city.image} alt={city.title} width={130} height={130} />
            </div>
            <div className={styles.couresByCities__content}>
                <h3 className={styles.couresByCities__content__title}>{city.title}</h3>
            </div>
        </div>
    )
}

const CourseByCity = () => {
    return (
        <section>
            <div className={styleContainer.container}>
                <Title title="Course " span='By City' subtitle='Our favorite cities with attractive tourist attractions' />
                <GenericSlider
                    navId="citys"
                    items={couresByCitiesItem}
                    renderSlide={(city) => <CouresByCities city={city} />}
                    slidesPerView={6}
                    spaceBetween={20}
                    showViewAll={false}
                />
            </div>
        </section>
    );
};

export default CourseByCity;