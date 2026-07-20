"use client";

import { SUN_POSITION } from "@/lib/sun";

export default function Lighting() {
    return (
        <>
            {/*
              Low ambient — the whole point of a globe is that half of it
              is in shadow. If ambient is too high the sphere reads as a
              flat-lit toy instead of a lit planet.
            */}
            <ambientLight intensity={0.15} />

            {/*
              A faint, cool hemisphere light gives the night side a tiny
              bit of bounce/fill (like starlight + atmospheric scatter)
              without washing out the terminator line.
            */}
            <hemisphereLight
                args={["#4a6fa5", "#0a0a12", 0.18]}
            />

            {/*
              The sun. Single strong directional light — position must
              stay in sync with SUN_POSITION in lib/sun.ts, since the
              EarthMaterial day/night shader reads the same vector.
            */}
            <directionalLight
                position={SUN_POSITION}
                intensity={2.4}
            />
        </>
    );
}