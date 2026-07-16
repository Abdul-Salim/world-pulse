"use client";

import { useRef } from "react";
import * as THREE from "three";

import useEarthTextures from "@/hooks/useEarthTextures";
import {
    CLOUD_RADIUS,
} from "@/lib/constants";

export default function EarthClouds() {
    const clouds = useRef<THREE.Mesh>(null);

    const textures = useEarthTextures();
    return (
        <mesh ref={clouds}>
            <sphereGeometry args={[CLOUD_RADIUS, 256, 256]} />

            <meshStandardMaterial
                map={textures.clouds}
                transparent
                opacity={0.18}
                depthWrite={false}
                alphaTest={0.05}
            />
        </mesh>
    );
}