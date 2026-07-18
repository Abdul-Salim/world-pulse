import { FlightZoomLevel } from "./lod";

export function getFlightZoomLevel(
    cameraDistance: number
): FlightZoomLevel {

    if (cameraDistance > 8)
        return "WORLD";

    if (cameraDistance > 6)
        return "CONTINENT";

    if (cameraDistance > 4)
        return "REGION";

    return "LOCAL";
}