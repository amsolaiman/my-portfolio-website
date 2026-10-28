import Link from 'next/link';

// constants
import { PATHS } from '@/constants/paths';

// ----------------------------------------------------------------------

export default function NotFoundView() {
  return (
    <main className="bg-neutral flex h-svh w-full flex-col gap-4 px-4 py-8 xl:h-screen xl:px-12">
      <div
        aria-hidden
        className="flex flex-1 items-end justify-center xl:justify-start"
      >
        <div className="bg-primary aspect-square h-16 xl:h-20" />
        <div className="bg-secondary aspect-square h-16 xl:h-20" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-between xl:flex-row xl:items-start">
        <h1 className="text-center text-xs font-normal text-white">
          Oops! This page doesn&apos;t exist.
        </h1>

        <Link
          href={PATHS.root}
          className="button-focus-effect cursor-pointer text-xs text-white hover:text-white/75"
        >
          Go back home <span aria-hidden>→</span>
        </Link>
      </div>
    </main>
  );
}
