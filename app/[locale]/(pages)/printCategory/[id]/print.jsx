'use client'
import { useState, useEffect } from "react";
import DropdownMenuCustom from "@/components/common/DropdownMenu";
import { ArrowBack, ChevronDown, MoveLeft, Printer, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "@/sass/pages/print-category/print.module.scss";
import container from "@/sass/components/common/container.module.scss";
const Print = () => {
  const [location, setLocation] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (searchTerm) {
        params.set('search', searchTerm);
      } else {
        params.delete('search');
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, pathname, router, searchParams]);

  return (
    <div className={styles.print}>
      <div className={container.container}>
        <div className={styles.wrapper}>
          <div className={styles.top}>

            <DropdownMenuCustom
              label="All Locations"
              options={["All Locations", "Location 1", "Location 2"]}
              value={location}
              onChange={(val) => setLocation(val)}
              multi={false}
              icon={<ChevronDown size={14} />}
              triggerClassName={styles.dropdownTrigger}
            />
            <div className={styles.searchContent}>
              <div className={styles.searchContent__left}>
                <div className={styles.searchContent__left__icon}>
                  <Search size={13} color="#99A1AF" />

                </div>
                <input 
                  type="text" 
                  placeholder="Search articles, topics, or authors..." 
                  className={styles.input} 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <button className={styles.printBtn}><Printer /> Print</button>
          </div>


          <div className={styles.bottom}>
            <h3>
              Showing
              <span className={styles.count}> 8 </span>
              Courses
            </h3>

            <Link href='/en/year_plan' className={styles.back}>
             <MoveLeft />
              Back to Year Plan
            </Link>

          </div>
          <div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Print;