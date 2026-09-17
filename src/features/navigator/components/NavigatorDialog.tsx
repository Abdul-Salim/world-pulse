"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useNavigatorStore } from "../store/navigatorStore";
import { useTargetStore } from "../store/targetStore";
import useNavigator from "../hooks/useNavigator";

import NavigatorInput from "./NavigatorInput";
import NavigatorResults from "./NavigatorResults";

import { cameraController } from "@/controllers/CameraController";
import { fetchCurrentWeather, fetchLocationName } from "@/features/weather/api/weatherApi";
import { mapOpenMeteoResponse } from "@/features/weather/utils/weatherMapper";
import { NavigatorResult } from "../types/navigator";
import { useAppStore } from "@/store/appStore";
import { LayerType } from "@/types/layers";

export default function NavigatorDialog() {
    const query = useNavigatorStore((s) => s.query);
    const layer = useAppStore((s) => s.activeLayer)
    const setQuery = useNavigatorStore((s) => s.setQuery);
    const clear = useNavigatorStore((s) => s.clear);

    const setTarget = useTargetStore((s) => s.setTarget);

    const inputRef = useRef<HTMLInputElement>(null);

    const { results, loading } = useNavigator(query);
    const [weatherLoading, setWeatherLoading] = useState(false);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSelect = async (result: NavigatorResult) => {
        setTarget({
            id: result.id,
            title: result.title,
            subtitle: result.subtitle,
            lat: result.lat,
            lon: result.lon,
            type: result.type,
            metadata: null,
        });

        if (layer === LayerType.WEATHER) {
            if (result.type === "city" || result.type === "country") {
                setWeatherLoading(true);
                try {
                    const [rawWeather, location] = await Promise.all([
                        fetchCurrentWeather(result.lat, result.lon),
                        fetchLocationName(result.lat, result.lon),
                    ]);
                    const weather = mapOpenMeteoResponse(rawWeather, result.lat, result.lon);

                    // Compose city/country name if available
                    const city =
                        location.address?.city ||
                        location.address?.town ||
                        location.address?.village ||
                        location.address?.municipality ||
                        location.address?.county ||
                        result.title;

                    const country = location.address?.country ?? result.subtitle;

                    setTarget({
                        id: result.id,
                        title: city,
                        subtitle: country,
                        lat: result.lat,
                        lon: result.lon,
                        type: "weather",
                        metadata: weather,
                    });
                } catch {
                    // On error, keep the basic info
                    setTarget({
                        id: result.id,
                        title: result.title,
                        subtitle: result.subtitle,
                        lat: result.lat,
                        lon: result.lon,
                        type: result.type,
                        metadata: null,
                    });
                } finally {
                    cameraController.flyToLatLng(result.lat, result.lon);
                    setWeatherLoading(false);
                }
            }
        } else {
            cameraController.flyToLatLng(
                result.lat,
                result.lon
            );
        }
        clear();
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/70 pt-28 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={clear}
            >
                <motion.div
                    initial={{
                        y: -25,
                        opacity: 0,
                        scale: 0.97,
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        scale: 1,
                    }}
                    exit={{
                        y: -25,
                        opacity: 0,
                        scale: 0.97,
                    }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => e.stopPropagation()}
                    className="
            w-full
            max-w-2xl
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-[#0B1020]/95
            shadow-2xl
          "
                >
                    {/* Header */}
                    <div className="border-b border-white/10 p-5">
                        <NavigatorInput
                            value={query}
                            onChange={setQuery}
                        />
                    </div>

                    {/* Results */}
                    <NavigatorResults
                        results={results}
                        loading={loading || weatherLoading}
                        onSelect={handleSelect}
                    />

                    {/* Footer */}
                    <div className="flex justify-between border-t border-white/10 px-5 py-3 text-xs text-white/35">
                        <span>↑ ↓ Navigate</span>
                        <span>Enter Select</span>
                        <span>Esc Close</span>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}