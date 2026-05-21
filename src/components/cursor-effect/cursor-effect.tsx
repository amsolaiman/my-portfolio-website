'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

// hooks
import { useBreakpoint } from '@/hooks/use-breakpoint';

// ----------------------------------------------------------------------

export default function CursorEffect() {
  const upXl = useBreakpoint('up', 'xl');

  const CURSOR_SIZE = 40;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothOptions = {
    damping: 20,
    stiffness: 300,
    mass: 0.5,
  };

  const smoothX = useSpring(x, smoothOptions);
  const smoothY = useSpring(y, smoothOptions);

  //#region Track Mouse Movement
  useEffect(() => {
    let rafId: number;

    const updateMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        x.set(e.clientX - CURSOR_SIZE / 2);
        y.set(e.clientY - CURSOR_SIZE / 2);
      });
    };

    window.addEventListener('mousemove', updateMouseMove);

    return () => {
      window.removeEventListener('mousemove', updateMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [x, y, CURSOR_SIZE]);
  //#endregion

  if (!upXl) {
    return null;
  }

  return (
    <motion.div
      className="border-foreground pointer-events-none fixed z-50 h-10 w-10 rounded-full border"
      style={{
        left: smoothX,
        top: smoothY,
        willChange: 'transform',
      }}
      animate={{
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
      }}
    />
  );
}
