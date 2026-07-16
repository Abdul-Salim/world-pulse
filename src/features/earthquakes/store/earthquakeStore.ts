import { create } from "zustand";

import { Earthquake } from "../types/earthquake";

type EarthquakeState = {
  hoveredEarthquake: Earthquake | null;
  selectedEarthquake: Earthquake | null;

  setHoveredEarthquake: (
    earthquake: Earthquake | null
  ) => void;

  setSelectedEarthquake: (
    earthquake: Earthquake | null
  ) => void;

  clearSelection: () => void;
};

export const useEarthquakeStore =
  create<EarthquakeState>((set) => ({
    hoveredEarthquake: null,

    selectedEarthquake: null,

    setHoveredEarthquake: (earthquake) =>
      set({
        hoveredEarthquake: earthquake,
      }),

    setSelectedEarthquake: (earthquake) =>
      set({
        selectedEarthquake: earthquake,
      }),

    clearSelection: () =>
      set({
        selectedEarthquake: null,
        hoveredEarthquake: null,
      }),
  }));