import { memo } from "react";
import { Country } from "../types/country";
import { useSelectedRegionStore } from "@/features/region/store/selectedRegionStore";

interface Props {
    country: Country;
}

function CountryMesh({ country }: Props) {
    const setSelectedRegion =
        useSelectedRegionStore(
            s => s.setSelectedRegion
        );

    return (
        <mesh
            geometry={country.meshGeometry}
            onClick={(e) => {

                e.stopPropagation();
                setSelectedRegion({
                    id: country.id,
                    name: country.name,
                    bounds: country.bounds,
                });

            }}
        >
            <meshBasicMaterial
                transparent
                opacity={0}
                depthWrite={false}
            />
        </mesh>
    );
}

export default memo(CountryMesh);