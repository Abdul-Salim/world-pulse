"use client";

import * as THREE from "three";

import Marker from "@/components/common/Marker";
import { cameraController } from "@/controllers/CameraController";

import { useEarthquakeStore } from "@/features/earthquakes";
import { Earthquake } from "@/features/earthquakes/types/earthquake";

import { useTargetStore } from "@/features/navigator/store/targetStore";

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

    const target = useTargetStore(
        (s) => s.target
    );

    const setTarget = useTargetStore(
        (s) => s.setTarget
    );

    const selected =
        target?.id === `quake-${quake.id}`;

    return (
        <Marker
            id={`quake-${quake.id}`}
            position={position}
            size={Math.max(
                0.012,
                quake.magnitude * 0.006
            )}
            color={color}
            pulse={selected || quake.magnitude >= 6}
            onHover={() => setHovered(quake)}
            onHoverEnd={() => setHovered(null)}
            onClick={() => {
                setTarget({
                    id: `quake-${quake.id}`,
                    title: `M ${quake.magnitude.toFixed(1)}`,
                    subtitle: quake.place,
                    lat: quake.latitude,
                    lon: quake.longitude,
                    type: "earthquake",
                    metadata: quake,
                });

                cameraController.flyToLatLng(
                    quake.latitude,
                    quake.longitude
                );
            }}
        />
    );
}