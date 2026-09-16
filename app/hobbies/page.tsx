import Link from "next/link";
import { PageLayout } from "../components/PageLayout";
import { HobbyCard, type HobbyCardData } from "../components/HobbyCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "hobbies",
  description: "list of things himali's always upto.",
};

const HOBBY_CARDS: HobbyCardData[] = [
  {
    key: "music",
    title: "music, always",
    description: `oddly specific playlists for oddly specific moods. there's one for "getting cozy with jazz" and yes, it gets used.`,
    rotate: -1.2,
    image: {
      src: "/images/hobbies/music-always.png",
      alt: "a playlist / your speaker",
    },
    footerNote: "on repeat → sade",
  },
  {
    key: "photos",
    title: "clicking photos",
    description:
      "13k+ in the camera roll. friends trust me for their instagram stories.",
    rotate: 2,
    image: {
      src: "/images/hobbies/click-photos.png",
      alt: "one of your 13k photos",
    },
    // variant: "photo",
    footerLink: { label: "the list ↗", href: "/photos" },
  },
  {
    key: "games",
    title: "game nights",
    description:
      "competitive in the loving way. snacks laid out, teams fairly drafted, scores written down — somebody has to keep them.",
    rotate: -2,
    image: { src: "/images/hobbies/game-night.png", alt: "a game night" },
  },
  {
    key: "food",
    title: "eating my way around",
    description:
      "love tryring new things, though love me a good home-cooked meal too!",
    rotate: 1.4,
    image: {
      src: "/images/hobbies/eating-around.png",
      alt: "a favourite meal",
    },
    // variant: "photo",
    // footerLink: { label: "the list ↗", href: "/eats" },
  },
  {
    key: "sunsets",
    title: "sunsets & the moon",
    description:
      "it's too bad that i don't live by the beach other wise i'd be at one everyday. i'll stop mid-sentence to point at the moon and i'm not sorry about it.",
    rotate: 1,
    image: { src: "/images/hobbies/moon.png", alt: "the moon" },
  },
  {
    key: "crochet",
    title: "crocheting (new!)",
    description:
      "recently picked it up. currently at the stage where i've promised everyone a bag.",
    rotate: -1.6,
  },
  {
    key: "baking",
    title: "baking, sometimes",
    description:
      "strictly a mood thing. measured to the gram, because of course it is.",
    rotate: 2.2,
    image: { src: "/images/hobbies/baking.png", alt: "homemade brookies" },
  },
  {
    key: "painting",
    title: "painting",
    description:
      "not great at it, still do it. the only thing i let myself be messy about.",
    rotate: 1.8,
  },
  {
    key: "fashion",
    title: "styling outfits",
    description:
      "getting dressed is the first creative decision of the day. i take it seriously.",
    rotate: -1,
    image: { src: "/images/hobbies/fashion.png", alt: "a favourite outfit" },
    // variant: "photo",
  },
  {
    key: "type-a",
    title: "being a type A",
    description:
      "i'd argue organising counts as a hobby. occasionally i go full monica from friends and nobody can stop me.",
    rotate: -2.4,
    bg: "#E1D0B3",
    // checklist: [
    //   "notion, suspiciously up to date",
    //   "productivity tracker, filled in daily",
    //   "labels. on things. that need them.",
    // ],
  },
];

export default function Page() {
  return (
    <PageLayout pageTitle="Hobbies" active="hobbies">
      <div className="flex flex-col gap-[clamp(28px,3.5vw,48px)]">
        <p
          className="m-0 font-source-code-pro text-[clamp(13px,1.05vw,16px)] leading-[1.9] tracking-[0.01em] text-white"
          style={{ maxWidth: "60ch", textWrap: "pretty" }}
        >
          the running list of things i do when nobody&apos;s assigning me
          anything — all of them keep me sane.
        </p>

        <div
          className="grid items-start gap-[clamp(20px,2.4vw,34px)]"
          style={{
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 270px), 1fr))",
          }}
        >
          {HOBBY_CARDS.map(({ key, ...card }) => (
            <HobbyCard key={key} {...card} />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-[clamp(12px,1vw,14px)] tracking-[0.04em] text-white">
          <span>got something i should try next?</span>
          <Link
            href="mailto:himalimalvawala.com"
            className="inline-block font-mono tracking-[0.12em] text-clay no-underline transition-transform duration-250 hover:scale-[1.08]"
            style={{ transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)" }}
          >
            tell me ↗
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
