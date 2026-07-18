"use client";

import { useRef } from "react";

import * as THREE from "three";

import { EARTH_RADIUS } from "@/lib/constants";
import EarthMaterial from "@/features/earthquakes/materials/EarthMaterial";

export default function EarthSurface() {
    const mesh = useRef<THREE.Mesh>(null);

    return (
        <mesh onClick={() => console.log("Clear")}
            ref={mesh}>
            <sphereGeometry args={[EARTH_RADIUS, 256, 256]} />

            <EarthMaterial />
        </mesh>
    );
}