'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

// ----------------------------------------------------------------------

export default function HomeClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-background relative flex h-full w-screen grow flex-col overflow-y-scroll xl:pr-32"
    >
      {children}
    </section>
  );
}
