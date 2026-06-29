"use client";
import styles from "@/sass/pages/jobs/filter.module.scss";
import stylesContainer from "@/sass/components/common/container.module.scss";
import DropdownMenuCustom from "@/components/common/DropdownMenu";
import { ChevronDown, Clock, FilterIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const Filter = () => {
    const t = useTranslations('Jobs');
    return (
        <div className={styles.filter}>
            <div className={stylesContainer.container}>

                    <div className={styles.filters}>
                        <DropdownMenuCustom
                            label={t('allCategories')}
                            // options={specializationOptions}
                            // value={specialization}
                            // onChange={handleSpecializationChange}
                            multi={false}
                            icon={<ChevronDown size={14} />}
                            triggerClassName={styles.dropdownTrigger}
                        />
                   <div className={styles.typeWrapper}>
                    <Clock />
                         <input className={styles.types} type="text" placeholder={t('allTypes')} />

                   </div>

                        <button className={styles.filtersBtn}> <FilterIcon /> {t('filters')}</button>
                    </div>

            </div>
        </div>
    );
};

export default Filter;