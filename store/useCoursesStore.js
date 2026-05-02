import { getCourses } from "@/action/courses";
import { create } from "zustand";
import useLanguageStore from "./useLanguageStore";

const useCoursesStore = create((set) => ({
    courses: [],
    handleGetCourses: async () => {
        const locale = useLanguageStore.getState().locale;
        const data = await getCourses(locale);
        set({ courses: data.data.courses });
    },
}));

export default useCoursesStore;