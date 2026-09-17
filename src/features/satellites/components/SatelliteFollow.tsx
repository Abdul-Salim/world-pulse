"use client";

import { useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

import { latLngToVector } from "@/utils/latLngToVector";
import { EARTH_RADIUS } from "@/lib/constants";
import { cameraController } from "@/controllers/CameraController";
import { useSatelliteStore } from "../store/satelliteStore";

const ALTITUDE_SCALE = 0.003;
const CAMERA_OFFSET = 2.2;
const SMOOTHING = 0.08;

export default function SatelliteFollow() {
    const camera = useThree((state) => state.camera);

    const satelliteMap = useSatelliteStore((s) => s.satelliteMap);

    const followedSatelliteId = useSatelliteStore(
        (state) => state.followedSatelliteId
    );

    const target = useMemo(() => new Vector3(), []);
    const position = useMemo(() => new Vector3(), []);

    useEffect(() => {
        if (!followedSatelliteId) return;

        // Take exclusive ownership of the camera. OrbitControls skips its own
        // update() while disabled, so the two systems stop fighting over
        // camera.position / camera.quaternion every frame.
        // NB: this mutates cameraController's own `controls` field, not a
        // value returned from useThree/any hook — those are frozen in dev by
        // React Compiler and throw on mutation.
        cameraController.setControlsEnabled(false);

        return () => {
            cameraController.setControlsEnabled(true);

            // Switching from one followed satellite to another: the next
            // effect takes over immediately, don't fly home in between.
            if (useSatelliteStore.getState().followedSatelliteId) return;

            camera.up.set(0, 1, 0);

            // Hands the camera back to OrbitControls in a coherent state:
            // tweens controls.target from the satellite back to the origin
            // and the distance back to RESET_DISTANCE.
            cameraController.reset();
        };
    }, [followedSatelliteId, camera]);

    useFrame(() => {
        if (!followedSatelliteId) return;

        const satellite = satelliteMap.get(followedSatelliteId);

        if (!satellite) return;

        target.copy(
            latLngToVector(
                satellite.latitude,
                satellite.longitude,
                EARTH_RADIUS + satellite.altitude * ALTITUDE_SCALE
            )
        );

        position
            .copy(target)
            .normalize()
            .multiplyScalar(target.length() + CAMERA_OFFSET);

        camera.position.lerp(position, SMOOTHING);
        camera.lookAt(target);

        // Keep controls.target tracking the satellite so whatever state we
        // hand back to OrbitControls on unfollow is already coherent.
        cameraController.lerpControlsTarget(target, SMOOTHING);
    });

    return null;
}