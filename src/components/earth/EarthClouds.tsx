"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import useEarthTextures from "@/hooks/useEarthTextures";
import {
    CLOUD_RADIUS,
    CLOUD_ROTATION_SPEED,
} from "@/lib/constants";

export default function EarthClouds() {
    const clouds = useRef<THREE.Mesh>(null);

    const textures = useEarthTextures();

    useFrame((_, delta) => {
        if (!clouds.current) return;

        clouds.current.rotation.y +=
            delta * CLOUD_ROTATION_SPEED;
    });

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