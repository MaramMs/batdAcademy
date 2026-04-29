import styles from "@/sass/pages/consulting/consulting-category/consulting-category.module.scss";
import Header from "./Header";
import ConsultingCategoryCard from "./ConsultingCategoryCard";

const consultingData =[
    {
        id:1,
        title:"Consulting",
        description:"Data-driven insights and strategic planning to guide your journey from planning to market entry.",
        image:"/asstes/constCategory.jpg",
        prices:'$5000-$15000',
        duration:'2-16 weeks',
        slug:"consulting-test-1",
    },
    {
        id:2,
        title:"Consulting",
        description:"Data-driven insights and strategic planning to guide your journey from planning to market entry.",
        image:"/asstes/constCategory.jpg",
        prices:'$5000-$15000',
        duration:'2-16 weeks',
         slug:"consulting-test-1",
    },
    {
        id:3,
        title:"Consulting",
        description:"Data-driven insights and strategic planning to guide your journey from planning to market entry.",
        image:"/asstes/constCategory.jpg",
        prices:'$5000-$15000',
        duration:'2-16 weeks',
    },
   {
        id:4,
        title:"Consulting",
        description:"Data-driven insights and strategic planning to guide your journey from planning to market entry.",
        image:"/asstes/constCategory.jpg",
        prices:'$5000-$15000',
        duration:'2-16 weeks',
    },
   {
        id:5,
        title:"Consulting",
        description:"Data-driven insights and strategic planning to guide your journey from planning to market entry.",
        image:"/asstes/constCategory.jpg",
        prices:'$5000-$15000',
        duration:'2-16 weeks',
    },
   {
        id:6,
        title:"Consulting",
        description:"Data-driven insights and strategic planning to guide your journey from planning to market entry.",
        image:"/asstes/constCategory.jpg",
        prices:'$5000-$15000',
        duration:'2-16 weeks',
    },
    {
        id:7,
        title:"Consulting",
        description:"Data-driven insights and strategic planning to guide your journey from planning to market entry.",
        image:"/asstes/constCategory.jpg",
        prices:'$5000-$15000',
        duration:'2-16 weeks',
    },
  
]

const ConsultingCategory = () => {
    return (
        <div className={styles.consultingCategory}>
            <Header />

            <div className={styles.mainContent}>
                <div className={styles.title}>
                    <h1>Our Consulting Services</h1>
                    <p>Data-driven insights and strategic planning to guide your journey from planning to market entry.</p>
                </div>
                <div className={styles.contentCards}>
                    {
                     consultingData.map(item => 
                        <ConsultingCategoryCard
                        key={item.id}
                        data={item}
                        />
                     
                     )
                    }

                </div>

            </div>
        </div>
    );
};

export default ConsultingCategory;