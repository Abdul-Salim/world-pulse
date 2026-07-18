"use client";

import { NavigatorResult as NavigatorResultType } from "../types/navigator";

type Props = {
    result: NavigatorResultType;
    active: boolean;
    onClick: () => void;
};

export default function NavigatorResult({
    result,
    active,
    onClick,
}: Props) {
    return (
        <button
            onClick={onClick}
            className={`
                w-full
                px-6
                py-4
                text-left
                transition-all
                duration-150

                ${active
                    ? "bg-cyan-500/20"
                    : "hover:bg-white/5"
                }
            `}
        >
            <div className="flex justify-between items-center">

                <div>

                    <div className="font-medium text-white">
                        {result.title}
                    </div>

                    <div className="text-sm text-white/40 mt-1">
                        {result.subtitle}
                    </div>

                </div>

                <div
                    className="
                        rounded-full
                        bg-cyan-500/20
                        px-2
                        py-1
                        text-xs
                        uppercase
                        text-cyan-300
                    "
                >
                    {result.type}
                </div>

            </div>
        </button>
    );
}