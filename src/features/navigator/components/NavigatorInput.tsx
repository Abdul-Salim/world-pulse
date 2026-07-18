"use client";

import { useEffect, useRef } from "react";

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export default function NavigatorInput({
    value,
    onChange,
}: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div className="border-b border-white/10 p-5">
            <input
                ref={inputRef}
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                placeholder="Search cities, countries..."
                className="
                    w-full
                    bg-transparent
                    outline-none
                    text-xl
                    text-white
                    placeholder:text-white/40
                "
            />
        </div>
    );
}