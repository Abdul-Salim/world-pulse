import { create } from "zustand";
import * as THREE from "three";

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

  cameraTarget: THREE.Vector3 | null;
    setCameraTarget: (
        target: THREE.Vector3 | null
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
  cameraTarget: null,

  setCameraTarget: (target) =>
      set({
          cameraTarget: target,
      }),
  setHoveredEarthquake: (earthquake) =>
    set({
      hoveredEarthquake: earthquake,
    }),

  setSelectedEarthquake: (earthquake) =>
    set({
      selectedEarthquake: earthquake,
    }),
}));