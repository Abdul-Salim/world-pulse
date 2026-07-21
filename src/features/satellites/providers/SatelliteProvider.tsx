"use client";

import {
    useCallback,
    useEffect,
} from "react";

import { fetchSatellites } from "../api/celestrak";
import { propagateSatellite } from "../utils/propagateSatellite";
import { useSatelliteStore } from "../store/satelliteStore";
import { SATELLITE_UPDATE_INTERVAL_MS } from "../lib/constants";

export const SatelliteProvider = ({
    children,
}: React.PropsWithChildren) => {
    const satellites = useSatelliteStore((s) => s.satellites);

    const setSatellites = useSatelliteStore((s) => s.setSatellites);
    const updateSatellites = useSatelliteStore((s) => s.updateSatellites);
    const setLoading = useSatelliteStore((s) => s.setLoading);

    const refresh = useCallback(async () => {
        setLoading(true);

        try {
            const result = await fetchSatellites();
            setSatellites(result);
        } finally {
            setLoading(false);
        }
    }, [setLoading, setSatellites]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    useEffect(() => {
        if (!satellites.length) return;

        const timer = window.setInterval(() => {
            for (const sat of satellites) {
                Object.assign(sat, propagateSatellite(sat));
            }

            updateSatellites();
        }, SATELLITE_UPDATE_INTERVAL_MS);

        return () => clearInterval(timer);
    }, [satellites, updateSatellites]);

    return children;
};