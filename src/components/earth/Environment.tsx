"use client";

import Stars from "./Stars";

type Props = {
    active: boolean;
};

export default function Environment({ active }: Props) {
    return (
        <>
            <Stars active={active} />
        </>
    );
}