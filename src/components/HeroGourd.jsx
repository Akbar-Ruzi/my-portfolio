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

        {/* STOPPER */}
        <rect x="164" y="58" width="32" height="12" rx="2" fill="#C9A86A" />
        <path d="M160 18 L200 18 L193 36 L193 60 L167 60 L167 36 Z" fill="#2B2B2A" />
        <rect x="157" y="12" width="46" height="9" rx="3" fill="#3A3A38" />

        {/* SKILL PILLS: text sits in the middle of each pill */}
        <g className="font-mono font-medium" fontSize="11">
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

        {/* CODE EDITOR on the lower bulb */}
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
      </svg>
    </div>
  );
};

export default HeroGourd;
