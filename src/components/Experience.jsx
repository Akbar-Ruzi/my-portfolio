import experiences from "@/utils/experiences";
import withBold from "@/utils/withBold";
import Tags from "@/components/Tags";
import MoreLink from "@/components/MoreLink";

// home (preview): the newest entries + "View full experience →".
// /experience: every entry; the page header is the visible title, so the h2 is for screen readers only.
const PREVIEW_COUNT = 4;

const Experience = ({ preview = false }) => {
  const items = preview ? experiences.slice(0, PREVIEW_COUNT) : experiences;

  return (
    <section
      id="experience"
      aria-labelledby="xp-h"
      className="card-section rounded-[20px] bg-cream py-14"
    >
      {preview ? (
        <h2 id="xp-h" className="mb-7 text-[clamp(28px,4vw,38px)] font-extrabold">
          Experience
        </h2>
      ) : (
        <h2 id="xp-h" className="sr-only">
          All experience
        </h2>
      )}
      {/* TIMELINE, three layouts:
          - desktop (≥1024px): grid [org + date] [line + dot] [role + details]
          - tablet (640–1023px): the line moves to the left, org/role stack beside it
          - phone (<640px): no line; each entry is a white card on the cream section
          (max-sm: rules come after max-lg: in Tailwind's CSS, so on phones they win) */}
      <ol className="grid max-sm:gap-3">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ "--dot": item.dot }}
            className="grid grid-cols-[minmax(0,260px)_48px_minmax(0,1fr)] gap-x-5 max-lg:grid-cols-[36px_minmax(0,1fr)] max-lg:gap-x-3.5 max-sm:grid-cols-1 max-sm:rounded-2xl max-sm:bg-panel max-sm:p-5"
          >
            {/* ORG + DATE */}
            <div className="pt-1 pb-8 max-lg:col-start-2 max-lg:row-start-1 max-lg:pb-1.5 max-sm:col-start-1 max-sm:p-0">
              <h3 className="font-display text-xl leading-[1.3] font-semibold">
                {item.org}
              </h3>
              <span className="mt-1.5 block font-mono text-sm text-muted tabular-nums">
                {item.when}
              </span>
            </div>
            {/* LINE: dashed ring with the colored dot, then a dashed line down to the next entry (hidden on phones) */}
            <div
              aria-hidden="true"
              className="flex flex-col items-center max-lg:col-start-1 max-lg:row-span-2 max-lg:row-start-1 max-sm:hidden"
            >
              <span className="grid size-[30px] flex-none place-items-center rounded-full border-[1.5px] border-dashed border-muted">
                <span className="size-4 rounded-full bg-[var(--dot)]" />
              </span>
              <span className="mt-1 w-0 flex-1 border-l-[1.5px] border-dashed border-muted opacity-70" />
            </div>
            {/* ROLE + DETAILS: a bullet list, or one paragraph (summary) */}
            <div className="min-w-0 pt-1 pb-8 max-lg:col-start-2 max-lg:row-start-2 max-sm:col-start-1 max-sm:pt-3 max-sm:pb-0">
              {/* below 1024px org and role sit in one column, so the role is smaller to tell them apart */}
              <h3 className="font-display text-xl leading-[1.3] font-semibold max-lg:text-base">
                {item.role}
              </h3>
              {item.bullets ? (
                <ul className="mt-2 grid max-w-[62ch] list-disc gap-1.5 pl-[18px] leading-[1.7] text-muted">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{withBold(bullet)}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 max-w-[60ch] leading-[1.8] text-muted">
                  {withBold(item.summary)}
                </p>
              )}
              {item.tags && <Tags tags={item.tags} className="mt-3.5" />}
            </div>
          </li>
        ))}
      </ol>
      {preview && <MoreLink href="/experience">View full experience</MoreLink>}
    </section>
  );
};

export default Experience;
