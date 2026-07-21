"use client";

import { ChangeEvent, useMemo } from "react";
import { useSatelliteStore } from "../store/satelliteStore";
import SatelliteInfoPanel from "./SatelliteInfoPanel";

export default function SatelliteSearch() {

    const {
        search,
        setSearch,
        setSelectedSatellite,
        satellites
    } = useSatelliteStore();

    const results = useMemo(() => {
        const value = search.trim().toLowerCase();

        if (!value) return [];

        return satellites
            .filter((sat) =>
                sat.name.toLowerCase().includes(value)
            )
            .slice(0, 8);
    }, [satellites, search]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    return (
        <><div className="absolute right-4 top-4 w-80">
            <input
                value={search}
                onChange={handleChange}
                placeholder="Search satellites..."
                className="w-full rounded-lg border border-white bg-black/80 px-4 py-3 text-sm text-white outline-none backdrop-blur-md placeholder:text-white" />

            {results.length > 0 && (
                <div className="mt-2 overflow-hidden rounded-lg border border-white/10 bg-black/90 backdrop-blur-md">
                    {results.map((satellite) => (
                        <button
                            key={satellite.id}
                            onClick={() => {
                                setSelectedSatellite(satellite.id);
                                setSearch("");
                            }}
                            className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-white/10"
                        >
                            <div>
                                <div className="text-sm text-white">
                                    {satellite.name}
                                </div>

                                <div className="text-xs text-gray-400">
                                    {satellite.category}
                                </div>
                            </div>

                            <div className="text-xs text-gray-500">
                                {satellite.id}
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
            {!search && <SatelliteInfoPanel />}
        </>
    );
}