import { Metadata } from "next";
import { PageLayout } from "../components/PageLayout";
import { SocialLink } from "../components/SocialLink";

const socialItems = [
  {
    key: "mail",
    href: "mailto:himalimalvawala@gmail.com",
    icon: "/images/socials/mail.png",
    alt: "candybar phone showing e-mail",
    imgWidthPct: 62,
    imgMaxWidth: 120,
    rotate: -2,
    label: "mail",
    detail: "",
    // detail: "himalimalvawala@gmail.com",
  },
  {
    key: "instagram",
    href: "https://www.instagram.com/himali.malvawala",
    external: true,
    icon: "/images/socials/instagram.png",
    alt: "phone showing instgram icon",
    imgWidthPct: 100,
    imgMaxWidth: 170,
    rotate: 1.5,
    label: "instagram",
    detail: "",
    // detail: "in/himali",
  },
  {
    key: "github",
    href: "https://github.com/Himali-Malvawala",
    external: true,
    icon: "/images/socials/github.png",
    alt: "beige computer showing a pixel cat",
    imgWidthPct: 100,
    imgMaxWidth: 190,
    rotate: 2,
    label: "github",
    detail: "",
    // detail: "/Himali-Malvawala",
  },
  {
    key: "twitter",
    href: "https://x.com/HimaliMalvawala",
    external: true,
    icon: "/images/socials/twitter.png",
    alt: "flip phone showing twitter bird",
    imgWidthPct: 60,
    imgMaxWidth: 120,
    rotate: -1,
    label: "twitter",
    detail: "",
    // detail: "@HimaliMalvawala",
  },
  {
    key: "linkedin",
    href: "https://www.linkedin.com/in/himalimalvawala/",
    external: true,
    icon: "/images/socials/linkedin.png",
    alt: "sidekick showing linkedin badges",
    imgWidthPct: 100,
    imgMaxWidth: 190,
    rotate: 1.5,
    label: "linkedin",
    detail: "",
    // detail: "in/himali",
  },
] as const;

export const metadata: Metadata = {
  title: "socials",
  description: "ways to reach himali — email, linkedin, twitter, and github.",
};

export default function Page() {
  return (
    <PageLayout pageTitle="Socials" active="socials" hideFooter>
      <div className="flex flex-col gap-[clamp(30px,4vw,54px)]">
        <p
          className="m-0 font-mono text-[clamp(13px,1.1vw,16px)] leading-[1.75] tracking-[0.02em] text-white"
          style={{ maxWidth: "46ch", textWrap: "pretty" }}
        >
          find me here — email is fastest.
        </p>

        <div
          className="grid items-end gap-[clamp(26px,3vw,44px)]"
          style={{
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 190px), 1fr))",
          }}
        >
          {socialItems.map(({ key, ...item }) => (
            <SocialLink key={key} {...item} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
