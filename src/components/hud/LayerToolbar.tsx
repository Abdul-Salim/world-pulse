"use client";

import { LayerType } from "@/features/earthquakes/types/layers";
import { useWorldStore } from "@/store/worldstore";

export default function LayerToolbar() {
    const active = useWorldStore((s) => s.activeLayer);
    const setLayer = useWorldStore((s) => s.setActiveLayer);

    return (
        <div className="absolute left-6 top-6 z-50 flex gap-2">
            {Object.values(LayerType).map((layer) => (
                <button
                    key={layer}
                    onClick={() => setLayer(layer)}
                    className={`rounded border px-3 py-2 text-xs uppercase transition ${active === layer
                        ? "border-cyan-400 bg-cyan-500/20 text-cyan-300"
                        : "border-white/20 text-white"
                        }`}
                >
                    {layer}
                </button>
            ))}
        </div>
    );
}