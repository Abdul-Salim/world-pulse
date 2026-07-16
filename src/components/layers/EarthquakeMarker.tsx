"use client";

import * as THREE from "three";

import Marker from "@/components/common/Marker";
import { Earthquake } from "@/features/earthquakes/types/earthquake";
import { useWorldStore } from "@/store/worldstore";

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
    const setHovered = useWorldStore(
        (s) => s.setHoveredEarthquake
    );

    const setSelected = useWorldStore(
        (s) => s.setSelectedEarthquake
    );

    const setCameraTarget = useWorldStore(
        (s) => s.setCameraTarget
    );

    const selected = useWorldStore(
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
                setCameraTarget(position.clone());
            }}
        />
    );
}