"use client";

import { Canvas } from "@react-three/fiber";

import CameraRig from "./CameraRig";
import Lighting from "./Lighting";
import Environment from "./Environment";
import Earth from "./Earth";
import Effects from "./Effects";
import OrbitController from "@/components/common/OrbitController";
import { CountryBorders } from "@/features/countries";
import CountryMeshes from "@/features/countries/components/CountryMeshes";
import CameraObserver from "@/components/world/CameraObserver";
import CountryLabels from "@/features/countries/components/CountryLabels";

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

                <CountryMeshes />
                <CountryBorders />
                <CountryLabels />

                <Effects />
                <CameraObserver />
                <OrbitController />
            </Canvas>
        </div>
    );
}