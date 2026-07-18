import { create } from "zustand";

import { SelectedRegion } from "../types/selectedRegion";

interface RegionState {
    selectedRegion?: SelectedRegion;

    setSelectedRegion: (
        region?: SelectedRegion
    ) => void;

    clearSelectedRegion: () => void;
}

export const useSelectedRegionStore =
    create<RegionState>((set) => ({
        selectedRegion: undefined,

        setSelectedRegion: (region) =>
            set({
                selectedRegion: region,
            }),

        clearSelectedRegion: () =>
            set({
                selectedRegion: undefined,
            }),
    }));