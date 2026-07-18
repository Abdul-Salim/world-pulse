import { create } from "zustand";

import { Flight } from "../types/flight";

interface VisibleFlightState {
    visibleFlights: Flight[];
    setVisibleFlights: (flights: Flight[]) => void;
}

export const useVisibleFlightStore =
    create<VisibleFlightState>((set) => ({
        visibleFlights: [],
        setVisibleFlights: (visibleFlights) =>
            set({ visibleFlights }),
    }));