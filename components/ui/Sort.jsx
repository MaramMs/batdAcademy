import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import styles from "@/sass/components/ui/sort.module.scss";

const SORT_OPTIONS = [
    { label: "Latest First", value: "latest" },
    { label: "Oldest First", value: "oldest" },
    { label: "Most Popular", value: "popular" },
    { label: "Most Relevant", value: "relevant" },
];

const Sort = ({ value, onChange }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const selected = SORT_OPTIONS.find((o) => o.value === value) ?? SORT_OPTIONS[0];

    // close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className={styles.sort} ref={ref}>
            <button
                className={styles.trigger}
                onClick={() => setOpen((prev) => !prev)}
            >
                <span>{selected.label}</span>
                <ChevronDown
                    className={`${styles.chevron} ${open ? styles.open : ""}`}
                />
            </button>

            {open && (
                <ul className={styles.dropdown}>
                    {SORT_OPTIONS.map((option) => (
                        <li
                            key={option.value}
                            className={`${styles.option} ${value === option.value ? styles.active : ""}`}
                            onClick={() => {
                                onChange(option.value);
                                setOpen(false);
                            }}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Sort;