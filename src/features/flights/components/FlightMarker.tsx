"use client";

import { useRef } from "react";
import * as THREE from "three";
import { ThreeEvent, useFrame, useLoader, useThree } from "@react-three/fiber";

import { useTargetStore } from "@/features/navigator/store/targetStore";

import { Flight } from "../types/flight";
import { useFlightHoverStore } from "../store/flightHoverStore";

type Props = {
    flight: Flight;
    position: THREE.Vector3;
};

export default function FlightMarker({
    flight,
    position,
}: Props) {
    const texture = useLoader(
        THREE.TextureLoader,
        "/icons/plane.png"
    );

    const meshRef = useRef<THREE.Mesh>(null);

    const { camera } = useThree();

    const setTarget = useTargetStore(
        (s) => s.setTarget
    );

    const target = useTargetStore(
        (s) => s.target
    );

    const setHoveredFlight = useFlightHoverStore(
        (s) => s.setHoveredFlight
    );

    const selected =
        target?.id === `flight-${flight.id}`;

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();

        setTarget({
            id: `flight-${flight.id}`,
            title: flight.callsign,
            subtitle: `${flight.originCountry} • ${flight.callsign.trim()}`,
            lat: flight.latitude,
            lon: flight.longitude,
            type: "flight",
            metadata: flight,
        });
    };

    const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();

        document.body.style.cursor = "pointer";

        setHoveredFlight(flight, {
            x: e.clientX,
            y: e.clientY,
        });
    };

    const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();

        setHoveredFlight(flight, {
            x: e.clientX,
            y: e.clientY,
        });
    };

    const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();

        document.body.style.cursor = "default";

        setHoveredFlight(null);
    };

    useFrame(() => {
        if (!meshRef.current) return;

        // Face the camera
        meshRef.current.lookAt(camera.position);

        // Rotate aircraft according to heading
        meshRef.current.rotateZ(
            THREE.MathUtils.degToRad(flight.heading)
        );
    });

    return (
        <mesh
            ref={meshRef}
            position={position}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerMove={handlePointerMove}
            onPointerOut={handlePointerOut}
        >
            <planeGeometry args={[0.06, 0.06]} />

            <meshBasicMaterial
                map={texture}
                transparent
                alphaTest={0.1}
                depthWrite={false}
                toneMapped={false}
                color={
                    selected
                        ? "#22c55e"
                        : "#ffffff"
                }
            />
        </mesh>
    );
}
