"use client";

import { useEffect } from "react";

import NavigatorResult from "./NavigatorResult";

import { NavigatorResult as NavigatorResultType } from "../types/navigator";
import { useNavigatorStore } from "../store/navigatorStore";

type Props = {
    results: NavigatorResultType[];
    loading: boolean;
    onSelect: (result: NavigatorResultType) => void;
};

export default function NavigatorResults({
    results,
    loading,
    onSelect,
}: Props) {
    const selectedIndex =
        useNavigatorStore(
            (s) => s.selectedIndex
        );

    const setSelectedIndex =
        useNavigatorStore(
            (s) => s.setSelectedIndex
        );

    useEffect(() => {
        function handleKeyDown(
            e: KeyboardEvent
        ) {
            if (!results.length) return;

            if (e.key === "ArrowDown") {
                e.preventDefault();

                setSelectedIndex(
                    Math.min(
                        selectedIndex + 1,
                        results.length - 1
                    )
                );
            }

            if (e.key === "ArrowUp") {
                e.preventDefault();

                setSelectedIndex(
                    Math.max(
                        selectedIndex - 1,
                        0
                    )
                );
            }

            if (e.key === "Enter") {
                e.preventDefault();

                onSelect(
                    results[selectedIndex]
                );
            }
        }

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () =>
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
    }, [
        results,
        selectedIndex,
        setSelectedIndex,
        onSelect,
    ]);

    if (loading) {
        return (
            <div className="p-6 text-white/40">
                Searching...
            </div>
        );
    }

    if (!results.length) {
        return (
            <div className="p-6 text-white/40">
                No Results
            </div>
        );
    }

    return (
        <div className="max-h-[420px] overflow-y-auto">

            {results.map(
                (result, index) => (
                    <NavigatorResult
                        key={result.id}
                        result={result}
                        active={
                            index ===
                            selectedIndex
                        }
                        onClick={() =>
                            onSelect(result)
                        }
                    />
                )
            )}

        </div>
    );
}