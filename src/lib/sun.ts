import * as THREE from "three";

/**
 * Single source of truth for the "sun" direction, shared between:
 *  - Lighting.tsx        (the actual directional light in the scene)
 *  - EarthMaterial shader (day/night blending, must match the light exactly)
 *
 * If you ever want a day/night cycle, this is the one vector to animate.
 */
export const SUN_POSITION = new THREE.Vector3(10, 3, 8);

export const SUN_DIRECTION = SUN_POSITION.clone().normalize();