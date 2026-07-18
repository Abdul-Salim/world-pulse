"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";

import { cameraController } from "@/controllers/CameraController";

type Props = {
    active: boolean;
};

export default function CameraRig({ active }: Props) {
    const { camera } = useThree();

    useEffect(() => {
        cameraController.registerCamera(
            camera as THREE.PerspectiveCamera
        );

        return () => {
            cameraController.unregisterCamera();
        };
    }, [camera]);

    useEffect(() => {
        if (!active) {
            camera.position.set(0, 0, 2.8);
            camera.lookAt(0, 0, 0);
            return;
        }

        gsap.to(camera.position, {
            x: 0.6,
            y: 0.2,
            z: 6,
            duration: 3,
            ease: "power2.out",
        });
    }, [active, camera]);

    return null;
}