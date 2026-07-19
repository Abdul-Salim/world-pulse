"use client";

import { useFlightHoverStore } from "../store/flightHoverStore";
import { formatAltitude, formatSpeed } from "../utils/format";

const OFFSET_X = 16;
const OFFSET_Y = 16;

export default function FlightTooltip() {
    const flight = useFlightHoverStore((s) => s.hoveredFlight);
    const pointer = useFlightHoverStore((s) => s.pointer);

    if (!flight) return null;

    return (
        <div
            className="
                pointer-events-none
                fixed
                z-[200]
                min-w-[160px]
                rounded-md
                border
                border-white/10
                bg-black/85
                px-3
                py-2
                text-white
                shadow-xl
                backdrop-blur-sm
            "
            style={{
                left: pointer.x + OFFSET_X,
                top: pointer.y + OFFSET_Y,
            }}
        >
            <div className="flex items-center justify-between gap-4">
                <span className="font-semibold tracking-wide">
                    {flight.callsign?.trim() || flight.icao24}
                </span>

                <span className="text-[10px] uppercase tracking-wider text-white/40">
                    {flight.originCountry}
                </span>
            </div>

            <div className="mt-1 flex items-center gap-3 text-xs text-white/70">
                <span>{formatAltitude(flight.altitude)}</span>
                <span className="text-white/20">•</span>
                <span>{formatSpeed(flight.velocity)}</span>
            </div>
        </div>
    );
}
