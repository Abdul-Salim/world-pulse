"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const systems = [
    "SEISMIC NETWORK",
    "ATMOSPHERIC LINK",
    "AVIATION NETWORK",
];

type BootSequenceProps = {
    onComplete: () => void;
};

export default function BootSequence({
    onComplete,
}: BootSequenceProps) {
    const [visibleSystems, setVisibleSystems] = useState(0);
    const [onlineSystems, setOnlineSystems] = useState(0);
    const [linkEstablished, setLinkEstablished] = useState(false);
    const [earthLive, setEarthLive] = useState(false);

    useEffect(() => {
        const timers = [
            setTimeout(() => setVisibleSystems(1), 1200),
            setTimeout(() => setVisibleSystems(2), 1900),
            setTimeout(() => setVisibleSystems(3), 2600),

            setTimeout(() => setOnlineSystems(1), 3400),
            setTimeout(() => setOnlineSystems(2), 3900),
            setTimeout(() => setOnlineSystems(3), 4400),

            setTimeout(() => setLinkEstablished(true), 5200),
            setTimeout(() => setEarthLive(true), 6200),
            setTimeout(onComplete, 7800),
        ];

        return () => timers.forEach(clearTimeout);
    }, [onComplete]);

    return (
        <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-black"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <div className="w-[560px] font-mono text-[11px] tracking-[0.18em] text-white/70">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-14 text-center"
                >
                    <h1 className="text-sm tracking-[0.5em] text-white">
                        WORLD//PULSE_
                    </h1>

                    <p className="mt-3 text-[9px] text-white/30">
                        GLOBAL OBSERVATION SYSTEM
                    </p>
                </motion.div>

                <div className="space-y-5">
                    {systems.map((system, index) => {
                        const visible = visibleSystems > index;
                        const online = onlineSystems > index;

                        return (
                            <div
                                key={system}
                                className="flex h-4 items-center justify-between"
                            >
                                {visible && (
                                    <>
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            {system}
                                        </motion.span>

                                        <span
                                            className={
                                                online
                                                    ? "text-cyan-300"
                                                    : "animate-pulse text-white/30"
                                            }
                                        >
                                            {online ? "[ ONLINE ]" : "[ CONNECTING ]"}
                                        </span>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>

                {linkEstablished && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-14 flex justify-between border-t border-white/10 pt-5"
                    >
                        <span>GLOBAL DATA LINK</span>
                        <span className="text-cyan-300">ESTABLISHED</span>
                    </motion.div>
                )}

                {earthLive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="mt-16 text-center"
                    >
                        <p className="text-[9px] text-white/30">
                            EARTH STATUS
                        </p>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0.5, 1] }}
                            transition={{ duration: 1.2 }}
                            className="mt-4 text-xs tracking-[0.7em] text-cyan-300"
                        >
                            LIVE
                        </motion.p>
                    </motion.div>
                )}
            </div>

            <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:100%_4px]" />
        </motion.div>
    );
}