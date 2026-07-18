"use client";

import { Stars as DreiStars } from "@react-three/drei";

type Props = {
    active: boolean;
};

export default function Stars({ active }: Props) {
    return (
        <group
            scale={active ? 1 : 0.9}
            visible={active}
        >
            <DreiStars
                radius={100}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
                speed={0.2}
            />
        </group>
    );
}