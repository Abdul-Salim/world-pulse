import { NextRequest, NextResponse } from "next/server";
import { getOpenSkyToken } from "@/lib/openskyAuth";

const OPENSKY_URL =
    "https://opensky-network.org/api/states/all";

export async function GET(request: NextRequest) {
    try {

        const url = new URL(OPENSKY_URL);

        const token = await getOpenSkyToken();

        const response = await fetch(url.toString(), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            next: {
                revalidate: 15,
            },
        });
        
        if (!response.ok) {
            return NextResponse.json(
                {
                    message: "Unable to fetch flights",
                },
                {
                    status: response.status,
                }
            );
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                message: "Internal Server Error",
            },
            {
                status: 500,
            }
        );
    }
}