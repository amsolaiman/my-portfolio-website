import { useEffect, useRef } from 'react';

// contexts
import { useToggleContext } from '@/contexts/use-toggle-context';
// utils
import { cn } from '@/utils/tw-merge';

//
import ProjectList from '../project-list';

// ----------------------------------------------------------------------

export default function ProjectView() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { openProject, handleToggleProject } = useToggleContext();

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <section
      className={cn(
        'bg-secondary absolute inset-y-0 right-0 z-10 flex w-screen transition-transform duration-500 ease-in-out',
        openProject ? 'translate-x-0' : 'translate-x-[calc(100vw-128px)]'
      )}
    >
      <button
        onClick={handleToggleProject}
        className="text-foreground/75 hover:text-foreground flex h-full w-16 cursor-pointer items-end justify-start transition-colors duration-300"
      >
        <p className="-mb-8 origin-top-left -rotate-90 pt-4 font-sans text-6xl whitespace-nowrap">
          Work
        </p>
      </button>

      <div ref={scrollRef} className="mr-16 w-full overflow-x-scroll">
        <ProjectList />
      </div>
    </section>
  );
}
