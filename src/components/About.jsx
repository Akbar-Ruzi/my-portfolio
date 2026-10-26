import summaryData from "@/utils/summaryData";
import skillSet from "@/utils/skillSet";
import withBold from "@/utils/withBold";

const About = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-h"
      className="card-section rounded-[20px] bg-cream py-14"
    >
      <h2 id="about-h" className="mb-7 text-[clamp(28px,4vw,38px)] font-semibold">
        {summaryData.title}
      </h2>
      {/* GRID: text | skill groups, stacked at ≤760px */}
      <div className="grid grid-cols-2 gap-10 max-[760px]:grid-cols-1">
        {/* TEXT */}
        <div>
          {summaryData.desc.map((item) => (
            <p key={item.id} className="mb-3.5 max-w-[62ch]">
              {withBold(item.p)}
            </p>
          ))}
          <p className="text-[15px] text-muted">
            <strong className="font-semibold text-fg">
              {summaryData.certifications.length > 1 ? "Certifications:" : "Certification:"}
            </strong>{" "}
            {summaryData.certifications.join(", ")}
          </p>
        </div>
        {/* SKILL GROUPS: highlighted group gets accent-blue pills */}
        <div className="grid gap-[18px]">
          {skillSet.map((set) => (
            <div key={set.group}>
              <h3 className="mb-2 font-body text-[15px] leading-[1.3] font-semibold">
                {set.group}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {set.items.map((item) => (
                  <li
                    key={item}
                    className={`rounded-full border px-2.5 py-2 font-mono text-[13px] leading-none font-medium ${
                      set.highlight
                        ? "border-accent text-accent"
                        : "border-line text-muted"
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
