import Dialog from "@/components/Dialog";
import Tags from "@/components/Tags";

// below 1024px (tablet + phone) both links become equal-width pills that fill the row
const demoClass = "rounded-full bg-cta px-3.5 py-2 text-center text-white hover:brightness-110";
const codeClass =
  "text-center text-accent hover:underline max-lg:rounded-full max-lg:border max-lg:border-accent max-lg:px-3.5 max-lg:py-2 max-lg:hover:bg-accent-soft max-lg:hover:no-underline";

// screen readers hear "Live demo for Event Hub" instead of five identical "Live demo" links;
// the ↗ is hidden from them, and real links also say they open a new tab
const NewTab = () => <span className="sr-only"> (opens in a new tab)</span>;

const ProjectCard = ({ project }) => {
  const label = (text) => (
    <>
      {text}
      <span className="sr-only"> for {project.title}</span>
      <span aria-hidden="true"> ↗</span>
    </>
  );

  return (
    <article className="flex min-w-0 flex-col gap-3 rounded-xl border border-line bg-surface p-6">
      <span className="self-start font-mono text-xs leading-none tracking-[0.08em] text-muted uppercase">
        {project.kind}
      </span>
      <h3 className="text-[22px] font-extrabold">{project.title}</h3>
      <p className="text-muted">{project.desc}</p>
      <Tags tags={project.tags} className="mt-1" />
      {/* LINKS: pushed to the bottom so they line up across a row.
          An empty url shows the same button, which opens the "not ready yet" dialog instead. */}
      <div className="mt-auto flex items-center gap-4 pt-2 text-sm font-semibold max-lg:grid max-lg:grid-cols-2 max-lg:gap-3">
        {project.demo ? (
          <a href={project.demo} target="_blank" rel="noopener" className={demoClass}>
            {label("Live demo")}
            <NewTab />
          </a>
        ) : (
          <Dialog label={label("Live demo")} what="live demo" project={project.title} className={demoClass} />
        )}
        {project.code ? (
          <a href={project.code} target="_blank" rel="noopener" className={codeClass}>
            {label("Code")}
            <NewTab />
          </a>
        ) : (
          <Dialog label={label("Code")} what="code" project={project.title} className={codeClass} />
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
