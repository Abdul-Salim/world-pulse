"use client";

import { Line } from "@react-three/drei";
import * as THREE from "three";
import { Country } from "../types/country";
import { useSelectedRegionStore } from "@/features/region/store/selectedRegionStore";

type Props = {
    points: THREE.Vector3[];
    color?: string;
    opacity?: number;
    country: Country
};

export default function CountryBorder({
    points,
    color = "#7dd3fc",
    opacity = 0.35,
    country
}: Props) {
    const setSelectedRegion = useSelectedRegionStore(
        (state) => state.setSelectedRegion
    );

    return (
        <Line
            points={points}
            color={color}
            lineWidth={1.2}
            transparent
            opacity={opacity}
            onClick={() => setSelectedRegion({
                id: country.id,
                name: country.name,
                bounds: country.bounds,
            })}
        />
    );
}