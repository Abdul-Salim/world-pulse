"use client";

import { useCountryStore } from "@/features/countries/store/countryStore";

export default function CountryTooltip() {
    const hovered = useCountryStore((s) => s.hoveredCountry);

    if (!hovered) return null;

    return (
        <div
            className="
        absolute
        left-6
        top-6
        rounded-lg
        bg-black/80
        px-4
        py-2
        text-white
        pointer-events-none
        border border-white/10
      "
        >
            {hovered.name}
        </div>
    );
}