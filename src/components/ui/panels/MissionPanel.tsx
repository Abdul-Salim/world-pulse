"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { useTargetStore } from "@/features/navigator/store/targetStore";
import { Earthquake } from "@/features/earthquakes/types/earthquake";
import { WeatherData } from "@/features/weather/types/weather";
import { describeWeatherCode } from "@/features/weather/utils/weatherCode";
import { Flight } from "@/features/flights/types/flight";
import {
    formatAltitude,
    formatHeading,
    formatLastContact,
    formatSpeed,
    formatVerticalRate,
} from "@/features/flights/utils/format";

export default function MissionPanel() {
    const target = useTargetStore((s) => s.target);
    const setTarget = useTargetStore((s) => s.setTarget);

    if (!target) return null;

    function handleClose() {
        setTarget(null);
    }

    return (
        <AnimatePresence>
            <motion.aside
                initial={{ x: 420 }}
                animate={{ x: 0 }}
                exit={{ x: 420 }}
                transition={{
                    duration: 0.35,
                    ease: "easeOut",
                }}
                className="
                    absolute
                    top-0
                    right-0
                    z-100
                    h-full
                    w-[380px]
                    overflow-y-auto
                    border-l
                    border-white/10
                    bg-black/75
                    text-white
                    backdrop-blur-xl
                "
            >
                <button
                    onClick={handleClose}
                    className="
                        absolute
                        right-6
                        top-6
                        rounded-lg
                        p-2
                        text-white/60
                        transition
                        hover:bg-white/10
                        hover:text-white
                    "
                >
                    <X size={18} />
                </button>

                <div className="px-8 pt-4 pb-8">
                    <div className="mb-8">
                        <div className="text-xs uppercase tracking-[0.3em] text-cyan-400">
                            {target.type}
                        </div>

                        <h1 className="mt-2 text-3xl font-bold">
                            {target.title}
                        </h1>

                        <p className="mt-2 text-white/70">
                            {target.subtitle}
                        </p>
                    </div>

                    {target.type === "earthquake" && (
                        <EarthquakeDetails
                            quake={target.metadata as Earthquake}
                        />
                    )}

                    {target.type === "weather" && (
                        <WeatherDetails
                            weather={target.metadata as WeatherData | null}
                        />
                    )}

                    {target.type === "flight" && (
                        <FlightDetails
                            flight={target.metadata as Flight}
                        />
                    )}

                    {target.type !== "earthquake" &&
                        target.type !== "weather" &&
                        target.type !== "flight" && (
                            <DefaultDetails target={target} />
                        )}
                </div>
            </motion.aside>
        </AnimatePresence>
    );
}

function DefaultDetails({
    target,
}: {
    target: {
        lat: number;
        lon: number;
        id: string;
    };
}) {
    return (
        <div className="space-y-6">
            <InfoRow
                label="Latitude"
                value={target.lat.toFixed(4)}
            />

            <InfoRow
                label="Longitude"
                value={target.lon.toFixed(4)}
            />
        </div>
    );
}

function EarthquakeDetails({
    quake,
}: {
    quake: Earthquake;
}) {
    return (
        <div className="space-y-6">
            <InfoRow
                label="Magnitude"
                value={quake.magnitude.toFixed(1)}
            />

            <InfoRow
                label="Depth"
                value={`${quake.depth} km`}
            />

            <InfoRow
                label="Time"
                value={new Date(
                    quake.time
                ).toLocaleString()}
            />

            <InfoRow
                label="Latitude"
                value={quake.latitude.toFixed(4)}
            />

            <InfoRow
                label="Longitude"
                value={quake.longitude.toFixed(4)}
            />
        </div>
    );
}

function WeatherDetails({
    weather,
}: {
    weather: WeatherData | null;
}) {
    if (!weather) {
        return (
            <p className="text-white/50">
                Fetching conditions for this point...
            </p>
        );
    }

    const { current } = weather;

    return (
        <div className="space-y-6">
            <InfoRow
                label="Condition"
                value={describeWeatherCode(current.weatherCode)}
            />

            <InfoRow
                label="Feels Like"
                value={`${Math.round(current.feelsLike)}°C`}
            />

            <InfoRow
                label="Humidity"
                value={`${current.humidity}%`}
            />

            <InfoRow
                label="Pressure"
                value={`${current.pressure} hPa`}
            />

            <InfoRow
                label="Wind"
                value={`${Math.round(current.windSpeed)} km/h`}
            />

            <InfoRow
                label="Cloud Cover"
                value={`${current.cloudCover}%`}
            />

            <InfoRow
                label="Precipitation"
                value={`${current.precipitation} mm`}
            />
        </div>
    );
}

function FlightDetails({
    flight,
}: {
    flight: Flight;
}) {
    return (
        <div className="space-y-6">
            <InfoRow
                label="Status"
                value={flight.onGround ? "On Ground" : "Airborne"}
            />

            <InfoRow
                label="Altitude"
                value={formatAltitude(flight.altitude)}
            />

            <InfoRow
                label="Speed"
                value={formatSpeed(flight.velocity)}
            />

            <InfoRow
                label="Heading"
                value={formatHeading(flight.heading)}
            />

            <InfoRow
                label="Vertical Rate"
                value={formatVerticalRate(flight.verticalRate)}
            />

            <InfoRow
                label="Origin Country"
                value={flight.originCountry}
            />

            <InfoRow
                label="ICAO24"
                value={flight.icao24}
            />

            <InfoRow
                label="Last Contact"
                value={formatLastContact(flight.lastContact)}
            />

            <InfoRow
                label="Latitude"
                value={flight.latitude.toFixed(4)}
            />

            <InfoRow
                label="Longitude"
                value={flight.longitude.toFixed(4)}
            />
        </div>
    );
}

type InfoRowProps = {
    label: string;
    value: string;
};

function InfoRow({
    label,
    value,
}: InfoRowProps) {
    return (
        <div className="border-b border-white/10 pb-4">
            <div className="text-xs uppercase tracking-wider text-white/40">
                {label}
            </div>

            <div className="mt-2 break-words text-lg">
                {value}
            </div>
        </div>
    );
}