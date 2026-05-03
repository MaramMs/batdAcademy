
'use client'
import { useEffect } from "react";
import Image from "next/image";
import useClientsStore from "@/store/useClientsStore";
import GenericSlider from "@/components/common/GenericSlider";
import Title from "@/components/common/Title";
import styleContainer from "@/sass/components/common/container.module.scss";
import styles from "@/sass/pages/home/customers.module.scss";

const Customer = ({ client }) => {
    console.log(client.logo , 'client')
    return (
        <div className={styles.customer}>
            <div className={styles.customer__image}>
                <Image alt={client.name} src={client.logo} width={130} height={130} />
            </div>
        </div>
    )
}

const Customers = () => {
    const {clients, handleGetClients} = useClientsStore();
    console.log(clients , 'clients')
    useEffect(() => {
        handleGetClients();
    }, []);
    return (
        <section>
            <div className={styleContainer.container}>
                <Title title="Most Of our  " span='Customer'  />
                <GenericSlider
                    navId="clients"
                    items={clients}
                    renderSlide={(client) => <Customer client={client} />}
                    spaceBetween={20}
                    showViewAll={false}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    hidden={true}
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
                />
            </div>
        </section>
    );
};

export default Customers;