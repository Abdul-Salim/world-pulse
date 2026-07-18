"use client";

import LayerToolbar from "./LayerToolbar";
import Logo from "./Logo";
import SearchPill from "./SearchPill";
import StatusBar from "./StatusBar";

export default function Header() {
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

                <SearchPill />

            </div>
        </header>
    );
}