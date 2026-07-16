"use client";

export default function Lighting() {
    return (
        <>
            <ambientLight intensity={1.2} />

            <directionalLight
                position={[8, 5, 5]}
                intensity={1.5}
            />

            <directionalLight
                position={[-8, -5, -5]}
                intensity={0.9}
            />
        </>
    );
}