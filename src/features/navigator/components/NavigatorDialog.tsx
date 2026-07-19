"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useNavigatorStore } from "../store/navigatorStore";
import { useTargetStore } from "../store/targetStore";
import useNavigator from "../hooks/useNavigator";

import NavigatorInput from "./NavigatorInput";
import NavigatorResults from "./NavigatorResults";

import { cameraController } from "@/controllers/CameraController";

export default function NavigatorDialog() {
    const query = useNavigatorStore((s) => s.query);
    const setQuery = useNavigatorStore((s) => s.setQuery);
    const clear = useNavigatorStore((s) => s.clear);

    const setTarget = useTargetStore((s) => s.setTarget);

    const inputRef = useRef<HTMLInputElement>(null);

    const { results, loading } = useNavigator(query);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

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
                        loading={loading}
                        onSelect={(result) => {
                            setTarget(result);

                            cameraController.flyToLatLng(
                                result.lat,
                                result.lon
                            );

                            clear();
                        }}
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