"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";

import BootSequence from "@/components/boot/BootSequence";
import EarthScene from "@/components/earth/EarthScene";
import LayerToolbar from "../hud/LayerToolbar";
import EarthquakePanel from "../../../components/hud/EarthquakePanel";
import HoverTooltip from "../hud/HoverTooltip";
import { useWorldStore } from "@/store/worldstore";
import MissionPanel from "../../../components/hud/MissionPanel";

export default function WorldPulse() {
    const [bootComplete, setBootComplete] = useState(false);

    const setSelectedEarthquake = useWorldStore(
        (state) => state.setSelectedEarthquake
    );

    const setCameraTarget = useWorldStore(
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