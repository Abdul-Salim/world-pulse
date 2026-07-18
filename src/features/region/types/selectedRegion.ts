export interface BoundingBox {
    minLat: number;
    maxLat: number;
    minLon: number;
    maxLon: number;
}

export interface SelectedRegion {
    id: string;
    name: string;

    bounds: BoundingBox;
}