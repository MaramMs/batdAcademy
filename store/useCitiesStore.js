import { getCities } from "@/action/cities";
import { create } from "zustand";
import useLanguageStore from "./useLanguageStore";

const useCitiesStore = create((set) => ({
    cities: [],
    isLoading: true,
    handleGetCities: async () => {
        set({ isLoading: true });
        const locale = useLanguageStore.getState().locale;
        const data = await getCities(locale);
        set({ cities: data.data.cities , isLoading: false });
    },
}));

export default useCitiesStore;