import { create } from "zustand";

export interface NavigationTarget {
    id: string;
    title: string;
    subtitle: string;

    lat: number;
    lon: number;

    type: "city" | "country" | "earthquake" | "flight";

    metadata?: unknown;
}

type NavigationState = {
    target: NavigationTarget | null;

    setTarget: (
        target: NavigationTarget | null
    ) => void;
};

export const useNavigationStore =
    create<NavigationState>((set) => ({
        target: null,

        setTarget: (target) =>
            set({
                target,
            }),
    }));