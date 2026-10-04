"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Real pixel dimensions of the nav icons, keyed by filename, so Image gets
// the correct aspect ratio without needing a separate lookup file. Also
// imported by DesktopMusicIcon, MobileNavLink and MobileMusicRow.
const ICON_DIMENSIONS: Record<string, { width: number; height: number }> = {
  "experience-icon.png": { width: 306, height: 384 },
  "film-strip-icon.png": { width: 736, height: 736 },
  "folder-icon.png": { width: 388, height: 373 },
  "hobbies-icon.png": { width: 379, height: 335 },
  "music-icon.png": { width: 393, height: 362 },
  "projects-icon.png": { width: 380, height: 359 },
  "socials-icon.png": { width: 374, height: 361 },
};

export function getIconDimensions(src: string) {
  const basename = src.split("/").pop() ?? src;
  return ICON_DIMENSIONS[basename] ?? { width: 400, height: 400 };
}

interface DesktopIconProps {
  href: string;
  label: string;
  icon: string;
  alt: string;
  left: number;
  top: number;
  width: number;
  rotate: number;
  hoverRotate: number;
}

export function DesktopIcon({
  href,
  label,
  icon,
  alt,
  left,
  top,
  width,
  rotate,
  hoverRotate,
}: DesktopIconProps) {
  const [active, setActive] = useState(false);
  const { width: iw, height: ih } = getIconDimensions(icon);

  return (
    <Link
      href={href}
      className="absolute block no-underline"
      style={{ left: `${left}%`, top: `${top}%`, width: `${width}%` }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <span
        className="pointer-events-none absolute bottom-full left-1/2 whitespace-nowrap font-mono font-semibold tracking-widest text-ink transition-opacity duration-200"
        style={{
          marginBottom: "0.8cqw",
          transform: "translateX(-50%)",
          fontSize: "clamp(11px, 0.95cqw, 16px)",
          opacity: active ? 1 : 0,
        }}
      >
        {label}
      </span>
      <Image
        src={icon}
        alt={alt}
        width={iw}
        height={ih}
        sizes="15vw"
        className="block h-auto w-full transition-transform duration-300"
        style={{
          transform: `rotate(${active ? hoverRotate : rotate}deg) scale(${active ? 1.06 : 1})`,
          transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)",
          filter: "drop-shadow(0 8px 14px rgba(40,30,25,0.18))",
        }}
      />
    </Link>
  );
}
