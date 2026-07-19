export interface WeatherLocation {
    lat: number;
    lon: number;
  }
  
  export interface CurrentWeather {
    temperature: number;
    feelsLike: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    windDirection: number;
    cloudCover: number;
    precipitation: number;
    weatherCode: number;
    isDay: boolean;
  }
  
  export interface WeatherData {
    location: WeatherLocation;
    current: CurrentWeather;
  }
  