import type { CurrentWeather, WeatherData } from "../types/weather";
import type { OpenMeteoCurrentResponse } from "../api/weatherApi";

export function mapOpenMeteoResponse(
  response: OpenMeteoCurrentResponse,
  lat: number,
  lon: number,
): WeatherData {
  const current: CurrentWeather = {
    temperature: response.current.temperature_2m,
    feelsLike: response.current.apparent_temperature,
    humidity: response.current.relative_humidity_2m,
    pressure: response.current.pressure_msl,
    windSpeed: response.current.wind_speed_10m,
    windDirection: response.current.wind_direction_10m,
    cloudCover: response.current.cloud_cover,
    precipitation: response.current.precipitation,
    weatherCode: response.current.weather_code,
    isDay: response.current.is_day === 1,
  };

  return {
    location: { lat, lon },
    current,
  };
}
