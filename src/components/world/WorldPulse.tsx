"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";

import BootSequence from "@/components/boot/BootSequence";
import EarthScene from "@/components/earth/EarthScene";

export default function WorldPulse() {
    const [bootComplete, setBootComplete] = useState(false);

    return (
        <main className="relative h-screen w-screen overflow-hidden bg-black">
            <EarthScene active={bootComplete} />

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