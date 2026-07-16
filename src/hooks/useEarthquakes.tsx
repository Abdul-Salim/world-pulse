"use client";

import { useEffect, useState } from "react";

import { Earthquake } from "@/types/earthquake";
import { getEarthquakes } from "@/api/earthquake";

export default function useEarthquakes() {
    const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);

    useEffect(() => {
        getEarthquakes().then(setEarthquakes);
    }, []);

    return earthquakes;
}