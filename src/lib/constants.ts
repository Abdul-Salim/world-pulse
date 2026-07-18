export const EARTH_RADIUS = 2;

export const CLOUD_RADIUS = 2.015;

export const EARTH_ROTATION_SPEED = 0.008;

export const CLOUD_ROTATION_SPEED = 0.010;

export const MARKER_RADIUS = EARTH_RADIUS + 0.02;

export const FLIGHT_LOD = [

    {
        distance: 8,
        maxFlights: 75,
        minAltitude: 35000,
    },

    {
        distance: 6,
        maxFlights: 150,
        minAltitude: 30000,
    },

    {
        distance: 5,
        maxFlights: 300,
        minAltitude: 20000,
    },

];