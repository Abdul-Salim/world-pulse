"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { EARTH_RADIUS } from "@/lib/constants";
import { latLngToVector } from "@/utils/latLngToVector";
import { useSatelliteStore } from "../store/satelliteStore";

const ALTITUDE_SCALE = 0.003;
const CAMERA_OFFSET = 2.2;
const SPEED = 0.08;

export default function SatelliteFlyTo() {
    const { camera } = useThree();

    const satelliteMap = useSatelliteStore((s) => s.satelliteMap);

    const selectedSatelliteId = useSatelliteStore(
        (state) => state.selectedSatelliteId
    );

    const targetCamera = useRef(new THREE.Vector3());
    const targetLookAt = useRef(new THREE.Vector3());
    const flying = useRef(false);

    const temp = useMemo(() => new THREE.Vector3(), []);

    useEffect(() => {
        if (!selectedSatelliteId) return;

        const satellite = satelliteMap.get(selectedSatelliteId);

        if (!satellite) return;

        temp.copy(
            latLngToVector(
                satellite.latitude,
                satellite.longitude,
                EARTH_RADIUS + satellite.altitude * ALTITUDE_SCALE
            )
        );

        targetLookAt.current.copy(temp);

        targetCamera.current
            .copy(temp)
            .normalize()
            .multiplyScalar(temp.length() + CAMERA_OFFSET);

        flying.current = true;
    }, [selectedSatelliteId, satelliteMap]);

    useFrame(() => {
        if (!flying.current) return;

        camera.position.lerp(targetCamera.current, SPEED);
        camera.lookAt(targetLookAt.current);

        if (camera.position.distanceTo(targetCamera.current) < 0.02) {
            camera.position.copy(targetCamera.current);
            camera.lookAt(targetLookAt.current);
            flying.current = false;
        }
    });

    return null;
}