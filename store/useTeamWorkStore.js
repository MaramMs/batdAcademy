import { getTeamWork } from "@/action/teamWork";
import { create } from "zustand";
import useLanguageStore from "./useLanguageStore";

const useTeamWorkStore = create((set) => ({
    teamWork: [],
    handleGetTeamWork: async () => {
        const locale = useLanguageStore.getState().locale;
        const data = await getTeamWork(locale);
        set({ teamWork: data?.data?.teams });
    },
}));

export default useTeamWorkStore;