"use client";

import { Search } from "lucide-react";

import { useNavigatorStore } from "@/features/navigator/store/navigatorStore";

export default function SearchPill() {
    const setOpen = useNavigatorStore(
        (s) => s.setOpen
    );

    return (
        <button
            onClick={() => setOpen(true)}
            className="
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-white
                bg-black/50
                px-4
                py-2
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-cyan-400
                hover:bg-black/70
                hover:shadow-[0_0_30px_rgba(34,211,238,.15)]
                min-w-xs
            "
        >
            <Search
                size={16}
                className="text-cyan-400"
            />

            <span className="text-sm text-white/70 w-full text-start">
                Search...
            </span>

            <kbd
                className="
                    rounded-md

                    border
                    border-white/10

                    bg-white/5

                    px-2
                    py-1

                    text-xs

                    text-white/50
                "
            >
                /
            </kbd>
        </button>
    );
}