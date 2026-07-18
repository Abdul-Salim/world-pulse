"use client";

import FlightMarker from "./FlightMarker";

import { EARTH_RADIUS } from "@/lib/constants";
import { latLngToVector } from "@/utils/latLngToVector";

import { useVisibleFlightStore } from "../store/visibilityStore";

export default function FlightLayer() {

    const flights =
        useVisibleFlightStore(
            s => s.visibleFlights
        );

    return (
        <>
            {flights.map((flight) => (
                <FlightMarker
                    key={flight.id}
                    flight={flight}
                    position={latLngToVector(
                        flight.latitude,
                        flight.longitude,
                        EARTH_RADIUS + 0.03
                    )}
                />
            ))}
        </>
    );
}