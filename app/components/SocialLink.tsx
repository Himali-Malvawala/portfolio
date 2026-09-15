"use client";

import Link from "next/link";
import { useState } from "react";

interface SocialLinkProps {
  href: string;
  external?: boolean;
  icon: string;
  alt: string;
  imgWidthPct: number;
  imgMaxWidth: number;
  rotate: number;
  label: string;
  detail: string;
}

export function SocialLink({
  href,
  external,
  icon,
  alt,
  imgWidthPct,
  imgMaxWidth,
  rotate,
  label,
  detail,
}: SocialLinkProps) {
  const [active, setActive] = useState(false);

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="flex min-h-11 flex-col items-center gap-3.5 no-underline transition-transform duration-350"
      style={{
        transform: `rotate(${active ? 0 : rotate}deg) scale(${active ? 1.06 : 1})`,
        transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)",
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <img
        src={icon}
        alt={alt}
        className="block h-auto"
        style={{
          width: `${imgWidthPct}%`,
          maxWidth: `${imgMaxWidth}px`,
          filter: "drop-shadow(0 10px 18px rgba(40,30,25,0.2))",
        }}
      />
      <span className="font-mono text-[clamp(13px,1.1vw,16px)] font-medium tracking-[0.14em] pt-2 text-white">
        {label}
      </span>
      <span
        className="text-center font-mono text-[clamp(11px,0.9vw,13px)] tracking-[0.04em] text-white"
        style={{ wordBreak: "break-word" }}
      >
        {detail}
      </span>
    </Link>
  );
}
