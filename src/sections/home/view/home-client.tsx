'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

// hooks
import { useBreakpoint } from '@/hooks/use-breakpoint';

// ----------------------------------------------------------------------

export default function HomeClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const upXl = useBreakpoint('up', 'xl');

  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!upXl) return;

    const container = containerRef.current;
    if (!container) return;

    const lenis = new Lenis({
      wrapper: container,
      content: container.firstElementChild as HTMLElement,
      eventsTarget: container,
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

  return (
    <section
      ref={containerRef}
      className="bg-background relative h-full w-screen overflow-y-scroll xl:pr-32"
    >
      <div className="flex w-full grow flex-col">{children}</div>
    </section>
  );
}
