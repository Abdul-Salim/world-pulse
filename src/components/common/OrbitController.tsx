"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { cameraController } from "@/controllers/CameraController";
import { EARTH_RADIUS } from "@/lib/constants";

const MIN_DISTANCE = EARTH_RADIUS + 1;
const MAX_DISTANCE = 18;
const POLE_GUARD = 0.15;

export default function OrbitController() {
    const controls = useRef<OrbitControlsImpl>(null);
    useEffect(() => {
        if (!controls.current) return;

        cameraController.registerControls(controls.current);

        return () => {
            cameraController.unregisterControls();
        };
    }, []);

    useFrame(({ camera }) => {
        if (!controls.current) return;

        const distance = camera.position.length();
        const t = THREE.MathUtils.clamp(
            (distance - MIN_DISTANCE) / (MAX_DISTANCE - MIN_DISTANCE),
            0,
            1
        );

        controls.current.rotateSpeed = THREE.MathUtils.lerp(0.25, 0.9, t);
        controls.current.dampingFactor = THREE.MathUtils.lerp(0.12, 0.06, t);
    });

    return (
        <OrbitControls
            ref={controls}
            makeDefault
            enablePan={false}
            enableZoom
            enableRotate
            enableDamping
            zoomSpeed={0.8}
            zoomToCursor
            minDistance={MIN_DISTANCE}
            maxDistance={MAX_DISTANCE}
            minPolarAngle={POLE_GUARD}
            maxPolarAngle={Math.PI - POLE_GUARD}
        />
    );
}