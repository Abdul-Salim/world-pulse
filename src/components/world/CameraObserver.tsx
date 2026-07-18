"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useCameraStore } from "@/store/cameraStore";

export default function CameraObserver() {

    const previousDistance =
        useRef(-1);

    const setDistance =
        useCameraStore(
            s => s.setDistance
        );

    useFrame(({ camera }) => {

        const distance =
            camera.position.length();

        if (
            Math.abs(
                previousDistance.current -
                distance
            ) < 0.05
        ) {
            return;
        }

        previousDistance.current =
            distance;

        setDistance(distance);

    });

    return null;
}