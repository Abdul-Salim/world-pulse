"use client";

import { MeshStandardMaterial } from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import * as THREE from "three";

import { useEarthTextures } from "@/hooks/useEarthTextures";
import {
    EARTH_RADIUS,
    EARTH_ROTATION_SPEED,
} from "@/lib/constants";

export default function EarthSurface() {
    const mesh = useRef<THREE.Mesh>(null);

    const textures = useEarthTextures();

    useFrame((_, delta) => {
        if (!mesh.current) return;

        mesh.current.rotation.y += delta * EARTH_ROTATION_SPEED;
    });

    return (
        <mesh ref={mesh}>
            <sphereGeometry args={[EARTH_RADIUS, 256, 256]} />

            <meshStandardMaterial
                map={textures.day}
                normalMap={textures.normal}
                metalness={0}
                roughness={1}
            />
        </mesh>
    );
}