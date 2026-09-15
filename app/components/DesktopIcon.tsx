"use client";

import Link from "next/link";
import { useState } from "react";

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
      <img
        src={icon}
        alt={alt}
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
