"use client";

import * as THREE from "three";

import Marker from "@/components/common/Marker";
import { Earthquake } from "@/features/earthquakes/types/earthquake";
import { useEarthquakeStore } from "@/features/earthquakes";
import { useAppStore } from "@/store/appStore";
import { cameraController } from "@/controllers/CameraController";
type Props = {
    quake: Earthquake;
    position: THREE.Vector3;
    color: string;
};

export default function EarthquakeMarker({
    quake,
    position,
    color,
}: Props) {
    const setHovered = useEarthquakeStore(
        (s) => s.setHoveredEarthquake
    );

    const setSelected = useEarthquakeStore(
        (s) => s.setSelectedEarthquake
    );


    const selected = useEarthquakeStore(
        s => s.selectedEarthquake?.id === quake.id
    );

    return (
        <Marker
            id={`quake-${quake.id}`}
            position={position}
            radius={Math.max(0.012, quake.magnitude * 0.006)}
            color={color}
            pulse={selected || quake.magnitude >= 6}
            onHover={() => setHovered(quake)}
            onHoverEnd={() => setHovered(null)}
            onClick={() => {
                setSelected(quake);
                cameraController.flyTo(position);
            }}
        />
    );
}