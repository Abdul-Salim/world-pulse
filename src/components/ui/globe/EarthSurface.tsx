"use client";

import { useRef } from "react";

import * as THREE from "three";

import { EARTH_RADIUS } from "@/lib/constants";
import EarthMaterial from "@/features/earthquakes/materials/EarthMaterial";
import { useTargetStore } from "@/features/navigator/store/targetStore";

export default function EarthSurface() {
    const mesh = useRef<THREE.Mesh>(null);

    const setTarget = useTargetStore((s) => s.setTarget);

    return (
        <mesh
            ref={mesh}
            onClick={(e) => {
                e.stopPropagation();
                setTarget(null);
            }}
        >
            <sphereGeometry args={[EARTH_RADIUS, 256, 256]} />

            <EarthMaterial />
        </mesh>
    );
}