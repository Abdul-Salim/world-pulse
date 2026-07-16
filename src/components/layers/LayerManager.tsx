"use client";

import { useWorldStore } from "@/store/worldstore";
import { LayerType } from "@/features/earthquakes/types/layers";

import Earthquakes from "./Earthquakes";

export default function LayerManager() {
    const layer = useWorldStore((s) => s.activeLayer);

    return (
        <>
            {layer === LayerType.EARTHQUAKES && (
                <Earthquakes />
            )}
        </>
    );
}