import {
    NavigatorProvider,
    NavigatorResult,
} from "../types/navigator";

import { score } from "../utils/score";

type City = {
    id: string;
    title: string;
    subtitle: string;
    lat: number;
    lon: number;
    population: number;
};

export class PlaceProvider
    implements NavigatorProvider
{
    private cities: City[] = [];

    private loaded = false;

    private async load() {
        if (this.loaded) return;

        const res = await fetch("/data/cities.json");

        this.cities = await res.json();

        this.loaded = true;
    }

    async search(
        query: string
    ): Promise<NavigatorResult[]> {
        query = query.trim();

        if (!query) return [];

        await this.load();

        return this.cities
            .map((city) => ({
                ...city,
                type: "city" as const,
                score: score(query, city.title),
            }))
            .filter((city) => city.score > 0)
            .sort((a, b) => {
                // Higher search score first
                if (b.score !== a.score) {
                    return b.score - a.score;
                }

                // If scores tie, larger cities first
                return (
                    b.population - a.population
                );
            })
            .slice(0, 50);
    }
}

export const placeProvider =
    new PlaceProvider();