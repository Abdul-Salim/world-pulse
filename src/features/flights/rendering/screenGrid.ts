import * as THREE from "three";

import { ScoredFlight } from "../types/flight";
import { latLngToVector } from "@/utils/latLngToVector";
import { EARTH_RADIUS } from "@/lib/constants";


interface ScreenGridOptions {
    camera: THREE.Camera;
    screenWidth: number;
    screenHeight: number;
    gridSize: number;
}

export function applyScreenGrid(
    flights: ScoredFlight[],
    {
        camera,
        screenWidth,
        screenHeight,
        gridSize,
    }: ScreenGridOptions
): ScoredFlight[] {

    const visibleFlights = new Map<string, ScoredFlight>();

    const cameraDirection =
        camera.position?.clone().normalize();

    for (const scoredFlight of flights) {

        // ---------- Hemisphere culling ----------

        const position = latLngToVector(
            scoredFlight.flight.latitude,
            scoredFlight.flight.longitude,
            EARTH_RADIUS + 0.03
        );

        const flightDirection =
            position.clone().normalize();

        const dot =
            cameraDirection.dot(flightDirection);

        // Hidden behind the Earth
        if (dot <= 0) {
            continue;
        }

        // ---------- Projection ----------

        const projected =
            position.clone().project(camera);

        if (
            projected.x < -1 ||
            projected.x > 1 ||
            projected.y < -1 ||
            projected.y > 1
        ) {
            continue;
        }

        const screenX =
            ((projected.x + 1) * 0.5) *
            screenWidth;

        const screenY =
            ((1 - projected.y) * 0.5) *
            screenHeight;

        const cellX =
            Math.floor(screenX / gridSize);

        const cellY =
            Math.floor(screenY / gridSize);

        const key = `${cellX}:${cellY}`;

        const existing =
            visibleFlights.get(key);

        if (
            !existing ||
            scoredFlight.score >
                existing.score
        ) {
            visibleFlights.set(
                key,
                scoredFlight
            );
        }
    }

    return [...visibleFlights.values()];
}