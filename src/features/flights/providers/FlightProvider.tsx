"use client";

import { PropsWithChildren, useEffect } from "react";

import { fetchFlights } from "../api/opensky";
import { useFlightStore } from "../store/flightStore";

export default function FlightProvider({
    children,
}: PropsWithChildren) {

    const setFlights = useFlightStore(
        (s) => s.setFlights
    );

    const setLoading = useFlightStore(
        (s) => s.setLoading
    );

    const setError = useFlightStore(
        (s) => s.setError
    );

    useEffect(() => {

        let mounted = true;

        async function load() {

            try {

                setLoading(true);

                const flights = await fetchFlights();

                if (mounted) {
                    setFlights(flights);
                }

            } catch (err) {

                if (mounted) {
                    setError("Unable to load flights");
                    console.error(err);
                }

            } finally {

                if (mounted) {
                    setLoading(false);
                }

            }
        }

        load();
    }, []);

    return children;
}