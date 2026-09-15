import Link from "next/link";

interface MobileNavLinkProps {
  href: string;
  label: string;
  icon: string;
  alt: string;
  widthPct: number;
  rotate: number;
}

export function MobileNavLink({
  href,
  label,
  icon,
  alt,
  widthPct,
  rotate,
}: MobileNavLinkProps) {
  return (
    <Link
      href={href}
      className="grid w-full max-w-100 min-h-11 grid-cols-2 items-center gap-4 no-underline transition-transform duration-200 active:scale-[0.97]"
      style={{ transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)" }}
    >
      <img
        src={icon}
        alt={alt}
        className="block h-auto"
        style={{
          width: `${widthPct}%`,
          margin: widthPct < 100 ? "0 auto" : undefined,
          transform: `rotate(${rotate}deg)`,
          filter: "drop-shadow(0 8px 14px rgba(40,30,25,0.18))",
        }}
      />
      <div className="font-mono text-[17px] font-medium tracking-[0.14em] text-ink">
        {label}
      </div>
    </Link>
  );
}
