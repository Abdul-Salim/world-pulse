"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";

import BootSequence from "@/components/boot/BootSequence";
import EarthScene from "@/components/ui/globe/EarthScene";
import HoverTooltip from "../ui/HoverTooltip";
import MissionPanel from "../ui/panels/MissionPanel";
import CountryTooltip from "../ui/CountryTooltip";
import FlightTooltip from "@/features/flights/components/FlightTooltip";
import Navigator from "@/features/navigator/components/Navigator";
import Header from "../ui/header/Header";
import WeatherLegend from "@/features/weather/components/WeatherLegend";
import { useTargetStore } from "@/features/navigator/store/targetStore";
import { useAppStore } from "@/store/appStore";
import { LayerType } from "@/types/layers";

export default function WorldPulse() {
    const [bootComplete, setBootComplete] = useState(false);

    const setTarget = useTargetStore((state) => state.setTarget);

    const activeLayer = useAppStore((state) => state.activeLayer);

    useEffect(() => {

        const listener = (e: KeyboardEvent) => {

            if (e.key === "Escape") {

                setTarget(null);

            }

        }

        window.addEventListener("keydown", listener);

        return () => window.removeEventListener("keydown", listener);

    }, []);

    return (
        <main className="relative h-screen w-screen overflow-hidden bg-black">
            <HoverTooltip />
            <CountryTooltip />
            <FlightTooltip />
            <MissionPanel />
            <Navigator />

            <EarthScene active={bootComplete} />

            {bootComplete && <Header />}
            {bootComplete && activeLayer === LayerType.WEATHER && (
                <WeatherLegend />
            )}
            <AnimatePresence>
                {!bootComplete && (
                    <BootSequence
                        key="boot-sequence"
                        onComplete={() => setBootComplete(true)}
                    />
                )}
            </AnimatePresence>
        </main>
    );
}