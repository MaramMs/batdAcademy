import { create } from "zustand";
import { getPlanBySlug, getPlans } from "@/action/plans";
import useLanguageStore from "./useLanguageStore";

const usePlansStore = create((set) => ({
    data: null,
    items: [],
    isLoading: true,
    handleGetPlans: async (queryParams = '', append = false) => {
        set({ isLoading: !append });
        try {
            const locale = useLanguageStore.getState().locale;
            const data = await  getPlans(locale, queryParams);
            console.log(data, 'data from store')
            set((state) => {
                if (append && state.data?.items) {
                    return {
                        data: {
                            ...data.data,
                            items: [...state.data.items, ...data.data.items]
                        },
                        isLoading: false
                    };
                }
                return { data: data, isLoading: false };
            });

        } catch (error) {
            set({ isLoading: false });
        }
    },


    handleGetPlanBySlug: async (slug, queryParams = "") => {
        set({ plan: null, isLoading: true });
        try {
            const locale = useLanguageStore.getState().locale;
            const data = await getPlanBySlug(locale, slug, queryParams);
            console.log(data, 'data post from store plan')
            set({ plan: data?.data || data, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
        }
    },
    

}));


export default usePlansStore;
