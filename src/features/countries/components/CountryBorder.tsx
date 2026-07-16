"use client";

import { Line } from "@react-three/drei";
import * as THREE from "three";

type Props = {
    points: THREE.Vector3[];
    color?: string;
    opacity?: number;
};

export default function CountryBorder({
    points,
    color = "#7dd3fc",
    opacity = 0.35,
}: Props) {
    return (
        <Line
            points={points}
            color={color}
            lineWidth={1.2}
            transparent
            opacity={opacity}
        />
    );
}