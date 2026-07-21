import * as satellite from "satellite.js";
import { Satellite } from "../types/satellite";

const RAD2DEG = 180 / Math.PI;

export const propagateSatellite = (sat: Satellite, date = new Date()) => {
    const positionVelocity = satellite.propagate(sat.satrec as satellite.SatRec, date);

    if (!positionVelocity?.position || !positionVelocity.velocity) return null;

    const gmst = satellite.gstime(date);
    const geo = satellite.eciToGeodetic(positionVelocity.position, gmst);

    const latitude = satellite.degreesLat(geo.latitude);
    const longitude = satellite.degreesLong(geo.longitude);
    const altitude = geo.height;

    const { x, y, z } = positionVelocity.velocity;
    const velocity = Math.sqrt(x * x + y * y + z * z);

    const heading = ((Math.atan2(y, x) * RAD2DEG) + 360) % 360;

    return {
        latitude,
        longitude,
        altitude,
        velocity,
        heading,
        updatedAt: date.getTime()
    };
};