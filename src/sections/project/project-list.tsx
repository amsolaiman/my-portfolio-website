import { Suspense } from 'react';

// @sanity
import { getProjectData } from '@/_sanity/utils/project';

//
import ProjectItem from './project-item';
import ProjectListSkeleton from './components/project-list-skeleton';

// ----------------------------------------------------------------------

async function Listing() {
  const projects = await getProjectData();

  if (!projects.length) {
    return (
      <div className="flex items-center px-4 xl:h-full xl:px-0">
        <p className="text-foreground text-xs">
          Oops! I&apos;ll look into this.
        </p>
      </div>
    );
  }

  return (
    <ol
      role="list"
      className="flex w-screen flex-col gap-10 px-2 py-8 md:px-4 xl:w-max xl:flex-row xl:gap-40 xl:pr-12 xl:pl-0"
    >
      {projects.map((project, index) => (
        <ProjectItem key={project._id} project={project} index={index + 1} />
      ))}
    </ol>
  );
}

export default function ProjectList() {
  return (
    <section
      aria-labelledby="projects-heading"
      className="flex h-max w-full flex-col xl:h-full xl:w-max xl:flex-row"
    >
      <div className="shrink-0 p-4 xl:p-12 xl:pr-32">
        <p className="text-background text-xs font-medium">
          / P.003 / Projects
        </p>

        <h2
          id="projects-heading"
          className="mt-8 font-sans text-6xl xl:text-8xl/[0.9]"
        >
          What
          <br />I build
        </h2>
      </div>

      <Suspense fallback={<ProjectListSkeleton />}>
        <Listing />
      </Suspense>
    </section>
  );
}
