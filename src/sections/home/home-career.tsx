import { format } from 'date-fns';
import { Suspense } from 'react';

// _sanity
import { getExperienceData } from '@/_sanity/utils/experience';
// utils
import { cn } from '@/utils/tw-merge';
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
      <p className="text-foreground/50 mt-6 mb-32 text-xs">
        Oops! I&apos;ll work on this.
      </p>
    );
  }

  return (
    <ul className="mt-6 w-full md:w-2/3 xl:w-1/2">
      {categorizeArray(experience).map((group) => (
        <li key={group.group} className="flex">
          <p className="hidden w-full max-w-24 pt-8 text-sm md:block xl:max-w-32">
            {group.group}
          </p>

          <ul className="border-primary w-full border-l-2">
            {group.items.map((item) => {
              const startDate = format(item.startDate, 'MMM yyyy');

              const endDate =
                !item.isCurrent && item.endDate
                  ? format(item.endDate, 'MMM yyyy')
                  : 'present';

              const duration = `${startDate} - ${endDate}`;

              return (
                <li key={item.title} className="flex gap-4 py-8 pl-4 xl:gap-6">
                  <span className="text-primary text-xs">●</span>

                  <div>
                    <h4 className="text-primary text-xs">{item.title}</h4>

                    <a
                      href={item.employer.link ?? undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'text-foreground text-start text-base',
                        !!item.employer.link &&
                          'hover:text-foreground/75 cursor-pointer'
                      )}
                    >
                      {item.employer.name}
                    </a>

                    <p className="text-foreground/50 text-xs">
                      {item.type}, {duration}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default function HomeCareer() {
  return (
    <div className="w-full p-4 pt-32 xl:px-12">
      <p className="text-secondary text-xs">/ P.002 / Career</p>

      <h1 className="mt-8 font-sans text-6xl xl:text-8xl/[0.9]">
        Exp. since &apos;22
      </h1>

      <Suspense fallback={<HomeCareerSkeleton />}>
        <Timeline />
      </Suspense>
    </div>
  );
}
