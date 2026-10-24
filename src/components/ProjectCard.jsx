import Dialog from "@/components/Dialog";

// below 1024px (tablet + phone) both links become equal-width pills that fill the row
const demoClass = "rounded-full bg-cta px-3.5 py-2 text-center text-white hover:brightness-110";
const codeClass =
  "text-center text-accent hover:underline max-lg:rounded-full max-lg:border max-lg:border-accent max-lg:px-3.5 max-lg:py-2 max-lg:hover:bg-accent-soft max-lg:hover:no-underline";

const ProjectCard = ({ project }) => {
  return (
    <article className="flex min-w-0 flex-col gap-3 rounded-xl border border-line bg-surface p-6">
      <span className="self-start font-mono text-xs leading-none tracking-[0.08em] text-muted uppercase">
        {project.kind}
      </span>
      <h3 className="text-[22px]">{project.title}</h3>
      <p className="text-muted">{project.desc}</p>
      {/* TAGS */}
      <ul className="mt-1 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded bg-accent-soft px-2 py-1.5 font-mono text-xs leading-none font-medium"
          >
            {tag}
          </li>
        ))}
      </ul>
      {/* LINKS: pushed to the bottom so they line up across a row.
          An empty url shows the same button, which opens the "not ready yet" dialog instead. */}
      <div className="mt-auto flex items-center gap-4 pt-2 text-sm font-semibold max-lg:grid max-lg:grid-cols-2 max-lg:gap-3">
        {project.demo ? (
          <a href={project.demo} target="_blank" rel="noopener" className={demoClass}>
            Live demo ↗
          </a>
        ) : (
          <Dialog label="Live demo ↗" what="live demo" project={project.title} className={demoClass} />
        )}
        {project.code ? (
          <a href={project.code} target="_blank" rel="noopener" className={codeClass}>
            Code ↗
          </a>
        ) : (
          <Dialog label="Code ↗" what="code" project={project.title} className={codeClass} />
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
