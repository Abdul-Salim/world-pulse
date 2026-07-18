"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";

import BootSequence from "@/components/boot/BootSequence";
import EarthScene from "@/components/ui/globe/EarthScene";
import EarthquakePanel from "../ui/globe/EarthquakePanel";
import HoverTooltip from "../ui/HoverTooltip";
import { useEarthquakeStore } from "@/features/earthquakes";
import { useAppStore } from "@/store/appStore";
import MissionPanel from "../ui/panels/MissionPanel";
import CountryTooltip from "../ui/CountryTooltip";
import Navigator from "@/features/navigator/components/Navigator";
import Header from "../ui/header/Header";

export default function WorldPulse() {
    const [bootComplete, setBootComplete] = useState(false);

    const setSelectedEarthquake = useEarthquakeStore(
        (state) => state.setSelectedEarthquake
    );

    const setCameraTarget = useAppStore(
        (state) => state.setCameraTarget
    );

    useEffect(() => {

        const listener = (e: KeyboardEvent) => {

            if (e.key === "Escape") {

                setSelectedEarthquake(null);

                setCameraTarget(null);

            }

        }

        window.addEventListener("keydown", listener);

        return () => window.removeEventListener("keydown", listener);

    }, []);

    return (
        <main className="relative h-screen w-screen overflow-hidden bg-black">
            <HoverTooltip />
            <CountryTooltip />
            <MissionPanel />
            <Navigator />

            <EarthScene active={bootComplete} />

            {bootComplete && <Header />}
            <EarthquakePanel />
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