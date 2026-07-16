"use client";

import { useAppStore } from "@/store/appStore";

import { Earthquakes } from "@/features/earthquakes";
import { LayerType } from "@/types/layers";

export default function LayerManager() {
    const layer = useAppStore((s) => s.activeLayer);

    return (
        <>
            {layer === LayerType.EARTHQUAKES && (
                <Earthquakes />
            )}
        </>
    );
}