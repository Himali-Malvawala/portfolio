import { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "../components/PageLayout";

export const metadata: Metadata = {
  title: "socials",
  description: "projects himali has worked on.",
};

export default function Experience() {
  return (
    <PageLayout pageTitle="Experience" active="experience">
      {/* LIVE CHURCH SOLUTIONS */}
      <div className="font-source-code-pro leading-loose tracking-[0.01em] pt-10">
        <p>
          <Link
            href="https://livecs.org/"
            className="text-[18px] sm:text-xl md:text-xl text-pastel-brick"
            target="_blank"
          >
            church-apps (live church solutions)
          </Link>
        </p>
        <p className="italic mt-3 md:mt-1.5 mb-7 text-sm text-pastel-brick">
          freelance full stack developer — 3+ years
        </p>
        <div className="flex flex-col gap-[clamp(18px,2vw,26px)] font-source-code-pro text-[clamp(13px,1.05vw,16px)] leading-loose tracking-[0.01em] text-white">
          <p className="m-0" style={{ textWrap: "pretty" }}>
            <span className="font-semibold">website builder (page admin):</span>{" "}
            built out the drag-and-drop page builder for b1's church website
            builder — adding elements like form, event calendars, sliders, image
            blocks, google maps, calendars, and a donate link block — along with
            builder infrastructure like page templates and in-place text editing
            — used by churches to build and manage their public websites.
          </p>
          <p className="m-0" style={{ textWrap: "pretty" }}>
            <span className="font-semibold">online giving & payments:</span>{" "}
            maintained stripe-based giving system — including adding foreign
            currency support, giving links, recurring donations receipts and
            fixes for updated fee calculations.
          </p>
          <p className="m-0" style={{ textWrap: "pretty" }}>
            <span className="font-semibold">live streaming & sermons:</span>{" "}
            shipped features for sermon and livestream management — bulk vimeo
            import, permanent YouTube live url's, auto-captioning and
            auto-fetching channel/video data through AI, generating social media
            posts through AI, and resolved streaming bugs.
          </p>
          <p className="m-0" style={{ textWrap: "pretty" }}>
            Implemented group/live chat moderation (blocking/permissions)
            through ips.
          </p>
        </div>
      </div>

      {/* OCCSAVIORS */}
      <div className="font-source-code-pro leading-loose tracking-[0.01em] pt-10">
        <p className="text-[18px] sm:text-xl md:text-xl text-pastel-brick">
          occsaviors
        </p>
        <p className="italic mt-3 md:mt-1.5 mb-7 text-sm text-pastel-brick">
          freelance full stack developer — 6 months
        </p>
        <div className="flex flex-col gap-[clamp(18px,2vw,26px)] font-source-code-pro text-[clamp(13px,1.05vw,16px)] leading-loose tracking-[0.01em] text-white">
          <p className="m-0" style={{ textWrap: "pretty" }}>
            built and maintained the website from scratch, updated the UI to
            display the full NFT collections.
          </p>
          <p className="m-0" style={{ textWrap: "pretty" }}>
            successfully connected and integrated the hashpack wallet for easy
            puchase of the NFTs.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
