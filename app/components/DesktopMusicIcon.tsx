"use client";

import { useState } from "react";
import { useMusicPlayer } from "@/lib/useMusicPlayer";

interface DesktopMusicIconProps {
  left: number;
  top: number;
  width: number;
  rotate: number;
  hoverRotate: number;
  icon: string;
  alt: string;
  label: string;
  trackSrc: string;
  trackLabel: string;
}

export function DesktopMusicIcon({
  left,
  top,
  width,
  rotate,
  hoverRotate,
  icon,
  alt,
  label,
  trackSrc,
  trackLabel,
}: DesktopMusicIconProps) {
  const [active, setActive] = useState(false);
  const { playing, failed, toggle } = useMusicPlayer(trackSrc);

  const nowPlaying = failed
    ? `add your mp3 at ${trackSrc.replace(/^\//, "")}`
    : trackLabel;
  const showCaption = playing || failed;
  const showHint = !active && !playing && !failed;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={playing}
      aria-label={playing ? "Pause music" : "Play music"}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      className="absolute cursor-pointer"
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
      {showHint && (
        <span
          className="pointer-events-none absolute whitespace-nowrap font-source-code-pro text-clay transition-opacity duration-200"
          style={{
            bottom: "-2cqw",
            left: "4cqw",
            transform: "rotate(15deg)",
            fontSize: "clamp(10px, 0.85cqw, 14px)",
          }}
        >
          ~click me!
        </span>
      )}

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 flex items-center justify-center rounded-full font-mono tracking-[0.04em] text-cream shadow-[0_4px_10px_rgba(40,30,25,0.28)] transition-opacity duration-200"
        style={{
          transform: "translate(-50%, -50%)",
          width: "clamp(34px, 3.2cqw, 52px)",
          height: "clamp(34px, 3.2cqw, 52px)",
          background: "rgba(112,59,59,0.88)",
          fontSize: "clamp(12px, 1.1cqw, 17px)",
          opacity: active || showCaption ? 1 : 0.5,
        }}
      >
        {failed ? "!" : playing ? "❚❚" : "▶"}
      </div>

      <div
        className="pointer-events-none absolute left-1/2 top-full text-center font-mono text-ink transition-opacity duration-200"
        style={{
          transform: "translateX(-50%)",
          marginTop: "0.6cqw",
          fontSize: "clamp(10px, 0.8cqw, 13px)",
          width: "22cqw",
          lineHeight: 1.45,
          opacity: showCaption ? 1 : 0,
        }}
      >
        {nowPlaying}
      </div>
    </div>
  );
}
