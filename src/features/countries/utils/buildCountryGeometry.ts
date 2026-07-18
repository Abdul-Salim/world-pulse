import * as THREE from "three";
import earcut from "earcut";

import { CountryGeometry } from "../types/country";
import { latLngToVector } from "@/utils/latLngToVector";
import { EARTH_RADIUS } from "@/lib/constants";

const SURFACE_OFFSET = 0.002;

export function buildCountryGeometry(
    geometry: CountryGeometry
): THREE.BufferGeometry {

    const positions: number[] = [];

    if (geometry.type === "Polygon") {
        buildPolygon(geometry.coordinates, positions);
    } else {
        for (const polygon of geometry.coordinates) {
            buildPolygon(polygon, positions);
        }
    }

    const mesh = new THREE.BufferGeometry();

    mesh.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(
            positions,
            3
        )
    );

    mesh.computeVertexNormals();

    return mesh;
}

function buildPolygon(
    polygon: number[][][],
    positions: number[]
) {

    if (!polygon.length) return;

    const vertices2D: number[] = [];
    const holes: number[] = [];

    let vertexCount = 0;

    polygon.forEach((ring, ringIndex) => {

        if (ringIndex > 0) {
            holes.push(vertexCount);
        }

        for (const [lon, lat] of ring) {

            vertices2D.push(lon, lat);

            vertexCount++;
        }

    });

    const triangles = earcut(
        vertices2D,
        holes,
        2
    );

    for (const index of triangles) {

        const lon = vertices2D[index * 2];
        const lat = vertices2D[index * 2 + 1];

        const point = latLngToVector(
            lat,
            lon,
            EARTH_RADIUS + SURFACE_OFFSET
        );

        positions.push(
            point.x,
            point.y,
            point.z
        );

    }

}