'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

//
import HomeAbout from '../home-about';
import HomeCareer from '../home-career';
import HomeFooter from '../home-footer';
import HomeHero from '../home-hero';
import HomeQuote from '../home-quote';

// ----------------------------------------------------------------------

export default function HomeView() {
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
      className="bg-background relative flex h-full w-screen grow flex-col overflow-y-scroll pr-32"
    >
      <HomeHero />

      <HomeAbout />

      <HomeCareer />

      <HomeQuote />

      <HomeFooter />
    </section>
  );
}
