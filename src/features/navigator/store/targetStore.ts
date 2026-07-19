import { create } from "zustand";

// This store holds whatever is currently "selected" on the globe -
// an earthquake, a flight, a searched city/country, or a weather
// sample point - and drives the MissionPanel + NavigationMarker.
//
// Not to be confused with `navigatorStore`, which only tracks the
// open/closed state of the search command palette.

export interface NavigationTarget {
    id: string;
    title: string;
    subtitle: string;

    lat: number;
    lon: number;

    type: "city" | "country" | "earthquake" | "flight" | "weather";

    metadata?: unknown;
}

type TargetState = {
    target: NavigationTarget | null;

    setTarget: (
        target: NavigationTarget | null
    ) => void;
};

export const useTargetStore =
    create<TargetState>((set) => ({
        target: null,

        setTarget: (target) =>
            set({
                target,
            }),
    }));
