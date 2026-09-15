"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface PolaroidItem {
  id: string;
  caption: string;
  alt: string;
  src: string;
  /** Fraction of stage width used for sizing. Defaults to 0.16. */
  w?: number;
  /** Fraction of stage width — desktop starting x position. Omit to auto-place. */
  x?: number;
  /** Fraction of stage height — desktop starting y position. Omit to auto-place. */
  y?: number;
  /** Rotation in degrees. Omit for a small deterministic default. */
  rot?: number;
}

interface PolaroidBoardProps {
  items: PolaroidItem[];
  /** Unique per board — keeps saved drag positions from colliding across pages. */
  storageKey: string;
  /** Uniformly scales every card, like the original design's photoScale prop. */
  scale?: number;
  /** Small caption shown top-right, e.g. "move pictures to read ✦". Omit to hide. */
  hint?: string;
  /** The page's own content (text, etc.) that the cards float over. */
  children: React.ReactNode;
  className?: string;
}

const NARROW_BREAKPOINT = 620;
const CELL_MARGIN = 20;
const DEFAULT_WIDTH_FRACTION = 0.16;

type Pos = { x: number; y: number };
type PosMap = Record<string, Pos>;
type ZMap = Record<string, number>;

function hashId(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function widthFraction(item: PolaroidItem) {
  return item.w ?? DEFAULT_WIDTH_FRACTION;
}

function rotationFor(item: PolaroidItem) {
  if (typeof item.rot === "number") return item.rot;
  return (hashId(item.id) % 9) - 4; // deterministic -4..4deg so it doesn't look grid-perfect
}

function cardWidth(item: PolaroidItem, stageWidth: number, scale: number) {
  return Math.min(240, Math.max(120, widthFraction(item) * scale * stageWidth));
}

/**
 * Fallback position for any item without an explicit x/y (or on narrow
 * viewports, which always use this for safety). Divides the stage into a
 * grid sized to its own aspect ratio — so a handful of items spread across
 * the full height instead of packing into row 0 — then drops each item at
 * a genuinely random spot inside its cell. `cache` persists the random
 * offset per item id so it stays put across resizes within the session,
 * but a fresh page load (no saved drag position yet) gets a new scatter.
 */
function randomPositionInCell(
  cache: Record<string, { rx: number; ry: number }>,
  id: string,
  index: number,
  cols: number,
  cellW: number,
  cellH: number,
  cardW: number,
  cardH: number,
) {
  if (!cache[id]) {
    cache[id] = { rx: Math.random(), ry: Math.random() };
  }
  const { rx, ry } = cache[id];
  const col = index % cols;
  const row = Math.floor(index / cols);
  const usableW = Math.max(0, cellW - cardW - CELL_MARGIN);
  const usableH = Math.max(0, cellH - cardH - CELL_MARGIN);
  return {
    x: col * cellW + CELL_MARGIN / 2 + rx * usableW,
    y: row * cellH + CELL_MARGIN / 2 + ry * usableH,
  };
}

export function PolaroidBoard({
  items,
  storageKey,
  scale = 1,
  hint,
  children,
  className,
}: PolaroidBoardProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const dirtyRef = useRef(false);
  const dragRef = useRef<{ id: string; dx: number; dy: number } | null>(null);
  const topZRef = useRef(10 + items.length - 1);
  const randomCacheRef = useRef<Record<string, { rx: number; ry: number }>>({});

  const [pos, setPos] = useState<PosMap>({});
  const [z, setZ] = useState<ZMap>({});
  const [ready, setReady] = useState(false);

  const layout = useCallback(() => {
    const el = stageRef.current;
    if (!el || !el.clientWidth) return;
    const W = el.clientWidth;
    const H = el.clientHeight;
    const narrow = W < NARROW_BREAKPOINT;

    let saved: Partial<PosMap> = {};
    try {
      saved = JSON.parse(window.localStorage.getItem(storageKey) ?? "{}");
    } catch {
      saved = {};
    }

    // Only items actually falling back to auto-placement get a grid cell —
    // items with a saved drag position, or an explicit desktop x/y, are
    // excluded so they don't eat into the grid math for the rest.
    const autoItems = items.filter((item) => {
      const s = saved[item.id];
      if (s && typeof s.x === "number") return false;
      if (!narrow && typeof item.x === "number" && typeof item.y === "number")
        return false;
      return true;
    });

    // Size the grid to the stage's own aspect ratio (not just how many
    // card-widths fit across it) so a handful of items spread across the
    // full height instead of all landing in row 0.
    const aspect = H > 0 ? W / H : 1;
    const cols = Math.max(
      1,
      Math.min(
        autoItems.length,
        Math.round(Math.sqrt(autoItems.length * aspect)),
      ) || 1,
    );
    const rows = Math.max(1, Math.ceil(autoItems.length / cols));
    const cellW = W / cols;
    const cellH = H / rows;

    const next: PosMap = {};
    let autoIndex = 0;
    items.forEach((item) => {
      const cw = cardWidth(item, W, scale);
      const ch = cw * 1.28;
      const s = saved[item.id];

      let raw: Pos;
      if (s && typeof s.x === "number") {
        raw = s;
      } else if (
        !narrow &&
        typeof item.x === "number" &&
        typeof item.y === "number"
      ) {
        raw = { x: item.x * W, y: item.y * H };
      } else {
        raw = randomPositionInCell(
          randomCacheRef.current,
          item.id,
          autoIndex,
          cols,
          cellW,
          cellH,
          cw,
          ch,
        );
        autoIndex += 1;
      }

      next[item.id] = {
        x: Math.max(0, Math.min(Math.max(0, W - cw), raw.x)),
        y: Math.max(0, Math.min(Math.max(0, H - ch), raw.y)),
      };
    });

    setPos(next);
    setReady(true);
  }, [items, scale, storageKey]);

  useEffect(() => {
    let raf = 0;
    const tryLayout = () => {
      if (stageRef.current?.clientWidth) {
        layout();
        return;
      }
      raf = requestAnimationFrame(tryLayout);
    };
    tryLayout();

    const el = stageRef.current;
    const ro = new ResizeObserver(() => {
      if (!dirtyRef.current) layout();
    });
    if (el) ro.observe(el);

    const onResize = () => {
      if (!dirtyRef.current) layout();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [layout]);

  const savePos = useCallback(
    (next: PosMap) => {
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // localStorage unavailable (private mode, etc.) — fine to skip persisting.
      }
    },
    [storageKey],
  );

  const handlePointerDown = useCallback(
    (item: PolaroidItem) => (e: React.PointerEvent<HTMLDivElement>) => {
      const current = pos[item.id];
      if (!current) return;

      dirtyRef.current = true;
      dragRef.current = {
        id: item.id,
        dx: e.clientX - current.x,
        dy: e.clientY - current.y,
      };

      const nextZ = topZRef.current + 1;
      topZRef.current = nextZ;
      setZ((prevZ) => ({ ...prevZ, [item.id]: nextZ }));

      const onMove = (ev: PointerEvent) => {
        const drag = dragRef.current;
        const el = stageRef.current;
        if (!drag || !el) return;
        const cw = cardWidth(item, el.clientWidth, scale);
        const ch = cw * 1.28;
        const maxX = Math.max(0, el.clientWidth - cw);
        const maxY = Math.max(0, el.clientHeight - ch);
        const x = Math.max(0, Math.min(maxX, ev.clientX - drag.dx));
        const y = Math.max(0, Math.min(maxY, ev.clientY - drag.dy));
        setPos((prevPos) => ({ ...prevPos, [item.id]: { x, y } }));
      };

      const onUp = () => {
        dragRef.current = null;
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        setPos((prevPos) => {
          savePos(prevPos);
          return prevPos;
        });
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      e.preventDefault();
    },
    [pos, savePos, scale],
  );

  return (
    <div
      ref={stageRef}
      className={`relative flex flex-col gap-[clamp(26px,3vw,40px)]${className ? ` ${className}` : ""}`}
      style={{ touchAction: "pan-y" }}
    >
      {hint && (
        <div className="flex justify-end">
          <span
            className="font-source-code-pro text-[clamp(11px,0.9vw,13px)] tracking-widest] text-body-text"
            style={{ opacity: 0.72 }}
          >
            {hint}
          </span>
        </div>
      )}

      {children}

      {items.map((item, i) => {
        const p = pos[item.id] ?? { x: 0, y: 0 };
        const cardZ = z[item.id] ?? 10 + i;
        return (
          <div
            key={item.id}
            onPointerDown={handlePointerDown(item)}
            className="absolute left-0 top-0 cursor-grab touch-none select-none rounded-[3px] bg-pastel-beige px-2.75 pt-2.75 shadow-[0_12px_26px_rgba(40,30,25,0.22)] transition-shadow duration-200 active:cursor-grabbing active:shadow-[0_18px_34px_rgba(40,30,25,0.3)]"
            style={{
              width: `clamp(120px, ${(widthFraction(item) * 100 * scale).toFixed(1)}%, 200px)`,
              transform: `translate3d(${Math.round(p.x)}px, ${Math.round(p.y)}px, 0) rotate(${rotationFor(item)}deg)`,
              zIndex: cardZ,
              opacity: ready ? 1 : 0,
            }}
          >
            <div className="aspect-5/6 w-full overflow-hidden bg-[#e8e2d6] pointer-events-none">
              <img
                src={item.src}
                alt={item.alt}
                className="block h-full w-full object-fill"
              />
            </div>
            <div className="px-0.5 pb-6 pt-2.25 font-homemade-apple text-[12px] md:text-[15px] leading-[1.4] text-pastel-brick pointer-events-none">
              {item.caption}
            </div>
          </div>
        );
      })}
    </div>
  );
}
