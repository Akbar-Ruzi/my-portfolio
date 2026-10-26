import projects from "@/utils/projects";
import ProjectCard from "@/components/ProjectCard";
import MoreLink from "@/components/MoreLink";

// home (preview): the first projects + "View all projects →".
// /projects: every project; the page header is the visible title, so the h2 is for screen readers only.
const PREVIEW_COUNT = 4;

const Projects = ({ preview = false }) => {
  const items = preview ? projects.slice(0, PREVIEW_COUNT) : projects;

  return (
    <section
      id="work"
      aria-labelledby="work-h"
      className="card-section rounded-[20px] bg-panel py-14"
    >
      {preview ? (
        <h2 id="work-h" className="mb-7 text-[clamp(28px,4vw,38px)] font-extrabold">
          What I&apos;ve Built
        </h2>
      ) : (
        <h2 id="work-h" className="sr-only">
          Projects
        </h2>
      )}
      {/* GRID: 2 columns, 1 at ≤700px; an odd last card spans both columns */}
      <div className="grid grid-cols-2 gap-5 max-[700px]:grid-cols-1 [&>:last-child:nth-child(odd)]:col-span-full">
        {items.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {preview && <MoreLink href="/projects">View all projects</MoreLink>}
    </section>
  );
};

export default Projects;
