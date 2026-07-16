import { create } from "zustand";

import { Earthquake } from "@/types/earthquake";
import { LayerType } from "@/types/layers";

type WorldState = {
  // Layer State
  activeLayer: LayerType;
  setActiveLayer: (layer: LayerType) => void;

  // Earthquake State
  hoveredEarthquake: Earthquake | null;
  selectedEarthquake: Earthquake | null;

  setHoveredEarthquake: (
    earthquake: Earthquake | null
  ) => void;

  setSelectedEarthquake: (
    earthquake: Earthquake | null
  ) => void;
};

export const useWorldStore = create<WorldState>((set) => ({
  // Layer
  activeLayer: LayerType.EARTHQUAKES,

  setActiveLayer: (layer) =>
    set({
      activeLayer: layer,
    }),

  // Earthquake
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
}));