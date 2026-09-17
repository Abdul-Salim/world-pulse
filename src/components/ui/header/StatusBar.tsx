"use client";
import { useAppStore } from "@/store/appStore";
import { LayerType } from "@/types/layers";

export default function StatusBar() {
    const layer = useAppStore((s) => s.activeLayer);
    return (
        <div
            className="
                mt-5
                flex
                items-center
                gap-6

                text-xs
                uppercase

                tracking-widest

                text-white/45
            "
        >
            <div className="flex items-center gap-2">

                <div
                    className="
                        h-2
                        w-2

                        rounded-full

                        bg-green-400
                        animate-pulse
                    "
                />

                LIVE

            </div>

            <span className="border border-white/10 bg-black/30 p-2 text-white capitalize cursor-default">
                {layer === LayerType.WEATHER && "Click on a place to view it's weather"}
                {layer === LayerType.SATELLITES && "Click on a satellite to view more details"}
                {layer === LayerType.FLIGHTS && "Zoom in to view more flights. Click on each to view more details"}
                {layer === LayerType.EARTHQUAKES && "Click on a dot to view more detail"}

            </span>

        </div>
    );
}