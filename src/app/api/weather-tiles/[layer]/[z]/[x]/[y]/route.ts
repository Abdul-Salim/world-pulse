import { NextRequest, NextResponse } from "next/server";

const OWM_LAYER_ID: Record<string, string> = {
    clouds: "clouds_new",
    precipitation: "precipitation_new",
    temp: "temp_new",
    wind: "wind_new",
};

type Params = {
    layer: string;
    z: string;
    x: string;
    y: string;
};

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<Params> }
) {
    const { layer, z, x, y } = await params;

    const owmLayer = OWM_LAYER_ID[layer];

    if (!owmLayer) {
        return NextResponse.json(
            { message: "Unknown layer" },
            { status: 400 }
        );
    }

    if (![z, x, y].every((value) => /^\d+$/.test(value))) {
        return NextResponse.json(
            { message: "Invalid tile coordinates" },
            { status: 400 }
        );
    }

    const apiKey = process.env.OWM_API_KEY;

    if (!apiKey) {
        return NextResponse.json(
            { message: "OWM_API_KEY is not configured" },
            { status: 503 }
        );
    }

    const tileUrl = `https://tile.openweathermap.org/map/${owmLayer}/${z}/${x}/${y}.png?appid=${apiKey}`;

    try {
        const response = await fetch(tileUrl);

        if (!response.ok) {
            return NextResponse.json(
                { message: "Upstream tile request failed" },
                { status: response.status }
            );
        }

        const buffer = await response.arrayBuffer();

        return new NextResponse(buffer, {
            headers: {
                "Content-Type": "image/png",
                "Cache-Control": "public, max-age=600",
            },
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
