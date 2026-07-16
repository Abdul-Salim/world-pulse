"use client";

import { Canvas } from "@react-three/fiber";

import Earth from "./Earth";
import Lighting from "./Lighting";
import Stars from "./Stars";
import CameraRig from "./CameraRig";

type EarthSceneProps = {
    active: boolean;
};

export default function EarthScene({ active }: EarthSceneProps) {
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

                <Stars active={active} />

                <Earth active={active} />
            </Canvas>
        </div>
    );
}