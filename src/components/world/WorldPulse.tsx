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
            {bootComplete && activeLayer === LayerType.FLIGHTS && (
                <div className="absolute bottom-8 left-8 z-40 lg:w-1/3">
                    <p className="text-white/45 text-xs">
                        Flight data provided by the OpenSky Network.
                        Data source:
                        OpenSky Network
                        &quot;Bringing Up OpenSky: A Large-scale ADS-B Sensor Network for Research&quot;
                        Schäfer et al., IPSN 2014
                    </p>
                </div>
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