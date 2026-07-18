"use client";

import { useEffect } from "react";

import NavigatorDialog from "./NavigatorDialog";

import { useNavigatorStore } from "../store/navigatorStore";

export default function Navigator() {
    const open = useNavigatorStore((s) => s.open);
    const setOpen = useNavigatorStore((s) => s.setOpen);
    const clear = useNavigatorStore((s) => s.clear);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            const target = event.target;

            if (
                event.key === "/" &&
                !(target instanceof HTMLInputElement) &&
                !(target instanceof HTMLTextAreaElement)
            ) {
                event.preventDefault();
                setOpen(true);
                return;
            }

            if (event.key === "Escape") {
                clear();
            }
        }

        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [setOpen, clear]);

    if (!open) {
        return null;
    }

    return <NavigatorDialog />;
}