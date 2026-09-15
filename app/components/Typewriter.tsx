"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  speedMs: number;
  className?: string;
}

export function Typewriter({ text, speedMs, className }: TypewriterProps) {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    setTyped("");
    const id = setInterval(() => {
      i += 1;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speedMs);
    return () => clearInterval(id);
  }, [text, speedMs]);

  return (
    <span className={className}>
      {typed}
      <span
        aria-hidden="true"
        className="ml-[0.06em] inline-block w-[0.55em] animate-blink border-b-[0.12em] border-ink align-baseline"
      />
    </span>
  );
}
