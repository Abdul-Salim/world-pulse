export interface Flight {
    id: string;
    icao24: string;
    callsign: string;
    airline?: string;

    latitude: number;
    longitude: number;

    heading: number;
    altitude: number;
    velocity: number;
    verticalRate?: number;

    originCountry: string;
    onGround: boolean;
    
    lastContact: number;
    updatedAt: number;
}


export interface ScoredFlight {
    flight: Flight;
    score: number;
}