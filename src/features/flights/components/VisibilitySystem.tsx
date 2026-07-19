"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

import { useFlightStore } from "../store/flightStore";

import { getVisibleFlights } from "../rendering/visibilityEngine";
import { useVisibleFlightStore } from "../store/visibilityStore";

// Recompute visibility on a fixed cadence instead of every render frame -
// scoring/sorting/projecting thousands of flights at 60fps is wasted work
// when the camera hasn't moved and the flight list hasn't changed.
const RECOMPUTE_INTERVAL_MS = 150;
const CAMERA_MOVE_EPSILON = 0.01;

export default function VisibilitySystem() {

    const { camera, size } = useThree();

    const flights =
        useFlightStore(s => s.flights);

    const setVisibleFlights =
        useVisibleFlightStore(
            s => s.setVisibleFlights
        );

    const lastRunRef = useRef(0);
    const lastCameraPosRef = useRef(new THREE.Vector3());
    const lastFlightsRef = useRef(flights);

    useFrame((state) => {

        const now = state.clock.elapsedTime * 1000;

        if (now - lastRunRef.current < RECOMPUTE_INTERVAL_MS) {
            return;
        }

        const cameraMoved =
            camera.position.distanceTo(lastCameraPosRef.current) >
            CAMERA_MOVE_EPSILON;

        const flightsChanged = flights !== lastFlightsRef.current;

        if (!cameraMoved && !flightsChanged) {
            return;
        }

        lastRunRef.current = now;
        lastCameraPosRef.current.copy(camera.position);
        lastFlightsRef.current = flights;

        const visible = getVisibleFlights(
            flights,
            {
                camera,
                screenWidth: size.width,
                screenHeight: size.height,
            }
        );

        setVisibleFlights(visible);

    });

    return null;
}
