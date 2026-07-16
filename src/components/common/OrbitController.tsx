"use client";

import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useEffect, useRef } from "react";
import { cameraController } from "@/controllers/CameraController";

export default function OrbitController() {
    const controls = useRef<OrbitControlsImpl>(null);
    useEffect(() => {
        if (!controls.current) return;

        cameraController.registerControls(controls.current);

        return () => {
            cameraController.unregisterControls();
        };
    }, []);

    return (
        <OrbitControls
            ref={controls}
            makeDefault
            enablePan={false}
            enableZoom
            enableRotate
            enableDamping
            dampingFactor={0.08}
            rotateSpeed={0.7}
            minDistance={4}
            maxDistance={10}
        />
    );
}