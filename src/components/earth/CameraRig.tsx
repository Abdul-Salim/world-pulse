"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";

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

    return null;
}