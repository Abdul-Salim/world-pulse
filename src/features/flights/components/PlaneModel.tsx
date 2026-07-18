"use client";

type Props = {
    color?: string;
};

export default function PlaneModel({
    color = "#38bdf8",
}: Props) {

    const material = (
        <meshBasicMaterial
            color={color}
            toneMapped={false}
        />
    );

    return (
        <group>

            {/* Nose */}
            <mesh position={[0, 0.03, 0]}>
                <coneGeometry args={[0.012, 0.03, 6]} />
                {material}
            </mesh>

            {/* Body */}
            <mesh>
                <cylinderGeometry args={[0.008, 0.008, 0.07, 6]} />
                {material}
            </mesh>

            {/* Main wings */}
            <mesh>
                <boxGeometry args={[0.09, 0.003, 0.018]} />
                {material}
            </mesh>

            {/* Tail wings */}
            <mesh position={[0, -0.025, 0]}>
                <boxGeometry args={[0.04, 0.003, 0.012]} />
                {material}
            </mesh>

        </group>
    );
}