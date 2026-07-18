"use client";

export default function StatusBar() {
    return (
        <div
            className="
                mt-5
                flex
                items-center
                gap-6

                text-xs
                uppercase

                tracking-widest

                text-white/45
            "
        >
            <div className="flex items-center gap-2">

                <div
                    className="
                        h-2
                        w-2

                        rounded-full

                        bg-green-400
                        animate-pulse
                    "
                />

                LIVE

            </div>

            <span>
                Updated just now
            </span>

        </div>
    );
}