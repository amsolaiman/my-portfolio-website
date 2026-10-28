import { Suspense } from 'react';
import { format } from 'date-fns';

// @sanity
import {
  getExperienceData,
  getStartYearOfExperience,
} from '@/_sanity/utils/experience';
// components
import { CursorIdentfierEnum } from '@/components/cursor-effect/types';
// types
import { IExperience, IGroupedExperience } from '@/types/data';

//
import HomeCareerSkeleton from './components/home-career-skeleton';

// ----------------------------------------------------------------------

const categorizeArray = (array: IExperience[]): IGroupedExperience[] => {
  const map: Record<string, IExperience[]> = {};

  for (const item of array) {
    const year = item.startDate?.getFullYear().toString() ?? '';

    if (!map[year]) {
      map[year] = [];
    }

    map[year].push(item);
  }

  return Object.entries(map)
    .map(([group, items]) => ({
      group,
      items: items.sort(
        (a, b) => b.startDate.getTime() - a.startDate.getTime()
      ),
    }))
    .sort((a, b) => b.group.localeCompare(a.group));
};

// ----------------------------------------------------------------------

async function Timeline() {
  const experience = await getExperienceData();

  if (!experience.length) {
    return (
      <p className="mt-6 mb-32 text-xs text-gray-400">
        Oops! I&apos;ll work on this.
      </p>
    );
  }

  return (
    <ol className="mt-6 w-full md:w-2/3 xl:w-1/2">
      {categorizeArray(experience).map((group) => (
        <li key={group.group} className="flex">
          <p
            aria-hidden
            className="hidden w-full max-w-24 pt-8 text-sm text-white md:block xl:max-w-32"
          >
            {group.group}
          </p>

          <ol className="border-primary w-full border-l-2">
            {group.items.map((item) => {
              const startISO = item.startDate.toISOString();
              const endISO = item.endDate?.toISOString();

              const startDate = format(item.startDate, 'MMM yyyy');
              const endDate =
                !item.isCurrent && item.endDate
                  ? format(item.endDate, 'MMM yyyy')
                  : 'present';

              return (
                <li key={item._id} className="flex gap-4 py-8 pl-4 xl:gap-6">
                  <span aria-hidden className="text-primary text-xs">
                    ●
                  </span>

                  <div>
                    <h3 className="text-primary text-xs">{item.title}</h3>

                    {item.employer.link ? (
                      <a
                        data-hover-cursor={CursorIdentfierEnum.TEXT_BTN}
                        href={item.employer.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button-focus-effect text-start text-base text-white hover:text-white/75"
                      >
                        {item.employer.name}
                      </a>
                    ) : (
                      <p className="text-base text-white">
                        {item.employer.name}
                      </p>
                    )}

                    <p className="text-xs text-gray-400">
                      {item.type}, <time dateTime={startISO}>{startDate}</time>
                      &nbsp;-&nbsp;
                      {item.isCurrent || !item.endDate ? (
                        'present'
                      ) : (
                        <time dateTime={endISO}>{endDate}</time>
                      )}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </li>
      ))}
    </ol>
  );
}

export default async function HomeCareer() {
  const startYear = await getStartYearOfExperience();

  const renderStartYear = startYear ? `'${startYear.slice(-2)}` : '...';

  return (
    <section
      aria-labelledby="career-heading"
      className="w-full p-4 pt-32 xl:px-12"
    >
      <p className="text-secondary text-xs">/ P.002 / Career</p>

      <h2
        id="career-heading"
        className="mt-8 font-sans text-6xl text-white xl:text-8xl/[0.9]"
      >
        Exp. since {renderStartYear}
      </h2>

      <Suspense fallback={<HomeCareerSkeleton />}>
        <Timeline />
      </Suspense>
    </section>
  );
}
