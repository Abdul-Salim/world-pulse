"use client";

import { useMemo } from "react";
import * as THREE from "three";

export const useSatelliteGlowTexture = () => {
    return useMemo(() => {
        const size = 128;

        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext("2d")!;

        const gradient = ctx.createRadialGradient(
            size / 2,
            size / 2,
            0,
            size / 2,
            size / 2,
            size / 2
        );

        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(0.75, "rgba(255,255,255,1)");
        gradient.addColorStop(0.95, "rgba(255,255,255,0.8)");
        gradient.addColorStop(1, "rgba(255,255,255,0.6)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);

        const texture = new THREE.CanvasTexture(canvas);

        texture.needsUpdate = true;

        return texture;
    }, []);
};