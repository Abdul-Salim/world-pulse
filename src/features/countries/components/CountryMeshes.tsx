import { memo } from "react";

import CountryMesh from "./CountryMesh";
import useCountries from "../hooks/useCountries";

function CountryMeshes() {

    const countries = useCountries();

    return (
        <>
            {countries.map(country => (
                <CountryMesh
                    key={country.name}
                    country={country}
                />
            ))}
        </>
    );
}

export default memo(CountryMeshes);