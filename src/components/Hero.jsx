import heroData from "@/utils/heroData";
import HeroGourd from "@/components/HeroGourd";

const Hero = () => {
  return (
    // only the bottom corners are rounded so the hero joins the nav above it.
    // No id="top" on purpose: when no element has that id, the browser sends "#top" links
    // to the very top of the page, so the nav and hero look the same as on first load.
    <div
      className="card-section relative overflow-hidden rounded-b-[20px] bg-cream"
    >
      {/* GRID: text | gourd on desktop, stacked at ≤860px; items sit on the bottom edge */}
      <header className="relative z-[1] grid grid-cols-[1.05fr_.95fr] items-end gap-8 pt-12 max-[860px]:grid-cols-1">
        {/* HERO TEXT: isolate keeps the watermark (z-index -1) behind the text but inside this box */}
        <div className="relative isolate grid min-w-0 content-center gap-6 self-center pb-[clamp(100px,12vw,150px)] max-[860px]:pb-[84px]">
          {/* ROLE PILL: blue pill so recruiters spot the roles first; the green dot with a light inner ring is an "available" status light.
              Smaller text where the text column is narrow (two columns below 960px, phones below 640px), so the roles stay on one line */}
          <span className="inline-flex items-center gap-2.5 justify-self-start rounded-full border border-[#C3D0EE] bg-accent-soft py-2 pr-4 pl-2.5 font-mono text-[13px] leading-[1.2] font-semibold tracking-[.08em] text-accent uppercase max-[960px]:text-xs max-sm:gap-2 max-sm:pl-2 max-sm:text-[11px] max-sm:tracking-[.02em]">
            <span aria-hidden="true" className="size-4 shrink-0 rounded-full bg-cta shadow-[inset_0_0_0_3px_#B9DCD3]" />
            {/* on very narrow screens the roles wrap as whole words instead of breaking mid-word */}
            <span className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
              {heroData.roles.map((role, i) => (
                <span key={role} className="whitespace-nowrap">
                  {i > 0 && <span aria-hidden="true" className="mr-2">·</span>}
                  {role}
                </span>
              ))}
            </span>
          </span>
          <h1 className="text-[clamp(40px,7vw,76px)] font-extrabold tracking-[-.02em]">
            {heroData.greeting}
            <br />
            I&apos;m{" "}
            <span className="relative whitespace-nowrap">
              {heroData.name}
              {/* blue hand-drawn underline under the name */}
              <svg
                viewBox="0 0 200 20"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="absolute bottom-[-.22em] left-[-2%] h-[.3em] w-[104%] overflow-visible"
              >
                <path
                  d="M3 14 C 60 2, 140 2, 197 12"
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="text-accent">.</span>
          </h1>
          <p className="max-w-[60ch] text-[clamp(17px,2vw,19px)] text-muted">
            {heroData.desc}
          </p>
          {/* BUTTONS: on phones (<640px) they split the row in two equal halves, and "See my work" gets a pill outline */}
          <div className="flex flex-wrap items-center gap-6 max-sm:grid max-sm:grid-cols-2 max-sm:items-stretch max-sm:gap-3">
            <a
              href={heroData.primary.url}
              className="inline-flex items-center justify-center rounded-full bg-cta px-5 py-3 text-[15px] font-semibold text-white hover:brightness-110"
            >
              {heroData.primary.title}
            </a>
            <a
              href={heroData.secondary.url}
              className="group inline-flex items-center justify-center gap-3 text-[15px] font-semibold max-sm:gap-2 max-sm:rounded-full max-sm:border-[1.5px] max-sm:border-line max-sm:bg-panel max-sm:py-1.5"
            >
              <span
                aria-hidden="true"
                className="grid size-10 place-items-center rounded-full border-[1.5px] border-fg group-hover:bg-fg group-hover:text-cream max-sm:size-8"
              >
                <svg width="14" height="14" viewBox="0 0 14 14">
                  <path d="M4 2.5v9l7.5-4.5z" fill="currentColor" />
                </svg>
              </span>
              {heroData.secondary.title}
            </a>
          </div>
          {/* WATERMARK: faint big text behind the bottom of the text column; whitespace-pre keeps its two lines */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-.1em] left-0 -z-10 font-display text-[clamp(30px,4.3vw,54px)] leading-[.98] font-extrabold tracking-[-.02em] whitespace-pre text-fg/5"
          >
            {heroData.watermark}
          </span>
        </div>
        {/* HERO GOURD */}
        <HeroGourd />
      </header>
    </div>
  );
};

export default Hero;
