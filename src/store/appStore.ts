import { create } from "zustand";
import { LayerType } from "@/types/layers";


type AppState = {
  activeLayer: LayerType;
  setActiveLayer: (layer: LayerType) => void;
};

export const useAppStore = create<AppState>((set) => ({
  activeLayer: LayerType.EARTHQUAKES,

  setActiveLayer: (layer) =>
    set({
      activeLayer: layer,
    }),
}));