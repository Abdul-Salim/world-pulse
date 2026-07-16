"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import CameraRig from "./CameraRig";
import Lighting from "./Lighting";
import Environment from "./Environment";
import Earth from "./Earth";
import Effects from "./Effects";

type Props = {
    active: boolean;
};

export default function EarthScene({ active }: Props) {
    return (
        <div className="absolute inset-0">
            <Canvas
                camera={{
                    position: [0, 0, 8],
                    fov: 40,
                }}
                dpr={[1, 2]}
            >
                <color attach="background" args={["#000000"]} />

                <CameraRig active={active} />

                <Lighting />

                <Environment active={active} />

                <Earth active={active} />

                <Effects />

                <OrbitControls
                    makeDefault
                    enablePan={false}
                    enableRotate
                    enableZoom
                    enableDamping
                    dampingFactor={0.08}
                    rotateSpeed={0.7}
                    minDistance={4}
                    maxDistance={10}
                    autoRotate={false}
                />
            </Canvas>
        </div>
    );
}