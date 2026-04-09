
'use client'
import GenericSlider from "@/components/common/GenericSlider";
import Title from "@/components/common/Title";
import styleContainer from "@/sass/components/common/container.module.scss";
import styles from "@/sass/pages/home/customers.module.scss";
import Image from "next/image";
const customersItem = [
    {
        id: 1,
        image: "/asstes/icons/customer.png",
    },
    {
        id: 2,
        image: "/asstes/icons/customer.png",
    },
    {
        id: 3,
        image: "/asstes/icons/customer.png",
    },
    {
        id: 4,
        image: "/asstes/icons/customer.png",
    },
    {
        id: 5,
        image: "/asstes/icons/customer.png",
    },
    {
        id: 6,
        image: "/asstes/icons/customer.png",
    },
    {
        id: 7,
        image: "/asstes/icons/customer.png",
    },
    {
        id: 8,
        image: "/asstes/icons/customer.png",
    },
    {
        id: 9,
        image: "/asstes/icons/customer.png",
    },
    {
        id: 10,
        image: "/asstes/icons/customer.png",
    },
]
const Customer = ({ city }) => {
    return (
        <div className={styles.customer}>
            <div className={styles.customer__image}>
                <Image alt={city.title} src={city.image} width={130} height={130} />
            </div>
        </div>
    )
}

const Customers = () => {
    return (
        <section>
            <div className={styleContainer.container}>
                <Title title="Most Of our  " span='Customer'  />
                <GenericSlider
                    navId="customers"
                    items={customersItem}
                    renderSlide={(city) => <Customer city={city} />}
                    slidesPerView={6}
                    spaceBetween={20}
                    showViewAll={false}
                />
            </div>
        </section>
    );
};

export default Customers;