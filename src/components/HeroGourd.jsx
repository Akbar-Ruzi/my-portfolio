"use client";

// Gourd illustration from design/wolfdev-portfolio.html, converted to JSX.
// The button opens and closes it; once open, each tech chip shows its own code on the screen.
// The animations live in globals.css (.gourd)
import { useEffect, useState } from "react";
import heroData from "@/utils/heroData";
import gourdSnippets, { codeColors } from "@/utils/gourdSnippets";
import { playClose, playOpen, playPick } from "@/utils/gourdSounds";

// Skill pills on the gourd's upper bulb; x/y/width place them inside the 360×520 viewBox.
// dx/dy: where the pill starts (at the neck) relative to its place; d: when it pops out.
// Each label is also the key of its code in utils/gourdSnippets.js
const pills = [
  { label: "Python", x: 117.1, y: 103, width: 56, dx: 34.9, dy: -74, d: 0.85 },
  { label: "FastAPI", x: 180.7, y: 103, width: 62, dx: -31.7, dy: -74, d: 0.97 },
  { label: "React", x: 110.5, y: 137, width: 49, dx: 45, dy: -108, d: 1.09 },
  { label: "TypeScript", x: 167.5, y: 137, width: 82, dx: -28.5, dy: -108, d: 1.21 },
  { label: "PostgreSQL", x: 110.5, y: 171, width: 82, dx: 28.5, dy: -142, d: 1.33 },
  { label: "Redis", x: 200.5, y: 171, width: 49, dx: -45, dy: -142, d: 1.45 },
  { label: "AI", x: 165.4, y: 205, width: 29, dx: 0.1, dy: -176, d: 1.57 },
];
const DEFAULT_TECH = "AI";

// CSS variables for one animated item (pill or code line); bd = delay when going back in
const fly = (dx, dy, d, bd) => ({
  "--dx": `${dx}px`,
  "--dy": `${dy}px`,
  "--d": `${d}s`,
  ...(bd !== undefined && { "--bd": `${bd}s` }),
});

// length of the open / close animation, after which the button works again
const ANIMATION_MS = 3900;

// Four-point sparks around the "Magic Gourd" title: centre x/y, half-size r, twinkle delay
const sparks = [
  { x: 64, y: 306, r: 9, delay: "0s" },
  { x: 300, y: 312, r: 7, delay: "0.7s" },
  { x: 98, y: 402, r: 6, delay: "1.3s" },
  { x: 268, y: 404, r: 8, delay: "0.4s" },
  { x: 180, y: 300, r: 5, delay: "1s" },
];
const sparkPath = ({ x, y, r }) =>
  `M${x} ${y - r} Q${x} ${y} ${x + r} ${y} Q${x} ${y} ${x} ${y + r} Q${x} ${y} ${x - r} ${y} Q${x} ${y} ${x} ${y - r}Z`;

// Code lines of one snippet, 17px apart from y=325. Each line flies in from the neck:
// late while the gourd opens, quickly when a chip is picked (picked lines also get their own way back in)
const CodeLines = ({ tech, picked }) => {
  let n = -1; // index among the non-empty lines
  return gourdSnippets[tech].lines.map((parts, i) => {
    if (!parts.length) return null;
    n += 1;
    const y = 325 + i * 17;
    const text = parts.map(([part]) => part).join("");
    const dx = 180 - (63 + text.length * 3);
    const style = picked
      ? fly(dx, 40 - y, (0.25 + 0.1 * n).toFixed(2), (0.4 + 0.13 * n).toFixed(2))
      : fly(dx, 40 - y, (1.95 + 0.13 * n).toFixed(2));
    return (
      <text key={i} x="63" y={y} xmlSpace="preserve" className="fly" style={style}>
        {parts.map(([part, color], j) => (
          <tspan key={j} fill={codeColors[color]}>
            {part}
          </tspan>
        ))}
      </text>
    );
  });
};

const HeroGourd = () => {
  // closed → opening → open → closing → closed
  const [state, setState] = useState("closed");
  const [tech, setTech] = useState(DEFAULT_TECH);
  const [picks, setPicks] = useState(0); // chip clicks; re-mounts the code so it flies in again
  const [hint, setHint] = useState(null); // chip showing "Click me"
  const busy = state === "opening" || state === "closing";
  const open = state === "open";

  // move on to open / closed once the animation has finished; closing puts the AI code back
  useEffect(() => {
    if (!busy) return;
    const timer = setTimeout(() => {
      if (state === "opening") {
        setState("open");
      } else {
        setState("closed");
        setTech(DEFAULT_TECH);
        setPicks(0);
      }
    }, ANIMATION_MS);
    return () => clearTimeout(timer);
  }, [state, busy]);

  // with reduced motion the gourd is shown open (globals.css), so make the chips clickable too
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => reduce.matches && setState("open");
    sync();
    reduce.addEventListener("change", sync);
    return () => reduce.removeEventListener("change", sync);
  }, []);

  const toggle = () => {
    if (busy) return;
    if (state === "closed") {
      playOpen();
      setState("opening");
    } else {
      playClose();
      setState("closing");
    }
  };

  const pick = (label) => {
    if (!open) return;
    playPick();
    setHint(null);
    setTech(label);
    setPicks((count) => count + 1);
  };

  return (
    <div className="flex w-[min(100%,480px)] max-w-full flex-col self-end justify-self-center max-[860px]:w-[min(100%,380px)]">
      {/* OPEN / CLOSE BUTTON: on its own row above the gourd (right-aligned, centered when stacked), so it
          never covers the lid, which lifts up to ~30 viewBox units above the gourd: the 10% margin (of the
          gourd's width, 36 units) keeps that space free at every size. aria-disabled instead of disabled during
          the animation, so keyboard focus stays on it. Hidden with reduced motion, where the gourd is always open */}
      <button
        type="button"
        onClick={toggle}
        aria-disabled={busy}
        className="mb-[10%] inline-flex cursor-pointer items-center gap-2 self-end rounded-full border border-line bg-panel px-3.5 py-[9px] font-body text-sm leading-none font-semibold text-cta shadow-[0_8px_20px_-12px_rgba(15,26,46,.4)] transition-[transform,background-color] duration-150 hover:bg-[#EEF5F1] focus-visible:outline-cta active:scale-[.96] aria-disabled:cursor-default aria-disabled:opacity-55 aria-disabled:hover:bg-panel aria-disabled:active:scale-100 motion-reduce:hidden max-[860px]:self-center"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 12a8 8 0 1 0 2.4-5.7M4 4v5h5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {state === "open" || state === "closing" ? heroData.gourdButton.close : heroData.gourdButton.open}
      </button>
      <div data-state={state} className="gourd relative aspect-[360/520] w-full">
        <svg
          viewBox="0 0 360 520"
          preserveAspectRatio="xMidYMax meet"
          role="group"
          aria-label="Tech stack and code sample"
          className="absolute inset-0 size-full overflow-visible"
        >
          {/* GOURD: handle, lower bulb, upper bulb, waist, highlight */}
          <g aria-hidden="true">
            <path
              d="M160 58 C 90 50, 40 130, 52 220 C 58 262, 84 270, 100 245"
              fill="none"
              stroke="#4A2A1C"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <ellipse cx="180" cy="362" rx="170" ry="155" fill="#B9672F" />
            <circle cx="180" cy="165" r="100" fill="#BE6B31" />
            <ellipse cx="180" cy="248" rx="52" ry="18" fill="#A85A27" />
            <ellipse cx="148" cy="112" rx="26" ry="16" fill="#E39A5E" opacity=".5" />
          </g>

          {/* CLOSED GOURD: a shining "Magic Gourd" title on the lower bulb, floating, with twinkling sparks.
              Fades out while the gourd opens. Hidden with reduced motion, where the gourd shows open (chips + code) instead */}
          <g aria-hidden="true" className="magic motion-reduce:hidden">
            <defs>
              {/* a white highlight slides across the title */}
              <linearGradient id="magic-shine" gradientUnits="userSpaceOnUse" x1="60" y1="0" x2="300" y2="0">
                <stop offset="0" stopColor="#FFF1DC" />
                <stop offset=".45" stopColor="#FFF1DC" />
                <stop offset=".5" stopColor="#FFFFFF" />
                <stop offset=".55" stopColor="#FFF1DC" />
                <stop offset="1" stopColor="#FFF1DC" />
                <animateTransform
                  attributeName="gradientTransform"
                  type="translate"
                  values="-260 0;260 0"
                  dur="3.2s"
                  repeatCount="indefinite"
                />
              </linearGradient>
            </defs>
            <g className="animate-magic-float">
              <text
                x="180"
                y="356"
                textAnchor="middle"
                fontSize="34"
                fill="url(#magic-shine)"
                className="font-display font-extrabold tracking-[-.5px]"
              >
                Magic Gourd
              </text>
              <text
                x="180"
                y="386"
                textAnchor="middle"
                fontSize="13"
                fill="#FBE3C6"
                className="animate-magic-pulse font-body font-medium"
              >
                Make your ideas come to life
              </text>
            </g>
            {sparks.map((spark) => (
              <path
                key={`${spark.x}-${spark.y}`}
                d={sparkPath(spark)}
                fill="#FFE7B3"
                style={{ animationDelay: spark.delay }}
                className="origin-center animate-twinkle [transform-box:fill-box]"
              />
            ))}
          </g>

          {/* STOPPER: band on the neck + the lid, which lifts while the gourd opens and closes,
              and tips ("pours") when a chip is picked; the key restarts the pour on every pick */}
          <g aria-hidden="true">
            <rect x="164" y="58" width="32" height="12" rx="2" fill="#C9A86A" />
            <g key={picks} className={picks ? "lidwrap pour" : "lidwrap"}>
              <g className="lid">
                <path d="M160 18 L200 18 L193 36 L193 60 L167 60 L167 36 Z" fill="#2B2B2A" />
                <rect x="157" y="12" width="46" height="9" rx="3" fill="#3A3A38" />
              </g>
            </g>
          </g>

          {/* TECH CHIPS: hidden while the gourd is closed. Once open, each is a toggle button (click,
              Enter or Space) that shows its code; hover / focus swaps the label for "Click me" in a wider pill */}
          <g className="font-mono font-medium" fontSize="11" aria-hidden={!open}>
            {pills.map((pill) => {
              const hinted = hint === pill.label && tech !== pill.label; // the picked chip needs no "Click me"
              const width = hinted ? Math.max(pill.width, 60) : pill.width;
              return (
                <g
                  key={pill.label}
                  role="button"
                  tabIndex={open ? 0 : -1}
                  aria-pressed={tech === pill.label}
                  aria-label={`Show ${pill.label} code`}
                  className="pop"
                  style={fly(pill.dx, pill.dy, pill.d)}
                  onClick={() => pick(pill.label)}
                  onKeyDown={(e) => {
                    if (e.key !== "Enter" && e.key !== " ") return;
                    e.preventDefault();
                    pick(pill.label);
                  }}
                  onMouseEnter={() => open && setHint(pill.label)}
                  onFocus={() => open && setHint(pill.label)}
                  onMouseLeave={() => setHint(null)}
                  onBlur={() => setHint(null)}
                >
                  <g className="chip">
                    <rect
                      x={pill.x + pill.width / 2 - width / 2}
                      y={pill.y}
                      width={width}
                      height="22"
                      rx="11"
                      fill="#F8E7D4"
                    />
                    <text
                      x={pill.x + pill.width / 2}
                      y={pill.y + 15}
                      textAnchor="middle"
                      fontSize={hinted ? 10.5 : undefined}
                      fill="#4A2A1C"
                    >
                      {hinted ? "Click me" : pill.label}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>

          {/* CODE EDITOR on the lower bulb: the screen grows in, then each code line flies in.
              Hidden while the gourd is closed */}
          <g className="screen" aria-hidden="true">
            <ellipse
              cx="180"
              cy="375"
              rx="140"
              ry="115"
              fill="#0F1A2E"
              stroke="#5A3220"
              strokeWidth="4"
            />
            <circle cx="128" cy="294" r="3.5" fill="#F26D5B" />
            <circle cx="140" cy="294" r="3.5" fill="#F2B84B" />
            <circle cx="152" cy="294" r="3.5" fill="#4FC27E" />
            <text x="164" y="297.5" fontSize="9.5" fill="#97A3BA" className="font-mono">
              {gourdSnippets[tech].file}
            </text>
            <path
              d="M78 306 Q180 300 282 306"
              fill="none"
              stroke="#22304A"
              strokeWidth="1.5"
            />
          </g>
          {/* CODE LINES of the picked chip (screen readers hear them while open);
              the key re-mounts them on every pick so they fly in again */}
          <g
            key={picks}
            className={picks ? "picked font-mono" : "font-mono"}
            fontSize="10"
            aria-hidden={!open}
          >
            <CodeLines tech={tech} picked={picks > 0} />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default HeroGourd;
