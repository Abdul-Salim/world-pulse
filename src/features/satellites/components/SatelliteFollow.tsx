"use client";

import { useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { latLngToVector } from "@/utils/latLngToVector";
import { EARTH_RADIUS } from "@/lib/constants";
import { useSatelliteStore } from "../store/satelliteStore";

const ALTITUDE_SCALE = 0.003;
const CAMERA_OFFSET = 2.2;
const SMOOTHING = 0.08;

export default function SatelliteFollow() {
    const { camera } = useThree();

    const satelliteMap = useSatelliteStore((s) => s.satelliteMap);

    const followedSatelliteId = useSatelliteStore(
        (state) => state.followedSatelliteId
    );

    const target = useMemo(() => new Vector3(), []);
    const position = useMemo(() => new Vector3(), []);

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
    });

    return null;
}