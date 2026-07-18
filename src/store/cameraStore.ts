import { create } from "zustand";

interface CameraState {
    distance: number;

    setDistance: (distance: number) => void;
}

export const useCameraStore =
    create<CameraState>((set) => ({
        distance: 8,

        setDistance: (distance) =>
            set({ distance }),
    }));