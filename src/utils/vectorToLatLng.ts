import * as THREE from "three";

// Inverse of latLngToVector - given a point on (or above) the globe,
// recover the lat/lng it corresponds to. Works for any radius since
// we only care about the point's direction from the origin.
export function vectorToLatLng(point: THREE.Vector3) {
  const direction = point.clone().normalize();

  const phi = Math.acos(direction.y);
  const theta = Math.atan2(direction.z, -direction.x);

  const lat = 90 - (phi * 180) / Math.PI;
  let lon = (theta * 180) / Math.PI - 180;

  // Normalize into [-180, 180]
  lon = ((lon + 180) % 360 + 360) % 360 - 180;

  return { lat, lon };
}
