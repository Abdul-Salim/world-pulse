"use client";

import { Html } from "@react-three/drei";

import NavigationMarker from "@/features/navigator/components/NavigationMarker";
import VisibilitySystem from "@/features/flights/components/VisibilitySystem";
import FlightProvider from "@/features/flights/providers/FlightProvider";
import WeatherLayer from "@/features/weather/components/WeatherLayer";
import { LoadingOverlay } from "@/components/ui/LoadingOverlay";
import { useWeatherStore } from "@/features/weather/store/weatherStore";
import { TILE_LAYER_OPTIONS } from "@/features/weather/utils/tileLayers";
import { useAppStore } from "@/store/appStore";
import { Earthquakes, useEarthquakeStore } from "@/features/earthquakes";
import { LayerType } from "@/types/layers";
import { FlightLayer } from "@/features/flights";
import { useFlightStore } from "@/features/flights/store/flightStore";
import {
    SatelliteLayer,
    SatelliteOrbit,
    SatelliteFollow,
    SatelliteProvider,
    useSatelliteStore,
    SatelliteSearch,
    SatelliteInfoPanel
} from "@/features/satellites";

export default function LayerManager() {
    const layer = useAppStore((s) => s.activeLayer);
    const isWeatherLoading = useWeatherStore((s) => s.isLoading);
    const isFlightsLoading = useFlightStore((s) => s.loading);
    const isEarthquakesLoading = useEarthquakeStore((s) => s.loading);
    const satellitesLoading = useSatelliteStore((s) => s.loading);


    const activeWeatherLayer = useWeatherStore(
        (s) => s.activeTileLayer
    );

    const activeWeatherLayerLabel =
        TILE_LAYER_OPTIONS.find(
            (item) => item.id === activeWeatherLayer
        )?.label ?? "";

    return (
        <>
            <NavigationMarker />

            {layer === LayerType.EARTHQUAKES && (
                <>
                    <Earthquakes />

                    {isEarthquakesLoading && (
                        <Html>
                            <LoadingOverlay
                                visible
                                text="Earthquake data loading..."
                            />
                        </Html>
                    )}
                </>
            )}

            {layer === LayerType.FLIGHTS && (
                <FlightProvider>
                    <VisibilitySystem />
                    <FlightLayer />

                    {isFlightsLoading && (
                        <Html>
                            <LoadingOverlay
                                visible
                                text="Loading Flights data..."
                            />
                        </Html>
                    )}
                </FlightProvider>
            )}

            {layer === LayerType.WEATHER && (
                <>
                    <WeatherLayer />

                    {isWeatherLoading && (
                        <Html>
                            <LoadingOverlay
                                visible
                                text={`Loading ${activeWeatherLayerLabel} data...`}
                            />
                        </Html>
                    )}
                </>
            )}

            {layer === LayerType.SATELLITES && (
                <SatelliteProvider>
                    <SatelliteLayer />
                    <SatelliteOrbit />
                    <SatelliteFollow />
                    {satellitesLoading && (
                        <Html>
                            <LoadingOverlay
                                visible
                                text={`Loading satellites data...`}
                            />
                        </Html>
                    )}
                </SatelliteProvider>
            )}
        </>
    );
}