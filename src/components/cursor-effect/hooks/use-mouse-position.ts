'use client';

import { useEffect } from 'react';
import { useSpring, useMotionValue } from 'motion/react';

// ----------------------------------------------------------------------

const SMOOTH_OPTIONS = {
  damping: 20,
  stiffness: 300,
  mass: 0.5,
};

export default function useMousePosition() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, SMOOTH_OPTIONS);
  const smoothY = useSpring(y, SMOOTH_OPTIONS);

  useEffect(() => {
    let rafId: number;

    const updateMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
      });
    };

    window.addEventListener('mousemove', updateMouseMove);

    return () => {
      window.removeEventListener('mousemove', updateMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [x, y]);

  return { smoothX, smoothY };
}
