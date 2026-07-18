export function score(
    query: string,
    text: string
): number {
    const q = query.trim().toLowerCase();

    const t = text.toLowerCase();

    if (!q.length) return 0;

    if (t === q) return 100;

    if (t.startsWith(q)) return 75;

    if (t.includes(q)) return 50;

    return 0;
}