import { create } from "zustand";

import { Flight } from "../types/flight";

interface FlightState {
    flights: Flight[];
    loading: boolean;
    error?: string;

    setFlights: (flights: Flight[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error?: string) => void;
}

export const useFlightStore = create<FlightState>((set) => ({
    flights: [],
    loading: false,

    setFlights: (flights) => set({ flights }),

    setLoading: (loading) => set({ loading }),

    setError: (error) => set({ error }),
}));