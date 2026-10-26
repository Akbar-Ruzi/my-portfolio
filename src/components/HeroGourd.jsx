"use client";

// Gourd illustration from design/wolfdev-portfolio.html, converted to JSX (decorative only).
// The button opens and closes it; the animations live in globals.css (.gourd)
import { useEffect, useState } from "react";
import heroData from "@/utils/heroData";
import { playClose, playOpen } from "@/utils/gourdSounds";

// Skill pills on the gourd's upper bulb; x/y/width place them inside the 360×520 viewBox.
// dx/dy: where the pill starts (at the neck) relative to its place; d: when it pops out
const pills = [
  { label: "Python", x: 117.1, y: 103, width: 56, dx: 34.9, dy: -74, d: 0.85 },
  { label: "FastAPI", x: 180.7, y: 103, width: 62, dx: -31.7, dy: -74, d: 0.97 },
  { label: "React", x: 110.5, y: 137, width: 49, dx: 45, dy: -108, d: 1.09 },
  { label: "TypeScript", x: 167.5, y: 137, width: 82, dx: -28.5, dy: -108, d: 1.21 },
  { label: "PostgreSQL", x: 110.5, y: 171, width: 82, dx: 28.5, dy: -142, d: 1.33 },
  { label: "Redis", x: 200.5, y: 171, width: 49, dx: -45, dy: -142, d: 1.45 },
  { label: "AI", x: 165.4, y: 205, width: 29, dx: 0.1, dy: -176, d: 1.57 },
];

// CSS variables for one animated item (pill or code line)
const fly = (dx, dy, d) => ({ "--dx": `${dx}px`, "--dy": `${dy}px`, "--d": `${d}s` });

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

const HeroGourd = () => {
  // closed → opening → open → closing → closed
  const [state, setState] = useState("closed");
  const busy = state === "opening" || state === "closing";

  // move on to open / closed once the animation has finished
  useEffect(() => {
    if (!busy) return;
    const timer = setTimeout(() => setState(state === "opening" ? "open" : "closed"), ANIMATION_MS);
    return () => clearTimeout(timer);
  }, [state, busy]);

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

  return (
    <div
      data-state={state}
      className="gourd relative aspect-[360/520] w-[min(100%,480px)] max-w-full self-end justify-self-center max-[860px]:w-[min(100%,380px)]"
    >
      {/* OPEN / CLOSE BUTTON: aria-disabled instead of disabled during the animation, so keyboard focus
          stays on it. Hidden with reduced motion, where the gourd is always open */}
      <button
        type="button"
        onClick={toggle}
        aria-disabled={busy}
        className="absolute top-[4%] right-0 z-[3] inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-panel px-3.5 py-[9px] font-body text-sm leading-none font-semibold text-cta shadow-[0_8px_20px_-12px_rgba(15,26,46,.4)] transition-[transform,background-color] duration-150 hover:bg-[#EEF5F1] focus-visible:outline-cta active:scale-[.96] aria-disabled:cursor-default aria-disabled:opacity-55 aria-disabled:hover:bg-panel aria-disabled:active:scale-100 motion-reduce:hidden max-[860px]:top-0 max-[860px]:-right-1"
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
      <svg
        viewBox="0 0 360 520"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden="true"
        className="absolute inset-0 size-full overflow-visible"
      >
        {/* GOURD: handle, lower bulb, upper bulb, waist, highlight */}
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

        {/* CLOSED GOURD: a shining "Magic Gourd" title on the lower bulb, floating, with twinkling sparks.
            Fades out while the gourd opens. Hidden with reduced motion, where the gourd shows open (chips + code) instead */}
        <g className="magic motion-reduce:hidden">
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

        {/* STOPPER: band on the neck + the lid, which lifts while the gourd opens and closes */}
        <rect x="164" y="58" width="32" height="12" rx="2" fill="#C9A86A" />
        <g className="lid">
          <path d="M160 18 L200 18 L193 36 L193 60 L167 60 L167 36 Z" fill="#2B2B2A" />
          <rect x="157" y="12" width="46" height="9" rx="3" fill="#3A3A38" />
        </g>

        {/* SKILL PILLS: text sits in the middle of each pill. Hidden while the gourd is closed */}
        <g className="font-mono font-medium" fontSize="11">
          {pills.map((pill) => (
            <g key={pill.label} className="pop" style={fly(pill.dx, pill.dy, pill.d)}>
              <rect
                x={pill.x}
                y={pill.y}
                width={pill.width}
                height="22"
                rx="11"
                fill="#F8E7D4"
              />
              <text
                x={pill.x + pill.width / 2}
                y={pill.y + 15}
                textAnchor="middle"
                fill="#4A2A1C"
              >
                {pill.label}
              </text>
            </g>
          ))}
        </g>

        {/* CODE EDITOR on the lower bulb: the screen grows in, then each code line flies in.
            Hidden while the gourd is closed */}
        <g className="screen">
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
            assistant.ts
          </text>
          <path
            d="M78 306 Q180 300 282 306"
            fill="none"
            stroke="#22304A"
            strokeWidth="1.5"
          />
        </g>
        {/* CODE LINES, flying in one by one (dx/dy start them near the neck).
            Colors: keyword #8FB0FF, function #C9A2FF, string #F5B072, comment #6E7D96 */}
        <g className="font-mono" fontSize="10">
          <text x="63" y="325" className="fly" style={fly(39, -285, 1.95)} fill="#6E7D96">
            {"// AI summary for a record"}
          </text>
          <text x="63" y="342" className="fly" style={fly(21, -302, 2.08)}>
            <tspan fill="#8FB0FF">import</tspan>
            <tspan fill="#E6ECF7">{" { generate } "}</tspan>
            <tspan fill="#8FB0FF">from</tspan>
            <tspan fill="#F5B072">{' "./ai"'}</tspan>
            <tspan fill="#E6ECF7">;</tspan>
          </text>
          <text x="63" y="374" className="fly" style={fly(9, -334, 2.21)}>
            <tspan fill="#8FB0FF">export async function</tspan>
            <tspan fill="#C9A2FF"> summarize</tspan>
            <tspan fill="#E6ECF7">{"(r) {"}</tspan>
          </text>
          <text x="75" y="391" className="fly" style={fly(-6, -351, 2.34)}>
            <tspan fill="#8FB0FF">const</tspan>
            <tspan fill="#E6ECF7"> prompt = </tspan>
            <tspan fill="#F5B072">{"`Summarize ${r.Name}`"}</tspan>
            <tspan fill="#E6ECF7">;</tspan>
          </text>
          <text x="75" y="408" className="fly" style={fly(33, -368, 2.47)}>
            <tspan fill="#8FB0FF">return</tspan>
            <tspan fill="#C9A2FF"> generate</tspan>
            <tspan fill="#E6ECF7">(prompt);</tspan>
          </text>
          <text x="63" y="425" className="fly" style={fly(114, -385, 2.6)} fill="#E6ECF7">
            {"}"}
          </text>
        </g>
      </svg>
    </div>
  );
};

export default HeroGourd;
