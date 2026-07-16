"use client";

import { useEffect, useState } from "react";

import { Earthquake } from "@/features/earthquakes/types/earthquake";
import { getEarthquakes } from "@/features/earthquakes/api/earthquake";

export default function useEarthquakes() {
    const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);

    useEffect(() => {
        getEarthquakes().then(setEarthquakes);
    }, []);

    return earthquakes;
}