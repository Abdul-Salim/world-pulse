import { create } from "zustand";
import * as THREE from "three";
import { LayerType } from "@/types/layers";


type AppState = {
  activeLayer: LayerType;
  setActiveLayer: (layer: LayerType) => void;

  cameraTarget: THREE.Vector3 | null;
  setCameraTarget: (target: THREE.Vector3 | null) => void;
};

export const useAppStore = create<AppState>((set) => ({
  activeLayer: LayerType.EARTHQUAKES,

  setActiveLayer: (layer) =>
    set({
      activeLayer: layer,
    }),

  cameraTarget: null,

  setCameraTarget: (target) =>
    set({
      cameraTarget: target,
    }),
}));