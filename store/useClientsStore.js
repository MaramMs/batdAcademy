import { create } from "zustand";
import { getClients } from "@/action/clients";
import useLanguageStore from "./useLanguageStore";

const useClientsStore = create((set) => ({
    clients: [],
    handleGetClients: async () => {
        const locale = useLanguageStore.getState().locale;
        const data = await getClients(locale);
        set({ clients: data.data.clients });
    },
}));

export default useClientsStore;