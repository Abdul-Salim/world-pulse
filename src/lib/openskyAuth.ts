let accessToken: string | null = null;
let expiresAt = 0;

const TOKEN_URL =
    "https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token";

export async function getOpenSkyToken(): Promise<string> {
    const now = Date.now();

    if (accessToken && now < expiresAt - 60_000) {
        return accessToken;
    }

    const body = new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.OPENSKY_CLIENT_ID!,
        client_secret: process.env.OPENSKY_CLIENT_SECRET!,
    });

    const response = await fetch(TOKEN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
    });

    if (!response.ok) {
        throw new Error("Failed to obtain OpenSky access token");
    }

    const data = await response.json();

    accessToken = data.access_token;
    expiresAt = now + data.expires_in * 1000;

    return accessToken!;
}