export type SatelliteCategory =
    | "station"
    | "starlink"
    | "weather"
    | "gps"
    | "communication"
    | "science"
    | "amateur"
    | "military"
    | "other";

export interface Satellite {
    id: number;
    name: string;
    tle1: string;
    tle2: string;
    satrec: unknown;
    latitude: number;
    longitude: number;
    altitude: number;
    velocity: number;
    heading: number;
    inclination: number;
    eccentricity: number;
    period: number;
    category: SatelliteCategory;
    country?: string;
    launchDate?: string;
    isVisible: boolean;
    color: number;
    size: number;
    updatedAt: number;
}

export interface SatelliteGroup {
    id: SatelliteCategory;
    label: string;
    color: string;
    enabled: boolean;
}

export interface SatelliteStatistics {
    total: number;
    visible: number;
    lowEarthOrbit: number;
    mediumEarthOrbit: number;
    geostationary: number;
    selected?: number;
}