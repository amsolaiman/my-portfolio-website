// types
import { ExperienceTypeEnum, IExperience } from '@/types/data';

//
import { client } from '../client';

// ----------------------------------------------------------------------

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

  const data = await client.fetch(query);

  return data.map((item: IExperience) => ({
    ...item,
    startDate: new Date(item.startDate),
    endDate: item.endDate ? new Date(item.endDate) : null,
  }));
}

// ----------------------------------------------------------------------

const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365;

const EXCLUDED_TYPES = [
  ExperienceTypeEnum.APPRENTICESHIP,
  ExperienceTypeEnum.SEASONAL,
  ExperienceTypeEnum.STUDENT,
];

export async function getYearsOfExperience(): Promise<number> {
  const query = `{
    "experiences": *[
      _type == "experience" &&
      !(type in $excludedTypes)
    ] {
      _id,
      type,
      isCurrent,
      startDate,
      endDate
    },
    "cutoffDate": *[
      _type == "experience" &&
      isCurrent == true &&
      !(type in $excludedTypes)
    ] | order(startDate asc) [0].startDate
  }`;

  const { experiences, cutoffDate } = await client.fetch(query, {
    excludedTypes: EXCLUDED_TYPES,
  });

  const now = new Date().toISOString();

  // Filter out entries that start after the cutoff
  // cutoffDate — the start date of the earliest `isCurrent` entry
  const filtered = (experiences as IExperience[])
    .filter((exp) => {
      if (!cutoffDate) {
        return true;
      }
      return exp.startDate <= cutoffDate;
    })
    .map((exp) => {
      const start = new Date(exp.startDate).getTime();

      if (exp.isCurrent && exp.startDate === cutoffDate) {
        return { start, end: new Date(now).getTime() };
      }

      const end = exp.endDate
        ? new Date(exp.endDate).getTime()
        : new Date(now).getTime();

      return { start, end };
    });

  const totalMs = filtered.reduce(
    (sum, { start, end }) => sum + (end - start),
    0
  );

  return Math.floor(totalMs / MS_PER_YEAR);
}
