import * as THREE from "three";
import polylabel from "polylabel";

import { Country } from "../types/country";
import { latLngToVector } from "@/utils/latLngToVector";
import { EARTH_RADIUS } from "@/lib/constants";
import { getBoundingBox } from "@/features/region/utils/getBoundingBox";
import { buildCountryGeometry } from "../utils/buildCountryGeometry";

const BORDER_RADIUS = EARTH_RADIUS + 0.005;

function getCountryCenter(geometry: any) {
  if (geometry.type === "Polygon") {
      const [lon, lat] = polylabel(geometry.coordinates);
      return { lat, lon };
  }

  if (geometry.type === "MultiPolygon") {
      let largest = geometry.coordinates[0];

      for (const polygon of geometry.coordinates) {
          if (polygon[0].length > largest[0].length) {
              largest = polygon;
          }
      }

      const [lon, lat] = polylabel(largest);

      return { lat, lon };
  }

  return { lat: 0, lon: 0 };
}

export function parseCountries(geoJson: any): Country[] {
  return geoJson.features.map((feature: any) => {
    const borders: THREE.Vector3[][] = [];

    const geometry = feature.geometry;
    const bounds = getBoundingBox(geometry);
    const meshGeometry = buildCountryGeometry(geometry);
    const center = getCountryCenter(geometry);
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
      name: feature.properties.name,
      borders,
      bounds,
      geometry,
      meshGeometry,
      center
    };
  });
}