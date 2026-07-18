"use client";

import { useFrame, useThree } from "@react-three/fiber";

import { useFlightStore } from "../store/flightStore";

import { getVisibleFlights } from "../rendering/visibilityEngine";
import { useVisibleFlightStore } from "../store/visibilityStore";

export default function VisibilitySystem() {

    const { camera, size } = useThree();

    const flights =
        useFlightStore(s => s.flights);

    const setVisibleFlights =
        useVisibleFlightStore(
            s => s.setVisibleFlights
        );

    useFrame(() => {

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