"use client";

import { Cloud, CloudRain, Thermometer, Wind } from "lucide-react";

import { useWeatherStore, WeatherTileLayer } from "../store/weatherStore";

const ICONS: Record<WeatherTileLayer, typeof Cloud> = {
    clouds: Cloud,
    precipitation: CloudRain,
    temp: Thermometer,
    wind: Wind,
};

const OPTIONS: { id: WeatherTileLayer; label: string }[] = [
    { id: "clouds", label: "Clouds" },
    { id: "precipitation", label: "Precipitation" },
    { id: "temp", label: "Temperature" },
    { id: "wind", label: "Wind" },
];

export default function WeatherLegend() {
    const activeTileLayer = useWeatherStore((s) => s.activeTileLayer);
    const setActiveTileLayer = useWeatherStore((s) => s.setActiveTileLayer);
    const tileLoadError = useWeatherStore((s) => s.tileLoadError);

    return (
        <div className="absolute bottom-8 left-8 z-40 flex flex-col gap-2">
            {tileLoadError && (
                <div
                    className="
                        max-w-xs rounded-lg border border-amber-400/30
                        bg-black/70 px-4 py-3 text-xs text-amber-300
                        backdrop-blur-xl
                    "
                >
                    Something went wrong...
                </div>
            )}

            <div
                className="
                    flex gap-2 rounded-xl border border-white/10
                    bg-black/30 p-2 backdrop-blur-xl
                "
            >
                {OPTIONS.map(({ id, label }) => {
                    const Icon = ICONS[id];
                    const active = activeTileLayer === id;

                    return (
                        <button
                            key={id}
                            onClick={() => setActiveTileLayer(id)}
                            title={label}
                            className={`
                                flex items-center gap-2 rounded-lg
                                border px-3 py-2 text-xs uppercase
                                transition-all duration-300
                                ${active
                                    ? "border-cyan-400 bg-cyan-500/20 text-cyan-300"
                                    : "border-white/10 text-white/70 hover:border-cyan-400/40 hover:bg-white/5"
                                }
                            `}
                        >
                            <Icon size={16} />
                            <span className="hidden sm:inline">{label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
