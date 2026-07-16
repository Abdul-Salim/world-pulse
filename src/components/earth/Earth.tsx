"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useFrame } from "@react-three/fiber";

import EarthSurface from "./EarthSurface";
import EarthClouds from "./EarthClouds";
import Atmosphere from "./Atmosphere";
import LayerManager from "../layers/LayerManager";

type Props = {
    active?: boolean;
};

export default function Earth({ active = false }: Props) {
    const group = useRef<THREE.Group>(null);

    useEffect(() => {
        if (!group.current) return;

        if (!active) {
            group.current.scale.setScalar(0.8);
            return;
        }

        gsap.to(group.current.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 3,
            ease: "power2.out",
        });
    }, [active]);

    useFrame((_, delta) => {
        if (!group.current) return;

        group.current.rotation.y += delta * 0.008;
    });

    return (
        <group
            ref={group}
            position={[1.1, -0.25, 0]}
        >
            <EarthSurface />

            <EarthClouds />

            {/* <Atmosphere /> */}
            <LayerManager />

        </group>
    );
}