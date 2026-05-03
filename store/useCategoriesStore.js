import { create } from "zustand";
import { getCategories } from "@/action/categories";
import useLanguageStore from "./useLanguageStore";

const useCategoriesStore = create((set) => ({
    categories: [],
    handleGetCategories: async () => {
        const locale = useLanguageStore.getState().locale;
        const data = await getCategories(locale);
        set({ categories: data.data });
    },
}));

export default useCategoriesStore;