import { useState, useEffect, useRef } from 'react';
import { getCourses } from '@/action/courses';
import useLanguageStore from '@/store/useLanguageStore';

export default function useSearchAutocomplete() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const abortRef = useRef(null);
    const locale = useLanguageStore((s) => s.locale);
    console.log(query , 'query from hook')
    console.log(suggestions , 'sug from hook')

    useEffect(() => {
        // Less than 2 chars → clear suggestions, no fetch
        if (query.length < 2) {
            setSuggestions([]);
            return;
        }

        // Debounce 300ms
        const timer = setTimeout(async () => {
            // Cancel previous request
            if (abortRef.current) abortRef.current.abort();
            abortRef.current = new AbortController();

            setIsLoading(true);
            try {
                const data = await getCourses(locale, `?search=${query}`);
                console.log(data, 'data from hook sugg')
                // We only want a short list for suggestions (max 6)
                setSuggestions(data?.data?.courses?.slice(0, 6) || []);
            } catch (err) {
                if (err.name !== 'AbortError') setSuggestions([]);
            } finally {
                setIsLoading(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query, locale]);

    const clearSuggestions = () => setSuggestions([]);

    return { query, setQuery, suggestions, isLoading, clearSuggestions };
}