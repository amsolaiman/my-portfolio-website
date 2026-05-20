'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

// contexts
import { useToggleContext } from '@/contexts/use-toggle-context';
// utils
import { cn } from '@/utils/tw-merge';
// hooks
import { useBreakpoint } from '@/hooks/use-breakpoint';

// ----------------------------------------------------------------------

export default function ProjectClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const upXl = useBreakpoint('up', 'xl');

  const containerRef = useRef<HTMLDivElement>(null);

  const { openProject, handleToggleProject } = useToggleContext();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const lenis = new Lenis({
      wrapper: container,
      content: container.firstElementChild as HTMLElement,
      eventsTarget: container,
      orientation: 'horizontal',
      gestureOrientation: 'both',
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  if (!upXl) {
    return null;
  }

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

      <div ref={containerRef} className="mr-16 w-full overflow-x-scroll">
        {children}
      </div>
    </section>
  );
}
