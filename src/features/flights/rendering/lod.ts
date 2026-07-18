import { ScoredFlight } from "../types/flight";

export type FlightZoomLevel =
    | "WORLD"
    | "CONTINENT"
    | "REGION"
    | "LOCAL";

export interface FlightLOD {
    maxCandidates: number;
    gridSize: number;
}

const LODS: Record<FlightZoomLevel, FlightLOD> = {
    WORLD: {
        maxCandidates: 300,
        gridSize: 48,
    },

    CONTINENT: {
        maxCandidates: 600,
        gridSize: 36,
    },

    REGION: {
        maxCandidates: 1200,
        gridSize: 24,
    },

    LOCAL: {
        maxCandidates: Infinity,
        gridSize: 16,
    },
};

export function getFlightLOD(
    zoom: FlightZoomLevel
): FlightLOD {
    return LODS[zoom];
}

export function applyLOD(
    flights: ScoredFlight[],
    zoom: FlightZoomLevel
): ScoredFlight[] {

    const lod = getFlightLOD(zoom);

    const sorted = [...flights].sort(
        (a, b) => b.score - a.score
    );

    if (lod.maxCandidates === Infinity) {
        return sorted;
    }

    return sorted.slice(0, lod.maxCandidates);
}