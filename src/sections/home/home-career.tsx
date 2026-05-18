import { format } from 'date-fns';

// _store
import experience, { IExperience } from '@/_store/experience';
// utils
import { cn } from '@/utils/tw-merge';

// ----------------------------------------------------------------------

export default function HomeCareer() {
  const categorizeArray = (
    array: IExperience[]
  ): { group: string; items: IExperience[] }[] => {
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

  return (
    <div className="w-full px-12 pt-32">
      <p className="text-secondary text-xs">/ P.002 / Career</p>

      <h1 className="mt-8 font-sans text-8xl/[0.9]">Exp. since &apos;22</h1>

      <ul className="mt-6 w-1/2">
        {categorizeArray(experience).map((group) => (
          <li key={group.group} className="flex">
            <p className="border-primary w-full max-w-32 border-r-2 py-9 text-sm">
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
                        href={item.employerLink ?? undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'text-foreground text-start text-base',
                          !!item.employerLink &&
                            'hover:text-foreground/75 cursor-pointer'
                        )}
                      >
                        {item.employer}
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
    </div>
  );
}
