import { getConsulting, getConsultingBySlug, getConsultantWithService, getConsultingDetailsBySlug } from "@/action/consulting";
import { create } from "zustand";
import useLanguageStore from "./useLanguageStore";

const useConsultingStore = create((set) => ({
    data: null,
    consulting: null,
    isLoading: true,
    handleGetConsulting: async (queryParams = '', append = false) => {
        set({ isLoading: !append });
        try {
            const locale = useLanguageStore.getState().locale;
            const data = await getConsulting(locale, queryParams);
            console.log(data, 'data from store')
            set((state) => {
                const responseData = data.data || data;
                if (append && state.data?.items) {
                    return {
                        data: {
                            ...responseData,
                            items: [...state.data.items, ...(responseData.items || [])]
                        },
                        isLoading: false
                    };
                }
                return { data: responseData, isLoading: false };
            });

        } catch (error) {
            set({ isLoading: false });
        }
    },

handleGetConsultantWithService: async (slug, queryParams = '') => {
    console.log(slug, 'slug from store')
    set({ isLoading: true, consulting: null });
    try {
        const locale = useLanguageStore.getState().locale;
        const data = await getConsultantWithService(locale, slug, queryParams);
        console.log(data, 'data post from store with service')
        set({ consulting: data?.data || data, isLoading: false });
    } catch (error) {
        set({ isLoading: false });
    }
},
    handleGetConsultingDetailsBySlug: async (slug,queryParams = '') => {
        set({ isLoading: true, consultingDetails: null });
        try {
            const locale = useLanguageStore.getState().locale;
            const data = await getConsultingDetailsBySlug(locale, slug,queryParams);
            console.log(data, 'data post from store')
            set({ consultingDetails: data?.data || data, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
        }
    },
}));

export default useConsultingStore;