import * as THREE from "three";
import { Country } from "../types/country";
import { latLngToVector } from "@/utils/latLngToVector";
import { EARTH_RADIUS } from "@/lib/constants";

const BORDER_RADIUS = EARTH_RADIUS + 0.005;


export function parseCountries(geoJson: any): Country[] {
  return geoJson.features.map((feature: any) => {
    const borders: THREE.Vector3[][] = [];

    const geometry = feature.geometry;

    if (geometry.type === "Polygon") {
      geometry.coordinates.forEach((ring: number[][]) => {
        borders.push(
          ring.map(([lng, lat]) =>
            latLngToVector(lat, lng, BORDER_RADIUS)
          )
        );
      });
    }

    if (geometry.type === "MultiPolygon") {
      geometry.coordinates.forEach((polygon: number[][][]) => {
        polygon.forEach((ring) => {
          borders.push(
            ring.map(([lng, lat]) =>
              latLngToVector(lat, lng, BORDER_RADIUS)
            )
          );
        });
      });
    }

    return {
      id: feature.id ?? feature.properties.NAME,
      name: feature.properties.NAME,
      borders,
    };
  });
}