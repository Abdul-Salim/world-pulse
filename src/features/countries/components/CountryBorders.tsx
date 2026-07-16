"use client";

import CountryBorder from "./CountryBorder";
import useCountries from "../hooks/useCountries";

export default function CountryBorders() {
    const countries = useCountries();

    return (
        <>
            {countries.map((country) =>
                country.borders.map((border, index) => (
                    <CountryBorder
                        key={`${country.id}-${index}`}
                        points={border}
                    />
                ))
            )}
        </>
    );
}