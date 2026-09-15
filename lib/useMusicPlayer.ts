"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Lazily creates a looping <audio> element on first toggle and exposes
 * play/pause state, matching the original design's toggle-on-click music
 * button (including a "failed" state if the track file is missing).
 */
export function useMusicPlayer(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  const toggle = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio(src);
      audio.loop = true;
      audio.addEventListener("play", () => setPlaying(true));
      audio.addEventListener("pause", () => setPlaying(false));
      audio.addEventListener("error", () => {
        setPlaying(false);
        setFailed(true);
      });
      audioRef.current = audio;
    }

    const audio = audioRef.current;
    if (audio.paused) {
      const p = audio.play();
      if (p && p.catch) {
        p.catch(() => {
          setPlaying(false);
          setFailed(true);
        });
      }
    } else {
      audio.pause();
    }
  }, [src]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  return { playing, failed, toggle };
}
