import { create } from "zustand";

import { Earthquake } from "../types/earthquake";

type EarthquakeState = {
  hoveredEarthquake: Earthquake | null;

  setHoveredEarthquake: (
    earthquake: Earthquake | null
  ) => void;
};

export const useEarthquakeStore =
  create<EarthquakeState>((set) => ({
    hoveredEarthquake: null,

    setHoveredEarthquake: (earthquake) =>
      set({
        hoveredEarthquake: earthquake,
      }),
  }));