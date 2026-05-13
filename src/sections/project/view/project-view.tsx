// contexts
import { useToggleContext } from '@/contexts/use-toggle-context';

// ----------------------------------------------------------------------

export default function ProjectView() {
  const { openProject, handleToggleProject } = useToggleContext();

  return (
    <section
      className={`bg-secondary absolute inset-y-0 right-0 flex w-[calc(100vw-64px)] transition-transform duration-500 ease-in-out ${openProject ? '-translate-x-16' : 'translate-x-[calc(100vw-192px)]'}`}
    >
      <button
        onClick={handleToggleProject}
        className="text-foreground/75 hover:text-foreground flex h-full w-16 cursor-pointer items-end justify-start transition-colors duration-300"
      >
        <p className="-mb-8 origin-top-left -rotate-90 pt-4 font-sans text-6xl whitespace-nowrap">
          Works
        </p>
      </button>
    </section>
  );
}
