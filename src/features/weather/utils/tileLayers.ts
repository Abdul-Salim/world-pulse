import type { WeatherTileLayer } from "../store/weatherStore";

// OpenWeatherMap's free tile layers - Web Mercator XYZ tiles, same
// format your satellite basemap already uses. Needs an API key:
// see NEXT_PUBLIC_OWM_API_KEY in .env.local.
export const OWM_LAYER_ID: Record<WeatherTileLayer, string> = {
  clouds: "clouds_new",
  precipitation: "precipitation_new",
  temp: "temp_new",
  wind: "wind_new",
};

export const TILE_LAYER_OPTIONS: {
  id: WeatherTileLayer;
  label: string;
}[] = [
  { id: "clouds", label: "Clouds" },
  { id: "precipitation", label: "Precipitation" },
  { id: "temp", label: "Temperature" },
  { id: "wind", label: "Wind" },
];


export function getTileUrl(
  layer: WeatherTileLayer,
  zoom: number,
  x: number,
  y: number
): string {
  return `/api/weather-tiles/${layer}/${zoom}/${x}/${y}`;
}
