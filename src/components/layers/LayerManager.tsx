"use client";

import { useAppStore } from "@/store/appStore";

import { Earthquakes } from "@/features/earthquakes";
import { LayerType } from "@/types/layers";
import NavigationMarker from "@/features/navigator/components/NavigationMarker";
import { FlightLayer } from "@/features/flights";
import VisibilitySystem from "@/features/flights/components/VisibilitySystem";

export default function LayerManager() {
    const layer = useAppStore((s) => s.activeLayer);
    console.log(layer, "layer");
    return (
        <>
            <NavigationMarker />

            {layer === LayerType.EARTHQUAKES && (
                <Earthquakes />
            )}
            {layer === LayerType.FLIGHTS && (
                <><VisibilitySystem /><FlightLayer /></>
            )}
        </>
    );
}