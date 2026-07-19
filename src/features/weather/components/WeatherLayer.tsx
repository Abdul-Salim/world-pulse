"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ThreeEvent } from "@react-three/fiber";

import { WEATHER_LAYER_RADIUS } from "@/lib/constants";
import { vectorToLatLng } from "@/utils/vectorToLatLng";
import { useTargetStore } from "@/features/navigator/store/targetStore";

import { useWeatherStore } from "../store/weatherStore";
import { getTileUrl } from "../utils/tileLayers";
import { fetchCurrentWeather, fetchLocationName } from "../api/weatherApi";
import { mapOpenMeteoResponse } from "../utils/weatherMapper";
import { describeWeatherCode } from "../utils/weatherCode";

const ZOOM = 2;
const TILE_SIZE = 256;
const GRID = 2 ** ZOOM;
const REFRESH_MS = 10 * 60 * 1000;

export default function WeatherLayer() {
    const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
    const activeTileLayer = useWeatherStore((s) => s.activeTileLayer);
    const setTileLoadError = useWeatherStore((s) => s.setTileLoadError);
    const setIsLoading = useWeatherStore((s) => s.setIsLoading);
    const setTarget = useTargetStore((s) => s.setTarget);
    const cacheBustRef = useRef(0);

    useEffect(() => {
        let cancelled = false;

        async function loadTexture() {
            setIsLoading(true);
            const canvas = document.createElement("canvas");
            canvas.width = TILE_SIZE * GRID;
            canvas.height = TILE_SIZE * GRID;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            cacheBustRef.current += 1;
            const cacheBust = cacheBustRef.current;

            let successCount = 0;
            const loads: Promise<void>[] = [];

            for (let x = 0; x < GRID; x++) {
                for (let y = 0; y < GRID; y++) {
                    loads.push(
                        new Promise<void>((resolve) => {
                            const img = new Image();

                            img.onload = () => {
                                ctx.drawImage(img, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                                successCount += 1;
                                resolve();
                            };

                            img.onerror = () => resolve();

                            img.src = `${getTileUrl(activeTileLayer, ZOOM, x, y)}?_=${cacheBust}`;
                        })
                    );
                }
            }

            await Promise.all(loads);

            if (cancelled) return;
            if (successCount === 0) {
                setTileLoadError(true);
                setIsLoading(false);
                return;
            }

            setTileLoadError(false);

            const nextTexture = new THREE.CanvasTexture(canvas);
            nextTexture.needsUpdate = true;

            setTexture((prev) => {
                prev?.dispose();
                return nextTexture;
            });
            setIsLoading(false);
        }

        loadTexture();
        const interval = setInterval(loadTexture, REFRESH_MS);

        return () => {
            cancelled = true;
            clearInterval(interval);
        };
    }, [activeTileLayer, setTileLoadError]);

    const handleClick = async (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        const { lat, lon } = vectorToLatLng(event.point);
        const id = `weather-${lat.toFixed(2)}-${lon.toFixed(2)}`;

        setTarget({
            id, title: "Loading...", subtitle: `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`,
            lat, lon, type: "weather", metadata: null,
        });

        try {
            const [raw, location] = await Promise.all([
                fetchCurrentWeather(lat, lon),
                fetchLocationName(lat, lon),
            ]);

            const weather = mapOpenMeteoResponse(raw, lat, lon);

            const city =
                location.address?.city ||
                location.address?.town ||
                location.address?.village ||
                location.address?.municipality ||
                location.address?.county ||
                "Unknown Location";

            const country = location.address?.country ?? "";

            setTarget({
                id,
                title: city,
                subtitle: country,
                lat,
                lon,
                type: "weather",
                metadata: weather,
            });
        } catch {
            setTarget({
                id, title: "Weather unavailable", subtitle: `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`,
                lat, lon, type: "weather", metadata: null,
            });
        }
    };

    return (
        <>
            <mesh
                key={texture?.uuid}
                onClick={handleClick}
            >
                <sphereGeometry args={[WEATHER_LAYER_RADIUS, 128, 128]} />
                <meshBasicMaterial
                    map={texture ?? undefined}
                    transparent
                    opacity={texture ? 0.75 : 0}
                    depthWrite={false}
                />
            </mesh>
        </>
    );
}