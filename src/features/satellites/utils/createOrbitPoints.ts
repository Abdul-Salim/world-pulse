import * as THREE from "three";
import * as satellite from "satellite.js";

import { EARTH_RADIUS } from "@/lib/constants";

import { Satellite } from "../types/satellite";

const ALTITUDE_SCALE = 0.003;

interface Options {
    points?: number;
    minutes?: number;
}

export const createOrbitPoints = (
    satelliteData: Satellite,
    options: Options = {}
): THREE.Vector3[] => {
    const {
        points = 720,
        minutes = satelliteData.period || 90,
    } = options;

    const satrec = satelliteData.satrec as satellite.SatRec;

    const startTime = Date.now();

    // The globe mesh never actually spins in this scene - only the
    // satellite marker crawls along it, using the real "now" gmst. So the
    // orbit ring must be rotated into that *same single* Earth-fixed
    // orientation. If we recompute gmst per sample (the real rotation at
    // each future instant) instead, the frame keeps rotating a little more
    // with every step while the globe itself stays still - shearing what
    // should be a closed ellipse into an open spiral: samples near the
    // poles barely move (all longitudes converge there) so they nearly
    // overlap, while samples near the equator drift apart into what looks
    // like a stray straight line cutting across the globe.
    const gmstNow = satellite.gstime(new Date(startTime));

    const samples: THREE.Vector3[] = [];

    for (let i = 0; i < points; i++) {
        const date = new Date(
            startTime + (minutes * 60000 * i) / points
        );

        const pv = satellite.propagate(satrec, date);

        if (!pv?.position) {
            continue;
        }

        // Height above the surface is frame-invariant, so the real
        // per-sample gmst is fine (and correct) to use here.
        const geo = satellite.eciToGeodetic(
            pv.position,
            satellite.gstime(date)
        );

        // Direction: rotate every sample by the SAME frozen "now" gmst so
        // the ring is one rigid, closed shape locked to the globe's
        // current orientation.
        const ecf = satellite.eciToEcf(
            pv.position,
            gmstNow
        );

        const radius =
            EARTH_RADIUS + geo.height * ALTITUDE_SCALE;

        // Normalize ECF vector
        const length = Math.sqrt(
            ecf.x * ecf.x +
            ecf.y * ecf.y +
            ecf.z * ecf.z
        );

        if (length === 0) continue;

        const scale = radius / length;

        // Match your globe orientation
        samples.push(
            new THREE.Vector3(
                ecf.x * scale,
                ecf.z * scale,
                -ecf.y * scale
            )
        );
    }

    // Force the ring to close exactly, rather than relying on the orbit
    // period being a perfect multiple of the sample step (small
    // perturbations mean the last sample is never quite identical to the
    // first).
    if (samples.length > 2) {
        samples.push(samples[0].clone());
    }

    return samples;
};