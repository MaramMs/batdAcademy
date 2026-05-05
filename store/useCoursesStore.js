import { create } from "zustand";
import useLanguageStore from "./useLanguageStore";
import { getCourses } from "@/action/courses";

const useCoursesStore = create((set) => ({
    courses: [],
    isLoading: true,
    handleGetCourses: async (queryParams='', append=false) => {
        set({ isLoading: !append }); 
        try {
            const locale = useLanguageStore.getState().locale;
            const data = await getCourses(locale,queryParams);
            console.log(data , 'data from store')
            set((state) => {
                if (append && state.courses?.courses) {
                    return {
                        courses: {
                            ...data.data,
                            courses: [...state.courses.courses, ...data.data.courses]
                        },
                        isLoading: false
                    };
                }
                return { courses: data.data.courses, isLoading: false };
            });
        } catch (error) {
            set({ isLoading: false });
        }
    },


    // handleGetCourseBySlug: async (slug) => {
    //     try {
    //         const locale = useLanguageStore.getState().locale;
    //         const data = await getCourseBySlug(locale, slug);
    //         console.log(data?.data,'data post from store')
    //         set({ course: data?.data, isLoading: false });
    //     } catch (error) {
    //         set({ isLoading: false });
    //     }
    // },
}));

export default useCoursesStore;