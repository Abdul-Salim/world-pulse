"use client";

import { useSatelliteStore } from "../store/satelliteStore";

export default function SatelliteInfoPanel() {

    const {
        followedSatelliteId,
        setFollowedSatellite,
        setSelectedSatellite
    } = useSatelliteStore();

    const satellite = useSatelliteStore((state) =>
        state.selectedSatelliteId
            ? state.satelliteMap.get(state.selectedSatelliteId) ?? null
            : null
    );

    if (!satellite) {
        return null;
    }

    const following = followedSatelliteId === satellite.id;

    return (
        <div className="absolute right-4 top-20 w-80 rounded-xl border border-white/10 bg-black/80 backdrop-blur-md text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 p-4">
                <div>
                    <h2 className="text-lg font-semibold">{satellite.name}</h2>
                    <p className="text-xs text-gray-400">
                        NORAD {satellite.id}
                    </p>
                </div>

                <button
                    onClick={() => setSelectedSatellite(null)}
                    className="text-xl leading-none hover:text-red-400"
                >
                    ×
                </button>
            </div>

            <div className="space-y-2 p-4 text-sm">
                <InfoRow label="Category" value={satellite.category} />
                <InfoRow label="Country" value={satellite.country ?? "-"} />
                <InfoRow
                    label="Altitude"
                    value={`${satellite.altitude.toFixed(1)} km`}
                />
                <InfoRow
                    label="Velocity"
                    value={`${(satellite.velocity * 3600).toFixed(0)} km/h`}
                />
                <InfoRow
                    label="Inclination"
                    value={`${satellite.inclination.toFixed(2)}°`}
                />
                <InfoRow
                    label="Period"
                    value={`${satellite.period.toFixed(1)} min`}
                />
                <InfoRow
                    label="Latitude"
                    value={`${satellite.latitude.toFixed(2)}°`}
                />
                <InfoRow
                    label="Longitude"
                    value={`${satellite.longitude.toFixed(2)}°`}
                />
            </div>

            <div className="flex gap-2 border-t border-white/10 p-4">
                <button
                    onClick={() =>
                        setFollowedSatellite(
                            following ? null : satellite.id
                        )
                    }
                    className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm hover:bg-blue-500"
                >
                    {following ? "Unfollow" : "Follow"}
                </button>

                <button
                    onClick={() =>
                        navigator.clipboard.writeText(
                            satellite.id.toString()
                        )
                    }
                    className="rounded-lg bg-zinc-700 px-3 py-2 text-sm hover:bg-zinc-600"
                >
                    Copy ID
                </button>
            </div>
        </div>
    );
}

function InfoRow({
    label,
    value
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-gray-400">{label}</span>
            <span>{value}</span>
        </div>
    );
}