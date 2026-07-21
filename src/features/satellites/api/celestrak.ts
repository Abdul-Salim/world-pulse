import * as satellite from "satellite.js";
import { Satellite, SatelliteCategory } from "../types/satellite";

const CACHE_PREFIX = "worldpulse_satellites_";
const CACHE_DURATION = 2 * 60 * 60 * 1000;

const GROUPS = [
    { group: "stations", category: "station", color: 0x38bdf8, size: 2.6 },
    { group: "starlink", category: "starlink", color: 0xffffff, size: 1.6 },
    { group: "gps-ops", category: "gps", color: 0x22c55e, size: 2 },
    { group: "weather", category: "weather", color: 0xf59e0b, size: 2 }
] as const;

const BASE_URL =
    "https://celestrak.org/NORAD/elements/gp.php?FORMAT=tle&GROUP=";

const countryFromName = (name: string) => {
    if (name.includes("STARLINK")) return "USA";
    if (name.includes("COSMOS")) return "Russia";
    if (name.includes("NAVSTAR")) return "USA";
    if (name.includes("GALILEO")) return "EU";
    if (name.includes("BEIDOU")) return "China";
    if (name.includes("GLONASS")) return "Russia";
    if (name.includes("NOAA")) return "USA";
    if (name.includes("METEOR")) return "Russia";
    if (name.includes("ISS")) return "International";
    return undefined;
};

const parseGroup = (
    text: string,
    category: SatelliteCategory,
    color: number,
    size: number
): Satellite[] => {
    const lines = text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

    const satellites: Satellite[] = [];

    for (let i = 0; i + 2 < lines.length; i += 3) {
        const name = lines[i];
        const tle1 = lines[i + 1];
        const tle2 = lines[i + 2];

        if (!tle1.startsWith("1 ") || !tle2.startsWith("2 ")) continue;

        try {
            const satrec = satellite.twoline2satrec(tle1, tle2);

            const id = Number(tle1.substring(2, 7));
            const inclination = Number(tle2.substring(8, 16));
            const eccentricity = Number(`0.${tle2.substring(26, 33).trim()}`);
            const meanMotion = Number(tle2.substring(52, 63));
            const period = meanMotion ? 1440 / meanMotion : 0;

            satellites.push({
                id,
                name,
                tle1,
                tle2,
                satrec,
                latitude: 0,
                longitude: 0,
                altitude: 0,
                velocity: 0,
                heading: 0,
                inclination,
                eccentricity,
                period,
                category,
                country: countryFromName(name),
                isVisible: false,
                color,
                size,
                updatedAt: 0
            });
        } catch {}
    }

    return satellites;
};

const loadGroup = async (
    group: string,
    category: SatelliteCategory,
    color: number,
    size: number
) => {
    const key = `${CACHE_PREFIX}${group}`;

    const cached = localStorage.getItem(key);

    if (cached) {
        const parsed = JSON.parse(cached);

        if (Date.now() - parsed.timestamp < CACHE_DURATION) {
            return parseGroup(parsed.data, category, color, size);
        }
    }

    const res = await fetch(`${BASE_URL}${group}`);

    if (!res.ok) {
        throw new Error(`Failed to load ${group}`);
    }

    const text = await res.text();

    localStorage.setItem(
        key,
        JSON.stringify({
            timestamp: Date.now(),
            data: text
        })
    );

    return parseGroup(text, category, color, size);
};

export const fetchSatellites = async (): Promise<Satellite[]> => {
    const responses = await Promise.all(
        GROUPS.map((g) =>
            loadGroup(g.group, g.category, g.color, g.size)
        )
    );

    const unique = new Map<number, Satellite>();

    for (const group of responses) {
        for (const satellite of group) {
            if (!unique.has(satellite.id)) {
                unique.set(satellite.id, satellite);
            }
        }
    }

    return [...unique.values()];
};