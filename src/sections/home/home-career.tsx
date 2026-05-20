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
    <ul className="mt-6 w-1/2">
      {categorizeArray(experience).map((group) => (
        <li key={group.group} className="flex">
          <p className="border-primary w-full max-w-32 border-r-2 pt-8 text-sm">
            {group.group}
          </p>

          <ul className="w-full">
            {group.items.map((item) => {
              const startDate = format(item.startDate, 'MMM yyyy');

              const endDate =
                !item.isCurrent && item.endDate
                  ? format(item.endDate, 'MMM yyyy')
                  : 'present';

              const duration = `${startDate} - ${endDate}`;

              return (
                <li key={item.title} className="flex gap-6 py-8 pl-4">
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
    <div className="w-full px-12 pt-32">
      <p className="text-secondary text-xs">/ P.002 / Career</p>

      <h1 className="mt-8 font-sans text-8xl/[0.9]">Exp. since &apos;22</h1>

      <Suspense fallback={<HomeCareerSkeleton />}>
        <Timeline />
      </Suspense>
    </div>
  );
}
