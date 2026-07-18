import * as THREE from "three";
import { BoundingBox } from "@/features/region/types/selectedRegion";

export type CountryGeometry =
    | {
          type: "Polygon";
          coordinates: number[][][];
      }
    | {
          type: "MultiPolygon";
          coordinates: number[][][][];
      };

export interface Country {
    id: string;
    name: string;
    borders: THREE.Vector3[][];
    geometry: CountryGeometry;
    meshGeometry: THREE.BufferGeometry;
    bounds: BoundingBox;
    center: {
        lat: number;
        lon: number;
    };
}