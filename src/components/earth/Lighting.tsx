"use client";

export default function Lighting() {
    return (
        <>
            <ambientLight intensity={0.08} />

            <directionalLight
                position={[12, 4, 8]}
                intensity={3.5}
                color="#ffffff"
            />

            <directionalLight
                position={[-6, -3, -5]}
                intensity={0.12}
                color="#2d5cff"
            />
        </>
    );
}