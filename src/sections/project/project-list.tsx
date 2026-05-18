// _store
import projects from '@/_store/projects';

//
import ProjectItem from './project-item';

// ----------------------------------------------------------------------

export default function ProjectList() {
  return (
    <div className="flex h-full w-max">
      <div className="shrink-0 p-12 pr-32">
        <p className="text-background text-xs font-medium">
          / P.003 / Projects
        </p>

        <h1 className="mt-8 font-sans text-8xl/[0.9]">
          What
          <br />I build
        </h1>
      </div>

      <div className="flex w-max gap-40 py-8 pr-12">
        {projects.map((project, index) => (
          <ProjectItem key={project.name} project={project} index={index + 1} />
        ))}
      </div>
    </div>
  );
}
