// Gourd illustration from design/wolfdev-portfolio.html, converted to JSX (decorative only)

// Skill pills on the gourd's upper bulb; x/y/width place them inside the 360×520 viewBox
const pills = [
  { label: "Python", x: 117.1, y: 103, width: 56 },
  { label: "FastAPI", x: 180.7, y: 103, width: 62 },
  { label: "React", x: 110.5, y: 137, width: 49 },
  { label: "TypeScript", x: 167.5, y: 137, width: 82 },
  { label: "PostgreSQL", x: 110.5, y: 171, width: 82 },
  { label: "Redis", x: 200.5, y: 171, width: 49 },
  { label: "AI", x: 165.4, y: 205, width: 29 },
];

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
  return (
    <div
      aria-hidden="true"
      className="relative aspect-[360/520] w-[min(100%,480px)] max-w-full self-end justify-self-center max-[860px]:w-[min(100%,380px)]"
    >
      <svg
        viewBox="0 0 360 520"
        preserveAspectRatio="xMidYMax meet"
        className="absolute inset-0 size-full"
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
            Hidden with reduced motion, where the gourd shows open (chips + code) instead */}
        <g className="motion-reduce:hidden">
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

        {/* STOPPER */}
        <rect x="164" y="58" width="32" height="12" rx="2" fill="#C9A86A" />
        <path d="M160 18 L200 18 L193 36 L193 60 L167 60 L167 36 Z" fill="#2B2B2A" />
        <rect x="157" y="12" width="46" height="9" rx="3" fill="#3A3A38" />

        {/* SKILL PILLS: text sits in the middle of each pill.
            Hidden while the gourd is closed (shown with reduced motion) */}
        <g className="font-mono font-medium motion-safe:hidden" fontSize="11">
          {pills.map((pill) => (
            <g key={pill.label}>
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

        {/* CODE EDITOR on the lower bulb, hidden while the gourd is closed (shown with reduced motion) */}
        <g className="motion-safe:hidden">
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
          {/* code colors: keyword #8FB0FF, function #C9A2FF, string #F5B072, comment #6E7D96 */}
          <g className="font-mono" fontSize="10">
            <text x="63" y="325" fill="#6E7D96">
              {"// AI summary for a record"}
            </text>
            <text x="63" y="342">
              <tspan fill="#8FB0FF">import</tspan>
              <tspan fill="#E6ECF7">{" { generate } "}</tspan>
              <tspan fill="#8FB0FF">from</tspan>
              <tspan fill="#F5B072">{' "./ai"'}</tspan>
              <tspan fill="#E6ECF7">;</tspan>
            </text>
            <text x="63" y="374">
              <tspan fill="#8FB0FF">export async function</tspan>
              <tspan fill="#C9A2FF"> summarize</tspan>
              <tspan fill="#E6ECF7">{"(r) {"}</tspan>
            </text>
            <text x="75" y="391">
              <tspan fill="#8FB0FF">const</tspan>
              <tspan fill="#E6ECF7"> prompt = </tspan>
              <tspan fill="#F5B072">{"`Summarize ${r.Name}`"}</tspan>
              <tspan fill="#E6ECF7">;</tspan>
            </text>
            <text x="75" y="408">
              <tspan fill="#8FB0FF">return</tspan>
              <tspan fill="#C9A2FF"> generate</tspan>
              <tspan fill="#E6ECF7">(prompt);</tspan>
            </text>
            <text x="63" y="425" fill="#E6ECF7">
              {"}"}
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default HeroGourd;
