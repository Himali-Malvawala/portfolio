import { PageLayout } from "../components/PageLayout";
import { PolaroidBoard } from "../components/PolaroidBoard";

export default function About() {
  const ABOUT_PHOTOS: any[] = [
    {
      id: "me",
      caption: "me :)",
      alt: "me at a cafe",
      src: "/images/about/me.png",
    },
    {
      id: "work",
      caption: "my work",
      alt: "laptop",
      src: "/images/about/my-work.png",
    },
    {
      id: "songs",
      caption: "current fav artist",
      alt: "my current fav artis",
      src: "/images/about/fav-artist.png",
    },
    {
      id: "fav-moment",
      caption: "a fav moment",
      alt: "fav moment",
      src: "/images/about/fav-moment.png",
    },
    // {
    //   id: "game-night",
    //   caption: "game nights",
    //   alt: "game nights",
    //   src: "/images/about/game-night.png",
    // },
    // {
    //   id: "baking",
    //   caption: "sourdough era",
    //   alt: "a loaf of homemade bread",
    //   src: "/images/hobby-baking.jpg",
    // },
    // {
    //   id: "film",
    //   caption: "shot on film",
    //   alt: "a film photo I took",
    //   src: "/images/hobby-film.jpg",
    // },
  ];

  return (
    <PageLayout pageTitle="about" active="about">
      <PolaroidBoard
        items={ABOUT_PHOTOS}
        storageKey="about-polaroids-v1"
        // hint="drag these around ✦"
      >
        <div
          data-about-stage
          className="relative flex flex-col gap-[clamp(26px,3vw,40px)]"
          style={{ touchAction: "pan-y" }}
        >
          <div className="flex justify-end">
            <span
              className="font-source-code-pro text-[clamp(11px,0.9vw,13px)] tracking-widest text-body-text"
              style={{ opacity: 0.72 }}
            >
              move pictures to read ✦
            </span>
          </div>

          <div className="flex flex-col gap-[clamp(18px,2vw,26px)] font-source-code-pro text-[clamp(13px,1.05vw,16px)] leading-loose tracking-[0.01em] text-body-text">
            <p className="m-0" style={{ textWrap: "pretty" }}>
              hi, i&apos;m himali!
            </p>
            <p className="m-0" style={{ textWrap: "pretty" }}>
              i made this website as a way to re-ignite my creative side, and
              i&apos;m grateful you&apos;re taking the time to get to know me a
              little better too.
            </p>
            <p className="m-0" style={{ textWrap: "pretty" }}>
              in a nutshell, i&apos;m a software developer, a curator of
              oddly-specific Spotify playlists, a sucker for game nights, a
              fitness novice, and someone who loves sunsets.
            </p>
            <p className="m-0" style={{ textWrap: "pretty" }}>
              i have a degree in business administration and while pursuing that
              my brother encouraged me to start learning web development, that's
              how this roller coaster journet started. i wasn't always a fan of
              spending most of my day on the laptop, but now it's my favorite
              part of the day.
            </p>
            <p className="m-0" style={{ textWrap: "pretty" }}>
              i wasn't always a fan of spending most of my day on the laptop,
              but now it's my favorite part of the day.
            </p>
            <p className="m-0" style={{ textWrap: "pretty" }}>
              i like to document things that come my way, so i'm always clicking
              pictures or taking videos of nature, food, fashion, and of course
              mine ;). i'm an aesthete for inspiration.
            </p>
            {/* <p className="m-0" style={{ textWrap: "pretty" }}>
              i love dissecting why businesses succeed and fail (so an MBA felt
              natural), but even more, i love thinking about the next creative
              direction a company can take.
            </p>
            <p className="m-0" style={{ textWrap: "pretty" }}>
              i&apos;m hoping this website or my work sparks something in you to
              try something new. i&apos;m a lifelong learner and always looking
              for ways to grow, so feel free to send me a book recommendation or
              a collaboration idea.
            </p>
            <p className="m-0">with love,</p>
            <p className="m-0">Himali</p> */}
          </div>
        </div>
      </PolaroidBoard>
    </PageLayout>
  );
}
