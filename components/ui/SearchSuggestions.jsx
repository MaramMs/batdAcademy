import styles from '@/sass/components/ui/search-suggestions.module.scss';

export default function SearchSuggestions({ suggestions, isLoading, onSelect, visible }) {
    console.log(suggestions, 'sug')
    if (!visible) return null;

    return (
        <ul className={styles.dropdown}>
            {isLoading && (
                <li className={styles.state}>...</li>
            )}
            {!isLoading && suggestions.length === 0 && (
                <li className={styles.state}>No results</li>
            )}
            {!isLoading && suggestions.map((course) => (
                <li
                    key={course.id}
                    className={styles.item}
                    // onMouseDown prevents input blur before onClick fires
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => onSelect(course)}
                >
                    {course.name}
                </li>
            ))}
        </ul>
    );
}