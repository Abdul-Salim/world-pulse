import { create } from "zustand";

export interface CountryInfo {
  id: string;
  name: string;
}

type CountryState = {
  hoveredCountry: CountryInfo | null;
  selectedCountry: CountryInfo | null;

  setHoveredCountry: (country: CountryInfo | null) => void;
  setSelectedCountry: (country: CountryInfo | null) => void;
};

export const useCountryStore = create<CountryState>((set) => ({
  hoveredCountry: null,
  selectedCountry: null,

  setHoveredCountry: (country) =>
    set({ hoveredCountry: country }),

  setSelectedCountry: (country) =>
    set({ selectedCountry: country }),
}));