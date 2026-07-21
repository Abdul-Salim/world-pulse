"use client";

import { useEffect } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { Satellite } from "../types/satellite";
import { useSatelliteStore } from "../store/satelliteStore";

interface Props {
    satellites: Satellite[];
}

export default function SatelliteInteraction({ satellites }: Props) {
    const setSelectedSatellite = useSatelliteStore(
        (state) => state.setSelectedSatellite
    );

    const setHoveredSatellite = useSatelliteStore(
        (state) => state.setHoveredSatellite
    );

    useEffect(() => {
        document.body.style.cursor = "default";

        return () => {
            document.body.style.cursor = "default";
        };
    }, []);

    const onPointerMove = (event: ThreeEvent<PointerEvent>) => {
        const id = event.instanceId;

        if (id == null) {
            setHoveredSatellite(null);
            document.body.style.cursor = "default";
            return;
        }

        setHoveredSatellite(satellites[id]?.id ?? null);
        document.body.style.cursor = "pointer";
    };

    const onPointerOut = () => {
        setHoveredSatellite(null);
        document.body.style.cursor = "default";
    };

    const onClick = (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();

        const id = event.instanceId;

        if (id == null) {
            setSelectedSatellite(null);
            return;
        }

        setSelectedSatellite(satellites[id]?.id ?? null);
    };

    return (
        <group
            onPointerMove={onPointerMove}
            onPointerOut={onPointerOut}
            onClick={onClick}
        />
    );
}