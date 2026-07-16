"use client";

export default function Lighting() {
    return (
        <>
            <ambientLight intensity={0.03} />

            <directionalLight
                position={[12, 3, 8]}
                intensity={5}
            />

            <directionalLight
                position={[-10, -4, -8]}
                intensity={0.15}
                color="#2a5cff"
            />
        </>
    );
}