/**
 * Fetches a Google Font family as a raw TTF/OTF buffer, suitable for
 * next/og's ImageResponse (Satori only supports TTF/OTF — the woff2 files
 * modern browsers get from Google Fonts won't work here).
 *
 * Runs at build time for statically-generated icon/OG routes, so a slow or
 * failed fetch never affects real visitors — it only affects `next build`.
 * Returns null on any failure so callers can fall back to a system font
 * instead of failing the build outright.
 */
export async function loadGoogleFont(
  family: string,
  weight: number,
): Promise<ArrayBuffer | null> {
  try {
    const params = new URLSearchParams({ family: `${family}:wght@${weight}` });
    const cssResponse = await fetch(
      `https://fonts.googleapis.com/css2?${params.toString()}`,
    );
    if (!cssResponse.ok) return null;

    const css = await cssResponse.text();
    const match = css.match(
      /src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/,
    );
    if (!match) return null;

    const fontResponse = await fetch(match[1]);
    if (!fontResponse.ok) return null;

    return await fontResponse.arrayBuffer();
  } catch {
    return null;
  }
}
