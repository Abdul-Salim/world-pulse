import { create } from "zustand";

type NavigatorState = {
    open: boolean;
    query: string;
    selectedIndex: number;

    setOpen: (open: boolean) => void;
    setQuery: (query: string) => void;
    setSelectedIndex: (index: number) => void;

    clear: () => void;
};

export const useNavigatorStore =
    create<NavigatorState>((set) => ({
        open: false,
        query: "",
        selectedIndex: 0,

        setOpen: (open) =>
            set({
                open,
            }),

        setQuery: (query) =>
            set({
                query,
                selectedIndex: 0,
            }),

        setSelectedIndex: (selectedIndex) =>
            set({
                selectedIndex,
            }),

        clear: () =>
            set({
                open: false,
                query: "",
                selectedIndex: 0,
            }),
    }));