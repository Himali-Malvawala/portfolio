import { ImageResponse } from "next/og";
import { buildShareImageElement, OG_SIZE } from "../lib/og-image";

export const alt = "himali malvawala";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  const { element, fonts } = await buildShareImageElement();
  return new ImageResponse(element, { ...size, fonts });
}
