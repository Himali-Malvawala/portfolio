"use client";

import Link from "next/link";
import { useState } from "react";

export interface HobbyCardData {
  key: string;
  title: string;
  description: string;
  rotate: number;
  bg?: string;
  image?: { src: string; alt: string };
  /** "photo" bleeds the image to the card edges (4:5) with no inner border-radius;
   *  "standard" (default) keeps the image inset within the card's own padding (4:3). */
  variant?: "standard" | "photo";
  footerNote?: string;
  footerLink?: { label: string; href: string };
  checklist?: string[];
}

type HobbyCardProps = Omit<HobbyCardData, "key">;

export function HobbyCard({
  title,
  description,
  rotate,
  bg = "#E1D0B3",
  image,
  variant = "standard",
  footerNote,
  footerLink,
  checklist,
}: HobbyCardProps) {
  const [active, setActive] = useState(false);

  const sharedStyle = {
    background: bg,
    transform: `rotate(${active ? 0 : rotate}deg) scale(${active ? 1.04 : 1})`,
    boxShadow: active
      ? "0 16px 30px rgba(40,30,25,0.26)"
      : "0 10px 22px rgba(40,30,25,0.18)",
    transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)",
  };

  const handlers = {
    tabIndex: 0,
    onMouseEnter: () => setActive(true),
    onMouseLeave: () => setActive(false),
    onFocus: () => setActive(true),
    onBlur: () => setActive(false),
  };

  if (variant === "photo") {
    return (
      <div
        className="flex flex-col rounded-[3px] px-2.75 pb-0 pt-2.75 transition-[transform,box-shadow] duration-350"
        style={sharedStyle}
        {...handlers}
      >
        {image && (
          <div className="aspect-4/5 w-full overflow-hidden bg-[#e8e2d6]">
            <img
              src={image.src}
              alt={image.alt}
              className="block h-full w-full object-cover"
            />
          </div>
        )}
        <div className="flex flex-col gap-2 px-1 pb-4 pt-3">
          <span className="font-homemade-apple text-[clamp(15px,1.3vw,20px)] leading-[1.35] text-pastel-brick">
            {title}
          </span>
          <p className="m-0 font-source-code-pro text-[clamp(12px,0.95vw,13px)] leading-[1.8] text-pastel-brown">
            {description}
          </p>
          {footerLink && (
            <Link
              href={footerLink.href}
              className="inline-block self-start font-source-code-pro text-[11px] tracking-[0.12em] text-pastel-brick no-underline transition-transform duration-250 hover:scale-[1.08]"
              style={{ transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)" }}
            >
              {footerLink.label}
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col rounded-[3px] px-2.75 pb-0 pt-2.75 transition-[transform,box-shadow] duration-350 ${
        checklist ? "gap-3.5" : "gap-3"
      }`}
      style={sharedStyle}
      {...handlers}
    >
      {image && (
        <div className="aspect-square w-full overflow-hidden rounded-xs bg-[#e8e2d6]">
          <img
            src={image.src}
            alt={image.alt}
            className="block h-full w-full object-cover"
          />
        </div>
      )}
      <div className="flex flex-col gap-2 px-1.5 pb-4 pt-3">
        <span className="font-homemade-apple text-[clamp(15px,1.3vw,20px)] leading-[1.35] text-pastel-brick">
          {title}
        </span>
        <p
          className="m-0 font-source-code-pro text-[clamp(12px,0.95vw,13px)] leading-[1.85] text-pastel-brown"
          style={{ textWrap: "pretty" }}
        >
          {description}
        </p>
        {footerNote && (
          <span className="font-source-code-pro text-[11px] tracking-[0.12em] text-pastel-brown">
            {footerNote}
          </span>
        )}
        {footerLink && (
          <Link
            href={footerLink.href}
            className="inline-block self-start font-source-code-pro text-[11px] tracking-[0.12em] text-pastel-brown no-underline transition-transform duration-250 hover:scale-[1.08]"
            style={{ transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)" }}
          >
            {footerLink.label}
          </Link>
        )}
        {checklist && (
          <div className="flex flex-col gap-1.75 font-source-code-pro text-xs tracking-[0.02em] text-pastel-brown">
            {checklist.map((item) => (
              <span key={item}>✓ {item}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
