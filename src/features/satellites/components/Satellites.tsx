"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";

import { latLngToVector } from "@/utils/latLngToVector";
import { EARTH_RADIUS } from "@/lib/constants";
import { useSatelliteStore } from "../store/satelliteStore";
import { Satellite } from "../types/satellite";
import { useSatelliteGlowTexture } from "./SatelliteGlow";
import { SATELLITE_UPDATE_INTERVAL_MS } from "../lib/constants";

const ALTITUDE_SCALE = 0.003;

interface Transition {
    prev: THREE.Vector3;
    next: THREE.Vector3;
    start: number;
}

export default function Satellites() {
    const satellites = useSatelliteStore((s) => s.satellites);
    const { camera } = useThree();
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const instanceLookup = useRef<Satellite[]>([]);

    // Each satellite's last two known positions + when the transition
    // between them started. useFrame lerps between these every frame so
    // motion stays continuous between the ~1s physics updates instead of
    // snapping straight to the new spot (the "pulse").
    const transitions = useRef(new Map<number, Transition>());

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const color = useMemo(() => new THREE.Color(), []);

    const {
        visibleCategories,
        setHoveredSatellite,
        setSelectedSatellite
    } = useSatelliteStore();

    useEffect(() => {
        const mesh = meshRef.current;

        if (!mesh) return;

        let instance = 0;

        instanceLookup.current.length = 0;

        const now = performance.now();

        for (const sat of satellites) {
            if (!visibleCategories[sat.category]) continue;

            const nextPos = latLngToVector(
                sat.latitude,
                sat.longitude,
                EARTH_RADIUS + sat.altitude * ALTITUDE_SCALE
            );

            const existing = transitions.current.get(sat.id);

            if (existing) {
                // Start a new lerp from wherever the last one ended.
                existing.prev.copy(existing.next);
                existing.next.copy(nextPos);
                existing.start = now;
            } else {
                // First time we've seen this satellite - place it directly,
                // nothing to interpolate from yet.
                transitions.current.set(sat.id, {
                    prev: nextPos.clone(),
                    next: nextPos.clone(),
                    start: now,
                });
            }

            dummy.quaternion.copy(camera.quaternion);
            dummy.scale.setScalar(1);
            dummy.position.copy(nextPos);
            dummy.updateMatrix();

            mesh.setMatrixAt(instance, dummy.matrix);

            color.set(sat.color);
            mesh.setColorAt(instance, color);

            instanceLookup.current[instance] = sat;

            instance++;
        }

        mesh.count = instance;
        mesh.instanceMatrix.needsUpdate = true;

        if (mesh.instanceColor) {
            mesh.instanceColor.needsUpdate = true;
        }
    }, [satellites, visibleCategories, dummy, color, camera]);

    useFrame(() => {
        const mesh = meshRef.current;

        if (!mesh) return;

        let instance = 0;

        instanceLookup.current.length = 0;

        const now = performance.now();

        for (const sat of satellites) {
            if (!visibleCategories[sat.category]) continue;

            const transition = transitions.current.get(sat.id);

            if (transition) {
                const t = THREE.MathUtils.clamp(
                    (now - transition.start) / SATELLITE_UPDATE_INTERVAL_MS,
                    0,
                    1
                );

                dummy.position.lerpVectors(transition.prev, transition.next, t);
            } else {
                dummy.position.copy(
                    latLngToVector(
                        sat.latitude,
                        sat.longitude,
                        EARTH_RADIUS + sat.altitude * ALTITUDE_SCALE
                    )
                );
            }

            dummy.quaternion.copy(camera.quaternion);
            dummy.scale.setScalar(sat.size);
            dummy.updateMatrix();

            mesh.setMatrixAt(instance, dummy.matrix);
            instanceLookup.current[instance] = sat;

            instance++;
        }

        mesh.count = instance;
        mesh.instanceMatrix.needsUpdate = true;
    });

    const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();

        const sat = event.instanceId == null
            ? null
            : instanceLookup.current[event.instanceId];

        setHoveredSatellite(sat?.id ?? null);

        document.body.style.cursor = sat ? "pointer" : "default";
    };

    const handlePointerOut = () => {
        setHoveredSatellite(null);
        document.body.style.cursor = "default";
    };

    const handleClick = (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();

        const sat = event.instanceId == null
            ? null
            : instanceLookup.current[event.instanceId];

        setSelectedSatellite(sat?.id ?? null);
    };

    const glowTexture = useSatelliteGlowTexture();

    return (
        <instancedMesh
            ref={meshRef}
            args={[undefined, undefined, satellites.length]}
            frustumCulled={false}
            onPointerMove={handlePointerMove}
            onPointerOut={handlePointerOut}
            onClick={handleClick}
        >
            <sphereGeometry args={[0.01, 8, 8]} />

            <meshBasicMaterial
                toneMapped={false}
            />
        </instancedMesh>
    );
}