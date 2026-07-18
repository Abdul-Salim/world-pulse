"use client";

import { useEffect, useState } from "react";

import { NavigatorResult } from "../types/navigator";
import { placeProvider } from "../providers/placeProvider";

export default function useNavigator(query: string) {
    const [results, setResults] = useState<
        NavigatorResult[]
    >([]);

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {
        let cancelled = false;

        async function search() {
            if (!query.trim()) {
                setResults([]);
                return;
            }

            setLoading(true);

            const providers = [
                placeProvider,
            ];

            const providerResults =
                await Promise.all(
                    providers.map((provider) =>
                        provider.search(query)
                    )
                );

            if (cancelled) return;

            setResults(
                providerResults
                    .flat()
                    .sort(
                        (a, b) =>
                            b.score - a.score
                    )
            );

            setLoading(false);
        }

        search();

        return () => {
            cancelled = true;
        };
    }, [query]);

    return {
        results,
        loading,
    };
}