'use client';

import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

const breakpoints: Record<string, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

type Direction = 'up' | 'down';

type Size = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// ----------------------------------------------------------------------

export function useBreakpoint(direction: Direction, size: Size): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const width = breakpoints[size];

    if (!width) {
      throw new Error(`Breakpoint "${size}" not found in Tailwind defaults`);
    }

    const query =
      direction === 'up'
        ? `(min-width: ${width}px)`
        : `(max-width: ${width - 1}px)`;

    const mediaQueryList = window.matchMedia(query);

    const listener = () => setMatches(mediaQueryList.matches);

    listener();

    mediaQueryList.addEventListener('change', listener);

    return () => mediaQueryList.removeEventListener('change', listener);
  }, [direction, size]);

  return matches;
}
