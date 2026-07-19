// OpenSky reports altitude/velocity/vertical rate in metric (meters, m/s).
// FlightRadar24-style displays use feet and knots, so convert for display.

export function formatAltitude(meters: number): string {
    if (!meters) return "—";

    const feet = Math.round(meters * 3.28084);

    return `${feet.toLocaleString()} ft`;
}

export function formatSpeed(metersPerSecond: number): string {
    if (!metersPerSecond) return "—";

    const knots = Math.round(metersPerSecond * 1.94384);

    return `${knots.toLocaleString()} kt`;
}

export function formatVerticalRate(metersPerSecond?: number): string {
    if (!metersPerSecond) return "Level";

    const feetPerMinute = Math.round(metersPerSecond * 196.85);

    if (feetPerMinute > 50) return `Climbing ${feetPerMinute.toLocaleString()} fpm`;
    if (feetPerMinute < -50) return `Descending ${Math.abs(feetPerMinute).toLocaleString()} fpm`;

    return "Level";
}

export function formatHeading(degrees: number): string {
    const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(degrees / 45) % 8;

    return `${Math.round(degrees)}° ${dirs[index]}`;
}

export function formatLastContact(epochSeconds: number): string {
    if (!epochSeconds) return "—";

    const secondsAgo = Math.max(
        0,
        Math.round(Date.now() / 1000 - epochSeconds)
    );

    if (secondsAgo < 60) return `${secondsAgo}s ago`;

    return `${Math.round(secondsAgo / 60)}m ago`;
}
