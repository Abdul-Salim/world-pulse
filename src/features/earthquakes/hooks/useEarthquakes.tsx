"use client";

import { useEffect, useState } from "react";

import { Earthquake } from "@/features/earthquakes/types/earthquake";
import { getEarthquakes } from "@/features/earthquakes/api/earthquake";
import { useEarthquakeStore } from "../store/earthquakeStore";

export default function useEarthquakes() {
    const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
    const setLoading = useEarthquakeStore(
        (s) => s.setLoading
    );

    useEffect(() => {
        async function load() {
            try {
                setLoading(true)
                const response = await getEarthquakes();
                setEarthquakes(response);
                setLoading(false)
            }
            catch (err) {
                setLoading(false)
            }
        }
        load()
    }, []);

    return earthquakes;
}