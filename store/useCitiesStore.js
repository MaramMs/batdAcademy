import { getCities } from "@/action/cities";
import { create } from "zustand";
import useLanguageStore from "./useLanguageStore";

const useCitiesStore = create((set) => ({
    cities: [],
    handleGetCities: async () => {
        const locale = useLanguageStore.getState().locale;
        const data = await getCities(locale);
        set({ cities: data.data.cities });
    },
}));

export default useCitiesStore;