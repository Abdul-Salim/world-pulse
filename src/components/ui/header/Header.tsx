"use client";

import { useAppStore } from "@/store/appStore";
import LayerToolbar from "./LayerToolbar";
import Logo from "./Logo";
import SearchPill from "./SearchPill";
import StatusBar from "./StatusBar";
import { LayerType } from "@/types/layers";
import { SatelliteSearch } from "@/features/satellites";

export default function Header() {
    const layer = useAppStore((s) => s.activeLayer);
    return (
        <header
            className="
                absolute
                top-0
                left-0
                right-0
                z-50

                flex
                items-start
                justify-between

                px-8
                py-6

                pointer-events-none
            "
        >
            <div className="pointer-events-auto">
                <Logo />

                <LayerToolbar />

                <StatusBar />

            </div>

            <div className="pointer-events-auto">

                {layer === LayerType.SATELLITES ?
                    <SatelliteSearch />
                    :
                    <SearchPill />
                }

            </div>
        </header>
    );
}