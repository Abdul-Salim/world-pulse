import { BoundingBox } from "../types/selectedRegion";

export function getBoundingBox(
    geometry: any
): BoundingBox {

    let minLat = 90;
    let maxLat = -90;
    let minLon = 180;
    let maxLon = -180;

    function processRing(ring: number[][]) {
        ring.forEach(([lon, lat]) => {
            minLat = Math.min(minLat, lat);
            maxLat = Math.max(maxLat, lat);
            minLon = Math.min(minLon, lon);
            maxLon = Math.max(maxLon, lon);
        });
    }

    if (geometry.type === "Polygon") {
        geometry.coordinates.forEach(processRing);
    }

    if (geometry.type === "MultiPolygon") {
        geometry.coordinates.forEach((polygon: number[][][]) => {
            polygon.forEach(processRing);
        });
    }

    return {
        minLat,
        maxLat,
        minLon,
        maxLon,
    };
}