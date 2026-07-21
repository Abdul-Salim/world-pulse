import { create } from "zustand";

import { Earthquake } from "../types/earthquake";

type EarthquakeState = {
  hoveredEarthquake: Earthquake | null;
  loading: boolean

  setHoveredEarthquake: (
    earthquake: Earthquake | null
  ) => void;

  setLoading: (loading: boolean) => void;
};

export const useEarthquakeStore =
  create<EarthquakeState>((set) => ({
    hoveredEarthquake: null,
    loading: false,

    setHoveredEarthquake: (earthquake) =>
      set({
        hoveredEarthquake: earthquake,
      }),
      setLoading: (loading) => set({ loading }),
  }));