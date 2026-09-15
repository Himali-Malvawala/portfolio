"use client";

import { Typewriter } from "./Typewriter";

interface WorkInProgressProps {
  message?: string;
}

export function WorkInProgress({
  message = "check back soon — this one's still on my desk :)",
}: WorkInProgressProps) {
  return (
    <div className="flex flex-col items-center gap-[clamp(18px,2.4vw,28px)] pt-16 md:py-[clamp(20px,3.5vw,40px)] text-center">
      <img
        src="/images/wip.png"
        alt="a laptop, open planner, pen, and cup of coffee on a desk, with a work-in-progress caution sign"
        className="block h-auto w-full"
        style={{
          maxWidth: "min(420px, 82%)",
          transform: "rotate(-2deg)",
          filter: "drop-shadow(0 14px 22px rgba(40,30,25,0.22))",
        }}
      />
      <div className="flex flex-col items-center gap-2">
        {/* <p className="m-0 font-handwritten text-[clamp(22px,3.2vw,34px)] leading-[1.2] text-pastel-brick">
          still tidying up in here!
        </p> */}
        <div className="min-h-[1.6em] font-mono text-[clamp(13px,1.1vw,16px)] tracking-[0.02em] text-body-text">
          <Typewriter text={message} speedMs={45} />
        </div>
      </div>
    </div>
  );
}
