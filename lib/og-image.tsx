export const OG_SIZE = { width: 1200, height: 630 };

// Bundled locally rather than fetched from Google Fonts at build time.
// Satori (which ImageResponse uses under the hood) only reads TTF/OTF, and
// relying on Google's CSS response happening to contain a legacy TTF link
// turned out not to be reliable — it can return zero usable fonts, which
// Satori treats as a hard error rather than something it can fall back
// from. Bundling the actual files removes that whole class of failure.
//
// Read via fs, not fetch(): fetch() on a file:// URL only works in the
// Edge runtime. This route runs on the Node.js runtime, where undici's
// fetch has no local-file support at all ("not implemented... yet").
// new URL(..., import.meta.url) is kept (rather than a plain relative
// path) because that's the pattern Next.js's build-time file tracer
// recognizes to bundle the referenced font file into the deployment.
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";

async function loadFont(url: URL): Promise<ArrayBuffer> {
  const buffer = await readFile(fileURLToPath(url));
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  ) as ArrayBuffer;
}

export async function buildShareImageElement() {
  const [homemadeApple, sourceCodePro] = await Promise.all([
    loadFont(new URL("./fonts/HomemadeApple-Regular.ttf", import.meta.url)),
    loadFont(new URL("./fonts/SourceCodePro-Medium.otf", import.meta.url)),
  ]);

  const element = (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        background: "#9BB4C0",
      }}
    >
      <div
        style={{
          fontFamily: "Homemade Apple",
          fontSize: 100,
          color: "#703B3B",
        }}
      >
        hi! i&apos;m himali!
      </div>
      <div
        style={{
          fontFamily: "Source Code Pro",
          fontWeight: 500,
          fontSize: 28,
          letterSpacing: 2,
          color: "#3b3029",
        }}
      >
        welcome! click around to learn about me :)
      </div>
    </div>
  );

  const fonts = [
    {
      name: "Homemade Apple",
      data: homemadeApple,
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Source Code Pro",
      data: sourceCodePro,
      weight: 500 as const,
      style: "normal" as const,
    },
  ];

  return { element, fonts };
}
