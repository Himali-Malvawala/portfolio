"use client";

import Link from "next/link";

const FOOTER_LINKS = [
  {
    label: "email ↗",
    href: "mailto:himalimalvawala@gmail.com",
    external: false,
  },
  //   {
  //     label: "linkedin ↗",
  //     href: "https://linkedin.com/in/",
  //     external: true,
  //   },
  { label: "socials ↗", href: "/socials", external: false },
] as const;

export function SiteFooter() {
  return (
    <footer
      className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3.5 border-t font-mono text-body-text"
      style={{
        paddingTop: "clamp(22px,3vw,34px)",
        borderColor: "rgba(59,48,41,0.22)",
        fontSize: "clamp(11px,0.9vw,13px)",
        letterSpacing: "0.1em",
      }}
    >
      <span>with love, himali © {new Date().getFullYear()}</span>

      <div className="flex flex-wrap gap-[clamp(14px,2vw,28px)]">
        {FOOTER_LINKS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noreferrer" : undefined}
            className="inline-block no-underline transition-transform duration-250 hover:scale-[1.1]"
            style={{ transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)" }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
