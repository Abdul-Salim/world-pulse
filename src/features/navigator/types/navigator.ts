export type NavigatorItemType =
    | "city"
    | "country"
    | "earthquake";

export interface NavigatorResult {
    id: string;

    type: NavigatorItemType;

    title: string;

    subtitle: string;

    lat: number;

    lon: number;

    score: number;
}

export interface NavigatorProvider {
    search(
        query: string
    ): Promise<NavigatorResult[]>;
}