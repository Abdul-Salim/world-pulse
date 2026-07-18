import * as THREE from "three";

import { Flight } from "../types/flight";

import { scoreFlights } from "./priority";
import { applyLOD, getFlightLOD } from "./lod";
import { applyScreenGrid } from "./screenGrid";
import { getFlightZoomLevel } from "./zoom";

interface VisibilityOptions {
    camera: THREE.Camera;
    screenWidth: number;
    screenHeight: number;
}

export function getVisibleFlights(
    flights: Flight[],
    {
        camera,
        screenWidth,
        screenHeight,
    }: VisibilityOptions
): Flight[] {

    // Step 1 - Score every flight
    const scoredFlights = scoreFlights(flights);
    const zoom = getFlightZoomLevel(
        camera.position.length()
    );

    // Step 2 - Reduce candidate count
    const candidates = applyLOD(
        scoredFlights,
        zoom
    );

    // Step 3 - Get current grid size
    const { gridSize } =
        getFlightLOD(zoom);

    // Step 4 - Remove overlapping aircraft
    const visibleFlights =
        applyScreenGrid(
            candidates,
            {
                camera,
                screenWidth,
                screenHeight,
                gridSize,
            }
        );

    return visibleFlights.map(
        s => s.flight
    );
}