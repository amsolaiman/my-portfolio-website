// types
import { ExperienceTypeEnum, IExperience } from '@/types/data';

//
import { client } from '../client';

import { mergeIntervals, subtractBlocks, type Interval } from './helpers';

// ----------------------------------------------------------------------

const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365;

const EXCLUDED_TYPES = [
  ExperienceTypeEnum.STUDENT,
  ExperienceTypeEnum.SEASONAL,
  ExperienceTypeEnum.APPRENTICESHIP,
];

// ----------------------------------------------------------------------

/**
 * Fetch all experience entries from Sanity, ordered by start date descending.
 *
 * @returns An array of `IExperience` objects.
 *          - Start and end dates parsed as `Date` instances.
 *          - End date is `null` if not set.
 */
export async function getExperienceData(): Promise<IExperience[]> {
  const query = `*[_type == "experience"] | order(startDate desc) {
    _id,
    title,
    type,
    isCurrent,
    startDate,
    endDate,
    employer {
      name,
      link
    }
  }`;

  const data = (await client.fetch(query)) as IExperience[];

  return data.map((item) => ({
    ...item,
    startDate: new Date(item.startDate),
    endDate: item.endDate ? new Date(item.endDate) : null,
  }));
}

/**
 * Calculate the total years of professional experience from Sanity,
 * excluding roles from EXCLUDED_TYPES.
 *
 * Rules:
 * -  Current roles (`isCurrent: true`) are always counted in full, measured
 *    up to today. If two or more current roles overlap, they're merged into
 *    one continuous block (not double-counted), but current roles are never
 *    reduced by past roles.
 *
 * -  Past roles that overlap a current role lose that overlapping time to
 *    the current role.
 *
 * -  Whatever's left of past roles is then resolved against each other:
 *    sorted by start date, each role's counted start is clamped to the end
 *    of previously-counted time (so a later-starting role loses overlap to
 *    an earlier one), and a role fully contained within already-counted
 *    time is dropped entirely.
 *
 * @returns The total years of experience, rounded down to the nearest integer.
 */
export async function getYearsOfExperience(): Promise<number> {
  const query = `*[
    _type == "experience" &&
    !(type in $excludedTypes)
  ] {
    _id,
    type,
    isCurrent,
    startDate,
    endDate
  }`;

  const experiences = (await client.fetch(query, {
    excludedTypes: EXCLUDED_TYPES,
  })) as IExperience[];

  const now = Date.now();

  const toInterval = (exp: IExperience): Interval | null => {
    const start = new Date(exp.startDate).getTime();
    const end =
      exp.isCurrent || !exp.endDate ? now : new Date(exp.endDate).getTime();

    if (end <= start) {
      return null;
    }

    return { start, end };
  };

  const currentIntervals: Interval[] = [];
  const pastIntervals: Interval[] = [];

  for (const exp of experiences) {
    const interval = toInterval(exp);

    if (!interval) {
      continue;
    }

    (exp.isCurrent ? currentIntervals : pastIntervals).push(interval);
  }

  // Current roles: merged with each other, always counted in full.
  const currentBlocks = mergeIntervals(currentIntervals);
  const currentTotalMs = currentBlocks.reduce(
    (sum, { start, end }) => sum + (end - start),
    0
  );

  // Past roles: first strip anything that overlaps a current block...
  const pastRemaining = pastIntervals.flatMap((interval) =>
    subtractBlocks(interval, currentBlocks)
  );

  // ...then resolve overlaps among what's left of past roles, sorted by
  // start date, earlier-starting role wins the overlap.
  const sortedPast = pastRemaining.sort((a, b) => a.start - b.start);

  let pastTotalMs = 0;
  let cursor = -Infinity;

  for (const { start, end } of sortedPast) {
    const effectiveStart = Math.max(start, cursor);

    if (effectiveStart < end) {
      pastTotalMs += end - effectiveStart;
      cursor = Math.max(cursor, end);
    }
  }

  const totalMs = currentTotalMs + pastTotalMs;

  return Math.floor(totalMs / MS_PER_YEAR);
}

/**
 * Get the start year of the earliest professional experience from Sanity,
 * excluding roles from EXCLUDED_TYPES.
 *
 * @returns The start year as a string (e.g. "2020")
 *          or `null` if no matching entry exists.
 */
export async function getStartYearOfExperience(): Promise<string | null> {
  const query = `*[
    _type == "experience" &&
    !(type in $excludedTypes)
  ] | order(startDate asc) [0].startDate`;

  const startDate = await client.fetch(query, {
    excludedTypes: EXCLUDED_TYPES,
  });

  if (!startDate) {
    return null;
  }

  const year = new Date(startDate).getFullYear();

  return String(year);
}
