// ----------------------------------------------------------------------

export interface Interval {
  start: number;
  end: number;
}
// ----------------------------------------------------------------------

/**
 * Used in `getYearsOfExperience` util
 * Merge overlapping/touching intervals into the minimal set of disjoint blocks.
 */
export function mergeIntervals(intervals: Interval[]): Interval[] {
  if (intervals.length === 0) {
    return [];
  }

  const sorted = [...intervals].sort((a, b) => a.start - b.start);

  const merged: Interval[] = [sorted[0]];

  for (const current of sorted.slice(1)) {
    const last = merged[merged.length - 1];

    if (current.start <= last.end) {
      last.end = Math.max(last.end, current.end);
    } else {
      merged.push(current);
    }
  }

  return merged;
}

/**
 * Used in `getYearsOfExperience` util
 * Remove any portion of `interval` that overlaps any of the given (disjoint, sorted) `blocks`.
 */
export function subtractBlocks(
  interval: Interval,
  blocks: Interval[]
): Interval[] {
  let remaining: Interval[] = [interval];

  for (const block of blocks) {
    const next: Interval[] = [];

    for (const r of remaining) {
      const noOverlap = block.end <= r.start || block.start >= r.end;

      if (noOverlap) {
        next.push(r);
        continue;
      }

      if (block.start > r.start) {
        next.push({ start: r.start, end: block.start });
      }

      if (block.end < r.end) {
        next.push({ start: block.end, end: r.end });
      }
    }

    remaining = next;
  }

  return remaining;
}
