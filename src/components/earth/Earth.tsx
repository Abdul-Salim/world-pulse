"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

import EarthSurface from "./EarthSurface";
import EarthClouds from "./EarthClouds";
import Atmosphere from "./Atmosphere";

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

    return (
        <group
            ref={group}
            position={[1.2, 0, 0]}
        >
            <EarthSurface />

            <EarthClouds />

            <Atmosphere />
        </group>
    );
}