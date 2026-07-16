import { Earthquake } from "@/types/earthquake";

export async function getEarthquakes(): Promise<Earthquake[]> {
  const response = await fetch(
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
  );

  const json = await response.json();

  return json.features.map((item: any) => ({
    id: item.id,
    magnitude: item.properties.mag ?? 0,
    place: item.properties.place,
    time: item.properties.time,

    longitude: item.geometry.coordinates[0],
    latitude: item.geometry.coordinates[1],
    depth: item.geometry.coordinates[2],
  }));
}