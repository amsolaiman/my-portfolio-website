import Link from 'next/link';

// ----------------------------------------------------------------------

export const metadata = {
  title: '404 Page not found',
};

export default function NotFound() {
  return (
    <div className="bg-background flex h-svh w-full flex-col gap-4 px-4 py-8 xl:h-screen xl:px-12">
      <div className="flex flex-1 items-end justify-center xl:justify-start">
        <div className="bg-primary aspect-square h-16 xl:h-20" />
        <div className="bg-secondary aspect-square h-16 xl:h-20" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-between xl:flex-row xl:items-start">
        <p className="text-xs">Oops! This page doesn&apos;t exist.</p>

        <Link
          href="/"
          className="text-foreground hover:text-foreground/75 cursor-pointer text-xs"
        >
          Go back home →
        </Link>
      </div>
    </div>
  );
}
