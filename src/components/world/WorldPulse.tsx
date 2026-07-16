"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";

import BootSequence from "@/components/boot/BootSequence";
import EarthScene from "@/features/earthquakes/components/EarthScene";
import LayerToolbar from "../hud/LayerToolbar";
import EarthquakePanel from "../../../components/hud/EarthquakePanel";
import HoverTooltip from "../hud/HoverTooltip";
import { useEarthquakeStore } from "@/features/earthquakes";
import { useAppStore } from "@/store/appStore";
import MissionPanel from "../../../components/hud/MissionPanel";
import CountryTooltip from "../hud/CountryTooltip";

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
            <EarthScene active={bootComplete} />

            {bootComplete && <LayerToolbar />}
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