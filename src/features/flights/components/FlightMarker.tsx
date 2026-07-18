"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";

import { cameraController } from "@/controllers/CameraController";
import { useNavigationStore } from "@/features/navigator/store/navigationStore";

import { Flight } from "../types/flight";

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

    const setTarget = useNavigationStore(
        (s) => s.setTarget
    );

    const target = useNavigationStore(
        (s) => s.target
    );

    const selected =
        target?.id === `flight-${flight.id}`;

    const handleClick = () => {
        setTarget({
            id: `flight-${flight.id}`,
            title: flight.callsign,
            subtitle: `${flight.originCountry} • ${flight.callsign.trim()}`,
            lat: flight.latitude,
            lon: flight.longitude,
            type: "flight",
            metadata: flight,
        });

        cameraController.flyToLatLng(
            flight.latitude,
            flight.longitude,
            {
                distance: 2.2,
            }
        );
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
        >
            {/* <planeGeometry args={[0.06, 0.06]} /> */}

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