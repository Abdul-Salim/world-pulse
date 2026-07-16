"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ThreeEvent } from "@react-three/fiber";

type MarkerProps = {
    id: string;
    position: THREE.Vector3;
    radius?: number;
    color?: string;
    pulse?: boolean;
    onHover?: () => void;
    onHoverEnd?: () => void;
    onClick?: () => void;
};

export default function Marker({
    id,
    position,
    radius = 0.02,
    color = "#ff3b30",
    pulse = false,
    onHover,
    onHoverEnd,
    onClick,
}: MarkerProps) {
    const meshRef = useRef<THREE.Mesh>(null);

    const pulseTween = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        if (!meshRef.current) return;

        pulseTween.current?.kill();

        meshRef.current.scale.setScalar(1);

        if (!pulse) return;

        pulseTween.current = gsap.to(meshRef.current.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        return () => {
            pulseTween.current?.kill();
        };
    }, [pulse]);

    return (
        <mesh
            ref={meshRef}
            name={id}
            position={position}
            onPointerOver={(e) => {
                e.stopPropagation();

                document.body.style.cursor = "pointer";

                onHover?.();
            }}
            onPointerOut={(e) => {
                e.stopPropagation();

                document.body.style.cursor = "default";

                onHoverEnd?.();
            }}
            onClick={(e: ThreeEvent<MouseEvent>) => {
                e.stopPropagation();
                onClick?.();
            }}

        >
            <sphereGeometry args={[radius, 8, 8]} />

            <meshBasicMaterial
                color={color}
                toneMapped={false}
            />
        </mesh>
    );
}