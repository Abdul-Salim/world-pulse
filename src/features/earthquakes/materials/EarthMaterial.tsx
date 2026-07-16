"use client";

import { MeshStandardMaterial } from "three";
import useEarthTextures from "@/features/earthquakes/hooks/useEarthTextures";

export default function EarthMaterial() {
    const textures = useEarthTextures();

    return (
        <meshStandardMaterial
            map={textures.day}
            normalMap={textures.normal}
            roughness={1}
            metalness={0}
        />
    );
}