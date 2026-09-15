export interface NavItem {
  key: string;
  href: string;
  label: string;
  icon: string;
  alt: string;
  desktop: {
    left: number; // % from left of the hero card
    top: number; // % from top of the hero card
    width: number; // % of hero card width
    rotate: number; // deg at rest
    hoverRotate: number; // deg on hover/focus
  };
  mobile: {
    widthPct: number; // % of the icon's grid cell
    rotate: number; // deg
  };
}

export const navItems: NavItem[] = [
  {
    key: "stills",
    href: "/photos",
    label: "stills",
    icon: "/images/film-strip-icon.png",
    alt: "film strip",
    desktop: { left: 7.5, top: 20, width: 20, rotate: 4, hoverRotate: 0 },
    mobile: { widthPct: 100, rotate: 4 },
  },
  {
    key: "projects",
    href: "/projects",
    label: "projects",
    icon: "/images/projects-icon.png",
    alt: "retro computer",
    desktop: { left: 28, top: 10, width: 11.5, rotate: -3, hoverRotate: 1 },
    mobile: { widthPct: 75, rotate: -3 },
  },
  {
    key: "socials",
    href: "/socials",
    label: "socials",
    icon: "/images/socials-icon.png",
    alt: "rotary telephone",
    desktop: { left: 50.5, top: 7, width: 11, rotate: 2, hoverRotate: -2 },
    mobile: { widthPct: 70, rotate: 2 },
  },
  {
    key: "experience",
    href: "/experience",
    label: "work experience",
    icon: "/images/experience-icon.png",
    alt: "stack of work things",
    desktop: { left: 74, top: 55, width: 10, rotate: 3, hoverRotate: 0 },
    mobile: { widthPct: 65, rotate: 3 },
  },
  {
    key: "resume",
    href: "/resume",
    label: "resumeV2",
    icon: "/images/folder-icon.png",
    alt: "folder",
    desktop: { left: 24, top: 68, width: 10.5, rotate: -2, hoverRotate: 1 },
    mobile: { widthPct: 72, rotate: -2 },
  },
  {
    key: "hobbies",
    href: "/hobbies",
    label: "hobbies",
    icon: "/images/hobbies-icon.png",
    alt: "tray of hobbies",
    desktop: { left: 50, top: 68, width: 13.5, rotate: 2, hoverRotate: -2 },
    mobile: { widthPct: 85, rotate: 2 },
  },
];

export const musicItem = {
  key: "music",
  label: "music",
  icon: "/images/music-icon.png",
  alt: "minidisc",
  desktop: { left: 75.5, top: 20, width: 11, rotate: -4, hoverRotate: 0 },
};

// Order the icons appear in on the stacked mobile layout.
export const mobileOrder = [
  "experience",
  "socials",
  "music",
  "projects",
  "hobbies",
  "stills",
  "resume",
] as const;

export const siteConfig = {
  name: "himali",
  bgColor: "#9BB4C0",
  subtitle: "welcome! click around to learn about me:)",
  typeSpeed: 55, // ms per character
  trackSrc: "/audio/paradise-sade.mp3",
  trackLabel: "paradise — sade",
};
