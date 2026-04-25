import Header from "./Header";
import Print from "./print";
import PrintCard from "./PrintCard";
import styles from "@/sass/pages/print-category/print-category.module.scss";
import styleContainer from "@/sass/components/common/container.module.scss";
const cards = [
    {
        id: 1,
        category: 'Management',
        title: 'project management',
        numOfStudents: '520',
        courseType: 'Advance',
        date1: '25 may 2025',
        date2: '28 may 2025',
        duration: '1 Year',
        location: 'Beirut, Lebanon',
        prices: [
            {
                label: 'Tuition Fees',
                value: '1800$'
            },
            {
                label: 'Books Fees',
                value: '250$'
            },
            {
                label: 'Total',
                value: '250$'
            },
        ]
    },
    {
        id: 2,
        category: 'Management',
        title: 'project management',
        numOfStudents: '520',
        courseType: 'Advance',
        date1: '25 may 2025',
        date2: '28 may 2025',
        duration: '1 Year',
        location: 'Beirut, Lebanon',
        prices: [
            {
                label: 'Tuition Fees',
                value: '1800$'
            },
            {
                label: 'Books Fees',
                value: '250$'
            },
            {
                label: 'Total',
                value: '250$'
            },
        ]
    },
     {
        id:3,
        category:'Management',
        title:'project management',
        numOfStudents:'520',
        courseType:'Advance',
        date1:'25 may 2025',
        date2:'28 may 2025',
        duration:'1 Year',
        location:'Beirut, Lebanon',
prices:[
    {
        label:'Tuition Fees',
        value:'1800$'
    },
    {
        label:'Books Fees',
        value:'250$'
    },
    {
        label:'Total',
        value:'250$'
    },
]        
    },
     {
        id:4,
        category:'Management',
        title:'project management',
        numOfStudents:'520',
        courseType:'Advance',
        date1:'25 may 2025',
        date2:'28 may 2025',
        duration:'1 Year',
        location:'Beirut, Lebanon',
prices:[
    {
        label:'Tuition Fees',
        value:'1800$'
    },
    {
        label:'Books Fees',
        value:'250$'
    },
    {
        label:'Total',
        value:'250$'
    },
]        
    },


]
const PrintCategory = () => {
    return (
        <section className={styles.printCategory}>
            <Header />
            <Print />

            <div className={styles.mainContent}>

                <div className={styleContainer.container}>
                    <div className={styles.list}>
                        {
                            cards.map((card) => (
                                <PrintCard key={card.id} card={card} />
                            ))
                        }

                    </div>

                </div>


            </div>

        </section>
    )
}

export default PrintCategory