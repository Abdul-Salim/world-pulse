"use client";

import { useRef } from "react";
import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { Country } from "../types/country";
import { useSelectedRegionStore } from "@/features/region/store/selectedRegionStore";
import { useCameraStore } from "@/store/cameraStore";

type Props = {
    points: THREE.Vector3[];
    color?: string;
    country: Country;
};

const NEAR_DISTANCE = 3;
const FAR_DISTANCE = 12;
const NEAR_OPACITY = 0.6;
const FAR_OPACITY = 0.12;

export default function CountryBorder({
    points,
    color = "#eaeaea",
    country,
}: Props) {
    const lineRef = useRef<any>(null);

    const setSelectedRegion = useSelectedRegionStore(
        (state) => state.setSelectedRegion
    );

    useFrame(() => {
        const material = lineRef.current?.material;
        if (!material) return;

        const distance = useCameraStore.getState().distance;

        const closeness =
            1 - THREE.MathUtils.smoothstep(distance, NEAR_DISTANCE, FAR_DISTANCE);

        material.opacity = THREE.MathUtils.lerp(
            FAR_OPACITY,
            NEAR_OPACITY,
            closeness
        );
    });

    return (
        <Line
            ref={lineRef}
            points={points}
            color={color}
            lineWidth={1.2}
            transparent
            opacity={FAR_OPACITY}
            onClick={() =>
                setSelectedRegion({
                    id: country.id,
                    name: country.name,
                    bounds: country.bounds,
                })
            }
        />
    );
}