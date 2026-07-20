"use client";

import {
    Plane,
    Cloud,
    Satellite,
    TriangleAlert,
} from "lucide-react";

import { useAppStore } from "@/store/appStore";
import { LayerType } from "@/types/layers";

const layers = [
    {
        type: LayerType.EARTHQUAKES,
        label: "Earthquakes",
        icon: TriangleAlert,
    },
    {
        type: LayerType.FLIGHTS,
        label: "Flights",
        icon: Plane,
    },
    {
        type: LayerType.WEATHER,
        label: "Weather",
        icon: Cloud,
    },
    {
        type: LayerType.SATELLITES,
        label: "Satellites",
        icon: Satellite,
    },
];

export default function LayerToolbar() {
    const active = useAppStore((s) => s.activeLayer);
    const setLayer = useAppStore((s) => s.setActiveLayer);

    return (
        <div className="flex gap-2">
            {layers.map(({ type, label, icon: Icon }) => (
                <button
                    key={label}
                    onClick={() => setLayer(type)}
                    className={`flex items-center gap-2 p-2 rounded-xl border border-white/10 bg-black/30 hover:bg-white/5 hover:border-cyan-400/40 backdrop-blur-xl transition-all duration-300 text-xs uppercase transition ${active === type
                        ? "border-cyan-400 bg-cyan-500/20 text-cyan-300"
                        : "border-white/20 text-white"
                        }`}
                >
                    <Icon size={16} />
                    <span>{label}</span>
                </button>
            ))}
        </div>
    );
}