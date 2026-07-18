"use client";

import { useMemo } from "react";

import { useThree } from "@react-three/fiber";

import { useFlightStore } from "../store/flightStore";
import { getVisibleFlights } from "../rendering/visibilityEngine";

export function useVisibleFlights() {

    const { camera, size } = useThree();

    const flights = useFlightStore(
        s => s.flights
    );

    return useMemo(() => {

        return getVisibleFlights(
            flights,
            {
                camera,
                screenWidth: size.width,
                screenHeight: size.height,
            }
        );

    }, [
        flights,
        camera,
        size.width,
        size.height,
    ]);
}