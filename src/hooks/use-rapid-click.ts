'use client';

import { useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

// ----------------------------------------------------------------------

const CLICK_THRESHOLD = 5;

const TIME_WINDOW_MS = 1500; // 1.5 seconds

// ----------------------------------------------------------------------

export function useRapidClick(targetPath: string) {
  const router = useRouter();

  const clickTimestamps = useRef<number[]>([]);

  const handleClick = useCallback(() => {
    const now = Date.now();

    clickTimestamps.current = [
      ...clickTimestamps.current.filter((t) => now - t < TIME_WINDOW_MS),
      now,
    ];

    if (clickTimestamps.current.length >= CLICK_THRESHOLD) {
      // Reset after triggering
      clickTimestamps.current = [];

      router.push(targetPath);
    }
  }, [router, targetPath]);

  return handleClick;
}
