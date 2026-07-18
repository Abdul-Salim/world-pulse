import { Flight, ScoredFlight } from "../types/flight";

export function getFlightPriority(
    flight: Flight
): number {

    if (flight.onGround) {
        return -Infinity;
    }

    return (
        flight.altitude * 0.4 +
        flight.velocity * 0.3
    );
}

export function scoreFlights(
    flights: Flight[]
): ScoredFlight[] {

    return flights.map(flight => ({
        flight,
        score: getFlightPriority(flight),
    }));
}