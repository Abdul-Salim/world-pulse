"use client";

import useEarthquakes from "@/hooks/useEarthquakes";
import { latLngToVector } from "@/utils/latLngToVector";
import EarthquakeMarker from "./EarthquakeMarker";

function getMagnitudeColor(mag: number) {
    if (mag >= 7) return "#ff1744";

    if (mag >= 5) return "#ff9100";

    if (mag >= 3) return "#ffd600";

    return "#66bb6a";
}

export default function Earthquakes() {
    const earthquakes = useEarthquakes();

    return (
        <>
            {earthquakes.map((quake) => {
                const pos = latLngToVector(
                    quake.latitude,
                    quake.longitude,
                    2.03
                );

                return (
                    <EarthquakeMarker
                        key={quake.id}
                        position={pos}
                        magnitude={quake.magnitude}
                        color={getMagnitudeColor(quake.magnitude)}
                    />
                );
            })}
        </>
    );
}