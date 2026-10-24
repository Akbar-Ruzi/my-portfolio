import projects from "@/utils/projects";
import ProjectCard from "@/components/projectCard";

const Projects = () => {
  return (
    <section
      id="work"
      aria-labelledby="work-h"
      className="card-section rounded-[20px] bg-panel py-14"
    >
      <h2 id="work-h" className="mb-7 text-[clamp(28px,4vw,38px)]">
        What I&apos;ve Built
      </h2>
      {/* GRID: 2 columns, 1 at ≤700px */}
      <div className="grid grid-cols-2 gap-5 max-[700px]:grid-cols-1">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
