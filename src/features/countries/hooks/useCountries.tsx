"use client";

import { useEffect, useState } from "react";

import { Country } from "../types/country";
import { parseCountries } from "../utils/parseCountries";

export default function useCountries() {
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        fetch("/data/countries.geojson")
            .then((res) => res.json())
            .then((json) => {
                setCountries(parseCountries(json));
            });
    }, []);

    return countries;
}