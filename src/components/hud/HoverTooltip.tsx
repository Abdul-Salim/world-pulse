"use client";

import { useWorldStore } from "@/store/worldstore";

export default function HoverTooltip() {
    const quake = useWorldStore(
        s => s.hoveredEarthquake
    );

    if (!quake) return null;

    return (
        <div
            className="
                absolute
                left-6
                bottom-6
                rounded-lg
                bg-black/80
                border
                border-white/10
                px-4
                py-3
                text-white
                pointer-events-none
            "
        >
            <div className="font-semibold">
                M {quake.magnitude}
            </div>

            <div className="text-sm opacity-70">
                {quake.place}
            </div>
        </div>
    );
}