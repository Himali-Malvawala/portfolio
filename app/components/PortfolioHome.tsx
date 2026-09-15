import Link from "next/link";
import { DesktopIcon } from "./DesktopIcon";
import { DesktopMusicIcon } from "./DesktopMusicIcon";
import { MobileNavLink } from "./MobileNavLink";
import { MobileMusicRow } from "./MobileMusicRow";
import { Typewriter } from "./Typewriter";
import {
  mobileOrder,
  musicItem,
  navItems,
  siteConfig,
} from "../../data/NavItems";

export function PortfolioHome() {
  return (
    <>
      {/* ---------- Desktop: icons scattered across a responsive card ---------- */}
      <div
        className="hidden min-h-screen items-center justify-center px-0 py-6 md:flex"
        style={{ background: siteConfig.bgColor }}
      >
        <div
          className="cq relative aspect-2/1"
          style={{ width: "min(1500px, 96vw)" }}
        >
          {navItems.map((item) => (
            <DesktopIcon
              key={item.key}
              href={item.href}
              label={item.label}
              icon={item.icon}
              alt={item.alt}
              left={item.desktop.left}
              top={item.desktop.top}
              width={item.desktop.width}
              rotate={item.desktop.rotate}
              hoverRotate={item.desktop.hoverRotate}
            />
          ))}

          <DesktopMusicIcon
            left={musicItem.desktop.left}
            top={musicItem.desktop.top}
            width={musicItem.desktop.width}
            rotate={musicItem.desktop.rotate}
            hoverRotate={musicItem.desktop.hoverRotate}
            icon={musicItem.icon}
            alt={musicItem.alt}
            label={musicItem.label}
            trackSrc={siteConfig.trackSrc}
            trackLabel={siteConfig.trackLabel}
          />

          <div className="pointer-events-none absolute left-1/2 top-[41%] w-[40%] -translate-x-1/2 text-center">
            <Link
              href="/about"
              className="font-homemade-apple pointer-events-auto inline-block whitespace-nowrap font-handwritten leading-tight text-clay transition-transform duration-300 hover:scale-[1.04] hover:text-pastel-brick"
              style={{
                fontSize: "4.4cqw",
                letterSpacing: "0.01em",
                transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)",
              }}
            >
              hi! i&apos;m {siteConfig.name} !
            </Link>
            <div
              className="pointer-events-none mt-[0.5cqw] min-h-[1.6em] font-mono text-ink"
              style={{
                fontSize: "clamp(13px,1cqw,20px)",
                letterSpacing: "0.02em",
              }}
            >
              <Typewriter
                text={siteConfig.subtitle}
                speedMs={siteConfig.typeSpeed}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Mobile: stacked list ---------- */}
      <div
        className="flex min-h-screen flex-col items-center gap-10 px-5.5 pb-18 pt-18 md:hidden"
        style={{ background: siteConfig.bgColor }}
      >
        <div className="flex w-full max-w-105 flex-col items-center gap-3.5 text-center">
          <Link
            href="/about"
            className="font-homemade-apple text-pastel-brick relative inline-block font-handwritten leading-[1.3] text-clay transition-transform duration-300 active:scale-[1.05]"
            style={{
              fontSize: "clamp(30px,8.8vw,44px)",
              letterSpacing: "0.01em",
            }}
          >
            hi! i&apos;m {siteConfig.name} !
            <span
              className="font-source-code-pro absolute -bottom-3.5 -right-1.5 whitespace-nowrap font-handwritten text-[11px] text-clay"
              style={{ transform: "rotate(-6deg)" }}
            >
              ~click me!
            </span>
          </Link>
          <div className="min-h-[3em] font-mono text-[12px] sm:text-[13px] leading-relaxed tracking-[0.02em] text-ink mt-4">
            <Typewriter
              text={siteConfig.subtitle}
              speedMs={siteConfig.typeSpeed}
            />
          </div>
          <div
            className="rounded-full px-4 py-1.75 font-mono text-[11px] tracking-[0.01em] text-mocha text-pastel-brown border-2 border-pastel-brown"
            style={{ background: "rgba(252,250,246,0.42)" }}
          >
            p.s. this looks way cooler on desktop
          </div>
        </div>

        {mobileOrder.map((key) => {
          if (key === "music") {
            return (
              <MobileMusicRow
                key="music"
                icon={musicItem.icon}
                alt={musicItem.alt}
                label={musicItem.label}
                trackSrc={siteConfig.trackSrc}
                trackLabel={siteConfig.trackLabel}
              />
            );
          }
          const item = navItems.find((n) => n.key === key)!;
          return (
            <MobileNavLink
              key={key}
              href={item.href}
              label={item.label}
              icon={item.icon}
              alt={item.alt}
              widthPct={item.mobile.widthPct}
              rotate={item.mobile.rotate}
            />
          );
        })}
      </div>
    </>
  );
}
