'use client';

// constants
import { PATHS } from '@/constants/paths';
// hooks
import { useRapidClick } from '@/hooks/use-rapid-click';

// ----------------------------------------------------------------------

export default function MissingConfigView() {
  const handleClick = useRapidClick(PATHS.studio);

  return (
    <div className="bg-background flex h-svh w-full flex-col gap-4 px-4 py-8 xl:h-screen xl:px-12">
      <div
        onClick={handleClick}
        className="flex flex-1 items-end justify-center xl:justify-start"
      >
        <div className="bg-primary aspect-square h-16 xl:h-20" />
        <div className="bg-secondary aspect-square h-16 xl:h-20" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-between xl:flex-row xl:items-start">
        <p className="text-center text-xs">
          Oops! The site is not properly configured.
        </p>
      </div>
    </div>
  );
}
