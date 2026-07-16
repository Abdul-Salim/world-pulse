import * as THREE from "three";

export interface Country {
  id: string;
  name: string;
  borders: THREE.Vector3[][];
}