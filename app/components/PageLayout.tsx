"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteFooter } from "./SiteFooter";

const NAV_ITEMS = [
  { label: "about", href: "/about" },
  { label: "projects", href: "/projects" },
  { label: "experience", href: "/experience" },
  { label: "socials", href: "/socials" },
  { label: "hobbies", href: "/hobbies" },
  { label: "stills", href: "/photos" },
  { label: "resume", href: "/resume" },
  //   { label: "music", href: "/music" },
] as const;

export type PageBgColor = "#9BB4C0" | "#E1D0B3" | "#A18D6D" | "#FCFAF6";

interface PageLayoutProps {
  pageTitle: string;
  children: React.ReactNode;
  active: string;
  bgColor?: PageBgColor;
  hideFooter?: boolean;
}

export function PageLayout({
  pageTitle,
  active,
  bgColor = "#9BB4C0",
  children,
  hideFooter = false,
}: PageLayoutProps) {
  const [open, setOpen] = useState(false);
  const activeKey = active.toLowerCase();

  // Matches the original design's trick of also painting <body> so
  // mobile Safari's overscroll/rubber-band area shows the right color.
  useEffect(() => {
    document.body.style.background = bgColor;
    return () => {
      document.body.style.background = "";
    };
  }, [bgColor]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: bgColor,
        boxSizing: "border-box",
        padding:
          "clamp(26px,4vw,56px) clamp(22px,7vw,120px) clamp(44px,6vw,84px)",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(26px,3.5vw,48px)",
      }}
    >
      {/* NAVIGATION */}
      <header className="flex items-start justify-between gap-5">
        <Link
          href="/"
          className="flex min-h-11 items-center font-mono font-medium tracking-[0.12em] text-body-text no-underline transition-transform duration-250 hover:scale-[1.08]"
          style={{
            fontSize: "clamp(12px,1.05vw,15px)",
            transformOrigin: "left center",
            transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)",
          }}
        >
          ← back home
        </Link>

        <div className="relative flex flex-col items-end gap-3">
          <button
            type="button"
            aria-label="menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center border-0 bg-transparent p-0 font-mono text-[26px] leading-none text-body-text transition-transform duration-300 hover:scale-[1.12]"
            style={{ transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)" }}
          >
            {open ? "×" : "+"}
          </button>

          <nav
            aria-hidden={!open}
            className="absolute right-0 top-full z-5 flex flex-col items-end overflow-hidden transition-[max-height,opacity] duration-380"
            style={{
              gap: "clamp(10px,1.1vw,15px)",
              maxHeight: open ? "420px" : "0px",
              opacity: open ? 1 : 0,
              pointerEvents: open ? "auto" : "none",
              transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)",
            }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = item.label === activeKey;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-block whitespace-nowrap font-mono font-medium tracking-[0.12em] no-underline transition-transform duration-250 hover:scale-[1.12]"
                  style={{
                    fontSize: "clamp(13px,1.1vw,16px)",
                    color: isActive ? "#703B3B" : "#3b3029",
                    transformOrigin: "right center",
                    transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)",
                  }}
                >
                  {isActive ? `[${item.label}]` : item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* CONTENT */}
      {/* w-[95%] m-auto */}
      <div className="md:w-9/12 md:m-auto">
        <h1
          className="m-0 font-normal leading-tight text-pastel-brick font-homemade-apple"
          style={{ fontSize: "clamp(30px,4vw,52px)", letterSpacing: "0.01em" }}
        >
          {pageTitle}
        </h1>

        <main className="min-w-0 flex-1 pt-8">{children}</main>
      </div>
      {/* FOOTER */}
      {!hideFooter && <SiteFooter />}
    </div>
  );
}
