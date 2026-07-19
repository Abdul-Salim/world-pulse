import { create } from "zustand";

export type WeatherTileLayer = "clouds" | "precipitation" | "temp" | "wind";

interface WeatherStore {
  isLoading: boolean;
  setIsLoading: (loading:boolean) => void;
  
  activeTileLayer: WeatherTileLayer;
  setActiveTileLayer: (layer: WeatherTileLayer) => void;

  tileLoadError: boolean;
  setTileLoadError: (hasError: boolean) => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  activeTileLayer: "clouds",
  isLoading: false,

  setIsLoading: (loading) =>
      set({ isLoading: loading }),
  setActiveTileLayer: (layer) =>
    set({
      activeTileLayer: layer,
    }),

  tileLoadError: false,

  setTileLoadError: (hasError) =>
    set({
      tileLoadError: hasError,
    }),
}));
