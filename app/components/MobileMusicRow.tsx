"use client";

import { useMusicPlayer } from "@/lib/useMusicPlayer";

interface MobileMusicRowProps {
  icon: string;
  alt: string;
  label: string;
  trackSrc: string;
  trackLabel: string;
}

export function MobileMusicRow({
  icon,
  alt,
  label,
  trackSrc,
  trackLabel,
}: MobileMusicRowProps) {
  const { playing, failed, toggle } = useMusicPlayer(trackSrc);

  const nowPlaying = failed
    ? `add your mp3 at ${trackSrc.replace(/^\//, "")}`
    : trackLabel;
  const showCaption = playing || failed;
  const showHint = !playing && !failed;

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
      className="grid w-full max-w-81.25 min-h-11 cursor-pointer grid-cols-2 items-center gap-4 transition-transform duration-200 active:scale-[0.97]"
      style={{ transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)" }}
    >
      <div className="relative mx-auto w-[88%]">
        <img
          src={icon}
          alt={alt}
          className="block h-auto w-full"
          style={{
            transform: "rotate(-4deg)",
            filter: "drop-shadow(0 8px 14px rgba(40,30,25,0.18))",
          }}
        />
        {showHint && (
          <span
            className="pointer-events-none absolute -right-16 -top-3 whitespace-nowrap font-source-code-pro text-[11px] text-clay"
            style={{ transform: "rotate(-20deg)" }}
          >
            ~click me!
          </span>
        )}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 flex h-11.5 w-11.5 items-center justify-center rounded-full font-mono text-[15px] tracking-[0.04em] text-cream shadow-[0_4px_10px_rgba(40,30,25,0.28)]"
          style={{
            transform: "translate(-50%,-50%)",
            background: "rgba(112,59,59,0.88)",
          }}
        >
          {failed ? "!" : playing ? "❚❚" : "▶"}
        </div>
      </div>
      <div className="flex flex-col gap-1.25">
        <div className="font-mono text-[17px] font-medium tracking-[0.14em] text-ink">
          {label}
        </div>
        <div
          className="font-mono text-[11px] text-mocha transition-opacity duration-200"
          style={{ opacity: showCaption ? 1 : 0 }}
        >
          {nowPlaying}
        </div>
      </div>
    </div>
  );
}
