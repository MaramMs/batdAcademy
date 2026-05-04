'use client'
import { useEffect } from "react";
import GenericSlider from "@/components/common/GenericSlider";
import Title from "@/components/common/Title";
import styleContainer from "@/sass/components/common/container.module.scss";
import styles from "@/sass/pages/home/course-by-city.module.scss";
import useCitiesStore from "@/store/useCitiesStore";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const CouresByCities = ({city}) => {
    const {locale} = useParams();
    return (
        <Link
            className={styles.couresByCities}
            href={`${locale}/city/${city.id}/${city.country.slug}`}
            title={city.name}
        >
            <div className={styles.couresByCities__image}>
                <Image src={city.image} alt={city.name} width={130} height={130} />
            </div>
            <div className={styles.couresByCities__content}>
                <h3 className={styles.couresByCities__content__title}>{city.name}</h3>
            </div>
        </Link>
    )
}

const CourseByCity = () => {
    const {handleGetCities, cities} = useCitiesStore();
    useEffect(() => {
        handleGetCities();
    }, []);
    return (
        <section>
            <div className={styleContainer.container}>
                <Title title="Course " span='By City' subtitle='Our favorite cities with attractive tourist attractions' />
                <GenericSlider
                    navId="citys"
                    items={cities}
                    renderSlide={(city) => <CouresByCities key={city.id} city={city} />}
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                        1280: {
                            slidesPerView: 4,
                        },
                        1536: {
                            slidesPerView: 5,
                        },
                        1792: {
                            slidesPerView: 6,
                        },
                    }}
                     autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    spaceBetween={20}
                    showViewAll={false}
                />
            </div>
        </section>
    );
};

export default CourseByCity;