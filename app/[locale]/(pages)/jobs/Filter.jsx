import styles from "@/sass/pages/jobs/filter.module.scss";
import stylesContainer from "@/sass/components/common/container.module.scss";
import DropdownMenuCustom from "@/components/common/DropdownMenu";
import { ChevronDown, Clock, FilterIcon } from "lucide-react";
const Filter = () => {
    return (
        <div className={styles.filter}>
            <div className={stylesContainer.container}>
                   
                    <div className={styles.filters}>
                        <DropdownMenuCustom
                            label="All Categories"
                            // options={specializationOptions}
                            // value={specialization}
                            // onChange={handleSpecializationChange}
                            multi={false}
                            icon={<ChevronDown size={14} />}
                            triggerClassName={styles.dropdownTrigger}
                        />
                   <div className={styles.typeWrapper}>
                    <Clock />
                         <input className={styles.types} type="text" placeholder="aLL types" />
                      
                   </div>
                   
                        <button className={styles.filtersBtn}> <FilterIcon /> Filters</button>
                    </div>
                
            </div>
        </div>
    );
};

export default Filter;