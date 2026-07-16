"use client";

import { motion } from "framer-motion";

import { useEarthquakeStore } from "@/features/earthquakes";

export default function MissionPanel() {
    const quake = useEarthquakeStore((s) => s.selectedEarthquake);

    const setSelected = useEarthquakeStore(
        s => s.setSelectedEarthquake
    );

    if (!quake) return null;

    return (
        <motion.aside
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{
                duration: 0.35,
                ease: "easeOut"
            }}
            className="
        absolute
        right-0
        top-0
        z-50
        h-full
        w-[380px]
        border-l
        border-white/10
        bg-black/75
        backdrop-blur-xl
        text-white
        p-8
        overflow-y-auto
      "
        >
            <div className="mb-8">
                <div className="text-xs uppercase tracking-[0.3em] text-cyan-400">
                    Earthquake
                </div>

                <h1 className="mt-2 text-3xl font-bold">
                    M {quake.magnitude.toFixed(1)}
                </h1>

                <p className="mt-2 text-white/70">
                    {quake.place}
                </p>
            </div>

            <div className="space-y-6">

                <InfoRow
                    label="Depth"
                    value={`${quake.depth} km`}
                />

                <InfoRow
                    label="Latitude"
                    value={quake.latitude.toFixed(3)}
                />

                <InfoRow
                    label="Longitude"
                    value={quake.longitude.toFixed(3)}
                />

                <InfoRow
                    label="Time"
                    value={new Date(quake.time).toLocaleString()}
                />

            </div>
            <button
                onClick={() => setSelected(null)}
                className="
        absolute
        top-6
        right-6
        text-white/60
        hover:text-white
    "
            >
                ✕
            </button>
        </motion.aside>
    );
}

type RowProps = {
    label: string;
    value: string;
};

function InfoRow({
    label,
    value,
}: RowProps) {
    return (
        <div className="border-b border-white/10 pb-4">
            <div className="text-xs uppercase tracking-wider text-white/40">
                {label}
            </div>

            <div className="mt-2 text-lg">
                {value}
            </div>
        </div>
    );
}