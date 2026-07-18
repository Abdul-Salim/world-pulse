"use client";

import { useAppStore } from "@/store/appStore";

import { Earthquakes } from "@/features/earthquakes";
import { LayerType } from "@/types/layers";
import NavigationMarker from "@/features/navigator/components/NavigationMarker";

export default function LayerManager() {
    const layer = useAppStore((s) => s.activeLayer);

    return (
        <>
            <NavigationMarker />

            {layer === LayerType.EARTHQUAKES && (
                <Earthquakes />
            )}
        </>
    );
}