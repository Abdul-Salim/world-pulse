import { create } from "zustand";
import { Satellite, SatelliteCategory } from "../types/satellite";

interface SatelliteStore {
    satellites: Satellite[];
    satelliteMap: Map<number, Satellite>;
    loading: boolean;
    selectedSatelliteId: number | null;
    hoveredSatelliteId: number | null;
    followedSatelliteId: number | null;
    search: string;
    visibleCategories: Record<SatelliteCategory, boolean>;
    setSatellites: (satellites: Satellite[]) => void;
    updateSatellites: () => void;
    setLoading: (loading: boolean) => void;
    setSelectedSatellite: (id: number | null) => void;
    setHoveredSatellite: (id: number | null) => void;
    setFollowedSatellite: (id: number | null) => void;
    setSearch: (value: string) => void;
    toggleCategory: (category: SatelliteCategory) => void;
    showAllCategories: () => void;
    hideAllCategories: () => void;
}

const categories: SatelliteCategory[] = [
    "station",
    "starlink",
    "weather",
    "gps",
    "communication",
    "science",
    "amateur",
    "military",
    "other"
];

const createVisibility = (value: boolean) =>
    categories.reduce(
        (acc, category) => {
            acc[category] = value;
            return acc;
        },
        {} as Record<SatelliteCategory, boolean>
    );

export const useSatelliteStore = create<SatelliteStore>((set) => ({
    satellites: [],
    satelliteMap: new Map(),
    loading: false,
    selectedSatelliteId: null,
    hoveredSatelliteId: null,
    followedSatelliteId: null,
    search: "",
    visibleCategories: createVisibility(true),

    setSatellites: (satellites) =>
        set({
            satellites,
            satelliteMap: new Map(
                satellites.map((sat) => [sat.id, sat])
            ),
        }),
    
    updateSatellites: () =>
        set((state) => ({
            satellites: [...state.satellites],
        })),
            setLoading: (loading) => set({ loading }),
    setSelectedSatellite: (id) =>
        set({ selectedSatelliteId: id }),

    setHoveredSatellite: (id) =>
        set({ hoveredSatelliteId: id }),

    setFollowedSatellite: (id) =>
        set({ followedSatelliteId: id }),

    setSearch: (search) =>
        set({ search }),

    toggleCategory: (category) =>
        set((state) => ({
            visibleCategories: {
                ...state.visibleCategories,
                [category]: !state.visibleCategories[category]
            }
        })),

    showAllCategories: () =>
        set({ visibleCategories: createVisibility(true) }),

    hideAllCategories: () =>
        set({ visibleCategories: createVisibility(false) })
}));