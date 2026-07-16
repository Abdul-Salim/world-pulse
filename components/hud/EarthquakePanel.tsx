"use client";

import { useEarthquakeStore } from "@/features/earthquakes";

export default function EarthquakePanel() {

    const quake =
        useEarthquakeStore(
            s => s.selectedEarthquake
        );

    if (!quake) return null;

    return (
        <div className="
            absolute
            right-8
            top-8
            w-80
            rounded-lg
            border
            border-white/10
            bg-black/70
            p-6
            text-white
            backdrop-blur
        ">
            <h2 className="text-xl font-bold">
                M {quake.magnitude}
            </h2>

            <p>{quake.place}</p>

            <p className="mt-4">
                Depth: {quake.depth} km
            </p>

            <p>
                {new Date(quake.time)
                    .toLocaleString()}
            </p>
        </div>
    );
}