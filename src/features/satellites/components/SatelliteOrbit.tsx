"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Line2, LineGeometry, LineMaterial } from "three-stdlib";
import { useSatelliteStore } from "../store/satelliteStore";
import { createOrbitPoints } from "../utils/createOrbitPoints";

export default function SatelliteOrbit() {
    const { scene, size } = useThree();

    const selectedSatelliteId = useSatelliteStore(
        (state) => state.selectedSatelliteId
    );

    const satellite = useSatelliteStore(
        (s) => s.satelliteMap.get(selectedSatelliteId as number)
    );

    const orbitRef = useRef<Line2 | null>(null);
    const geometryRef = useRef<LineGeometry | null>(null);
    const materialRef = useRef<LineMaterial | null>(null);

    useEffect(() => {
        if (!orbitRef.current) {
            geometryRef.current = new LineGeometry();

            materialRef.current = new LineMaterial({
                color: 0xffffff,
                linewidth: 3,
                transparent: true,
                opacity: 0.75,
                depthWrite: false,
                depthTest: true,
                worldUnits: false
            });

            materialRef.current.resolution.set(size.width, size.height);

            orbitRef.current = new Line2(
                geometryRef.current,
                materialRef.current
            );

            orbitRef.current.visible = false;
            scene.add(orbitRef.current);
        }

        return () => {
            if (!orbitRef.current) return;

            scene.remove(orbitRef.current);

            geometryRef.current?.dispose();
            materialRef.current?.dispose();

            orbitRef.current = null;
            geometryRef.current = null;
            materialRef.current = null;
        };
    }, []);

    useEffect(() => {
        materialRef.current?.resolution.set(size.width, size.height);
    }, [size]);

    useEffect(() => {
        if (
            !satellite ||
            !orbitRef.current ||
            !geometryRef.current ||
            !materialRef.current
        ) {
            if (orbitRef.current) {
                orbitRef.current.visible = false;
            }
            return;
        }

        const update = () => {
            const samples = createOrbitPoints(satellite);

            if (samples.length < 4) {
                orbitRef.current!.visible = false;
                return;
            }

            const positions: number[] = [];

            for (const p of samples) {
                positions.push(p.x, p.y, p.z);
            }

            geometryRef.current!.setPositions(positions);

            geometryRef.current!.computeBoundingSphere();
            geometryRef.current!.computeBoundingBox();

            materialRef.current!.color.setHex(0x00ff00);

            orbitRef.current!.computeLineDistances();
            orbitRef.current!.visible = true;
        };
        update();

        const timer = window.setInterval(update, 30000);

        return () => clearInterval(timer);
    }, [satellite]);

    return null;
}