"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MapPin } from "lucide-react";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { EARTH_RADIUS } from "@/lib/constants";
import { latLngToVector } from "@/utils/latLngToVector";

import { useNavigationStore } from "../store/navigationStore";

const MARKER_OFFSET = 0.05;

export default function NavigationMarker() {
    const group = useRef<THREE.Group>(null);

    const target = useNavigationStore((s) => s.target);

    const position = useMemo(() => {
        if (!target) return null;

        return latLngToVector(
            target.lat,
            target.lon,
            EARTH_RADIUS + MARKER_OFFSET
        );
    }, [target]);

    useFrame((state) => {
        if (!group.current || !position) return;

        const time = state.clock.elapsedTime;

        group.current.position.copy(position);

        const scale =
            1 + Math.sin(time * 4) * 0.15;

        group.current.scale.setScalar(scale);
    });

    if (!position) return null;

    return (
        <group ref={group} position={position}>
            <Html
                center
                distanceFactor={8}
                occlude={false}
            >
                <MapPin
                    size={5}
                    className="text-cyan-400 fill-cyan-400 drop-shadow-lg"
                />
            </Html>
        </group>
    );
}