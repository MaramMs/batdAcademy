"use client";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import styles from "@/sass/components/common/category-item.module.scss";

const Category = ({ category, onClick, active, onSpecializationClick, activeSpecializationId }) => {
    const hasSpecializations = category?.specializations?.length > 0;
    const [isExpanded, setIsExpanded] = useState(active);

    useEffect(() => {
        if (active) setIsExpanded(true);
    }, [active]);

    const handleToggle = () => {
        if (hasSpecializations) {
            setIsExpanded((prev) => !prev);
        } else {
            onClick?.();
        }
    };

    return (
        <li className={`${styles.categoryItem} ${active ? styles.active : ''}`}>
            <div className={styles.categoryRow} onClick={handleToggle}>
                <span className={styles.categoryName}>{category.name}</span>
                <div className={styles.badgeWrapper}>
                    <span className={styles.badge}>{category?.courses_count}</span>
                    {hasSpecializations ? (
                        <ChevronDown
                            size={14}
                            className={`${styles.chevronIcon} ${isExpanded ? styles.chevronOpen : ''}`}
                        />
                    ) : (
                        <ChevronRight size={14} />
                    )}
                </div>
            </div>

            {hasSpecializations && isExpanded && (
                <ul className={styles.specializationList}>
                    {category.specializations.map((spec) => (
                        <li
                            key={spec.id}
                            className={`${styles.specializationItem} ${activeSpecializationId === String(spec.id) ? styles.activeSpec : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                onSpecializationClick?.(spec.id, spec.slug);
                            }}
                        >
                            <span>{spec.name}</span>
                            <span className={styles.specBadge}>{spec.courses_count}</span>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
};

export default Category;