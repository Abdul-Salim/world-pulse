"use client";

import useEarthquakes from "@/features/earthquakes/hooks/useEarthquakes";
import { latLngToVector } from "@/utils/latLngToVector";
import { EarthquakeMarker } from "@/features/earthquakes";
import { MARKER_RADIUS } from "@/lib/constants";

function getMagnitudeColor(mag: number) {

    if (mag < 2) return "#00e676";

    if (mag < 4) return "#76ff03";

    if (mag < 5) return "#ffeb3b";

    if (mag < 6) return "#ff9800";

    return "#ff1744";
}
export default function Earthquakes() {
    const earthquakes = useEarthquakes();

    return (
        <>
            {earthquakes.map((quake) => {
                const pos = latLngToVector(
                    quake.latitude,
                    quake.longitude,
                    MARKER_RADIUS
                );

                return (
                    <EarthquakeMarker
                        key={quake?.id}
                        quake={quake}
                        position={pos}
                        color={getMagnitudeColor(quake.magnitude)}
                    />
                );
            })}
        </>
    );
}