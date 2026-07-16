"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Props = {
    position: THREE.Vector3;
    magnitude: number;
    color: string;
};

export default function EarthquakeMarker({
    position,
    magnitude,
    color,
}: Props) {
    const mesh = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!mesh.current) return;

        const pulse =
            1 + Math.sin(state.clock.elapsedTime * 4) * 0.2;

        mesh.current.scale.setScalar(pulse);
    });

    return (
        <mesh
            ref={mesh}
            position={position}
        >
            <sphereGeometry
                args={[
                    Math.max(0.012, magnitude * 0.006),
                    12,
                    12,
                ]}
            />

            <meshBasicMaterial color={color} />
        </mesh>
    );
}