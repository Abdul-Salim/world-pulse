import { create } from "zustand";

import { Flight } from "../types/flight";

type PointerPosition = { x: number; y: number };

type FlightHoverState = {
    hoveredFlight: Flight | null;
    pointer: PointerPosition;

    setHoveredFlight: (
        flight: Flight | null,
        pointer?: PointerPosition
    ) => void;
};

export const useFlightHoverStore = create<FlightHoverState>((set) => ({
    hoveredFlight: null,
    pointer: { x: 0, y: 0 },

    setHoveredFlight: (flight, pointer) =>
        set((state) => ({
            hoveredFlight: flight,
            pointer: pointer ?? state.pointer,
        })),
}));
