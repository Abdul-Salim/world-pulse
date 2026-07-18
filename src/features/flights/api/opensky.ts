import { Flight } from "../types/flight";

function mapFlights(states: any[]): Flight[] {

    return states
        .filter((state) => state[5] && state[6])
        .map((state): Flight => ({
            id: state[0],

            icao24: state[0],

            callsign: state[1]?.trim() ?? "Unknown",

            airline: undefined,

            originCountry: state[2],

            lastContact: state[4],

            longitude: state[5],

            latitude: state[6],

            altitude: state[7] ?? 0,

            onGround: state[8],

            velocity: state[9] ?? 0,

            heading: state[10] ?? 0,

            verticalRate: state[11] ?? 0,

            updatedAt: Date.now(),
        }));
}

export async function fetchFlights(): Promise<Flight[]> {
    const response = await fetch("/api/flights");

    if (!response.ok) {
        throw new Error("Unable to fetch flights");
    }

    const data = await response.json();

    return mapFlights(data.states ?? []);
}