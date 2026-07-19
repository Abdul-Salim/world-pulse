"use client";

import { Billboard, Text } from "@react-three/drei";
import { latLngToVector } from "@/utils/latLngToVector";
import { EARTH_RADIUS } from "@/lib/constants";
import useCountries from "../hooks/useCountries";
const LABEL_RADIUS = EARTH_RADIUS + 0.03;

export default function CountryLabels() {
    const countries = useCountries();

    return (
        <>
            {countries.map((country) => {
                const pos = latLngToVector(
                    country.center.lat,
                    country.center.lon,
                    LABEL_RADIUS
                );

                return (
                    <Billboard
                        key={country.id}
                        position={pos}
                        follow
                        lockX={false}
                        lockY={false}
                        lockZ={false}
                    >
                        <Text
                            fontSize={0.015}
                            color="white"
                            anchorX="center"
                            anchorY="middle"
                        >
                            {country.name}
                        </Text>
                    </Billboard>
                );
            })}
        </>
    );
}