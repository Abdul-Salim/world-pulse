import { Flight } from "../types/flight";

export function getFlightScore(
    flight: Flight
) {

    return (

        flight.altitude * 0.5 +

        flight.velocity * 0.3

    );

}