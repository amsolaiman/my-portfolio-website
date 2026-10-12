'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

// components
import { CursorIdentfierEnum } from '@/components/cursor-effect/types';
// contexts
import { useToggleButtons } from '@/contexts/use-toggle-buttons';
// hooks
import { useBreakpoint } from '@/hooks/use-breakpoint';
// utils
import { cn } from '@/utils/tw-merge';

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

  useEffect(() => {
    if (!openProject) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      // Let an open project modal handle Escape first
      if (document.querySelector('[role="dialog"]')) return;

      handleToggleProject();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [openProject, handleToggleProject]);

  if (!upXl) {
    return (
      <div
        id="project-panel"
        key="project-view-mobile"
        inert={!openProject}
        className={cn(
          'bg-secondary absolute inset-0 z-10 flex w-screen flex-col overflow-hidden transition-transform duration-500 ease-in-out',
          openProject ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <button
          type="button"
          onClick={handleToggleProject}
          className="bg-secondary sticky top-0 w-full p-2 text-start text-sm"
        >
          <span aria-hidden>↓ </span>Close
        </button>

        <div className="flex h-max w-full overflow-y-scroll">{children}</div>
      </div>
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
        type="button"
        aria-expanded={openProject}
        aria-controls="project-panel"
        data-hover-cursor={CursorIdentfierEnum.PROJECT_BTN}
        onClick={handleToggleProject}
        className="text-foreground/75 hover:text-foreground flex h-full w-16 cursor-pointer items-end justify-start"
      >
        <span className="-mb-8 origin-top-left -rotate-90 pt-4 font-sans text-6xl whitespace-nowrap">
          Work
        </span>
      </button>

      <div
        ref={containerRef}
        id="project-panel"
        inert={!openProject}
        className="mr-16 w-full overflow-x-scroll"
      >
        <div className="flex h-full grow">{children}</div>
      </div>
    </section>
  );
}
