'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

// contexts
import { useToggleButtons } from '@/contexts/use-toggle-buttons';
// utils
import { cn } from '@/utils/tw-merge';
// hooks
import { useBreakpoint } from '@/hooks/use-breakpoint';
// components
import { CursorIdentfierEnum } from '@/components/cursor-effect/types';

// ----------------------------------------------------------------------

export default function ProjectClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const upXl = useBreakpoint('up', 'xl');

  const containerRef = useRef<HTMLDivElement>(null);

  const { openProject, handleToggleProject } = useToggleButtons();

  useEffect(() => {
    if (!upXl) return;

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
  }, [upXl]);

  if (!upXl) {
    return (
      <section
        key="project-view-mobile"
        className={cn(
          'bg-secondary absolute inset-0 z-10 flex w-screen flex-col overflow-hidden transition-transform duration-500 ease-in-out',
          openProject ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <button
          onClick={handleToggleProject}
          className="bg-secondary sticky top-0 w-full p-2 text-start text-sm"
        >
          ↓ Close
        </button>

        <div className="flex h-max w-full overflow-y-scroll">{children}</div>
      </section>
    );
  }

  return (
    <section
      key="project-view-desktop"
      className={cn(
        'bg-secondary absolute inset-y-0 right-0 z-10 flex w-screen transition-transform duration-500 ease-in-out',
        openProject ? 'translate-x-0' : 'translate-x-[calc(100vw-128px)]'
      )}
    >
      <button
        data-hover-cursor={CursorIdentfierEnum.PROJECT_BTN}
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
