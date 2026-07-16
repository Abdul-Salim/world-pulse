"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useFrame } from "@react-three/fiber";

type Props = {
    active: boolean;
};

export default function CameraRig({ active }: Props) {
    const { camera } = useThree();

    useEffect(() => {
        if (!active) {
            camera.position.set(0, 0, 2.8);
            camera.lookAt(0, 0, 0);
            return;
        }

        gsap.to(camera.position, {
            z: 6,
            duration: 4,
            ease: "power2.out",
        });

        gsap.to(camera.position, {
            x: 0.6,
            duration: 4,
            ease: "power2.out",
        });

        gsap.to(camera.position, {
            y: 0.2,
            duration: 4,
            ease: "power2.out",
        });
    }, [active, camera]);

    useFrame((state) => {
        if (!active) return;

        const t = state.clock.elapsedTime;

        const baseX = 0.6;
        const baseY = 0.2;

        camera.position.x = baseX + Math.sin(t * 0.15) * 0.02;
        camera.position.y = baseY + Math.cos(t * 0.12) * 0.015;

        camera.lookAt(1.1, -0.25, 0);
    });

    return null;
}