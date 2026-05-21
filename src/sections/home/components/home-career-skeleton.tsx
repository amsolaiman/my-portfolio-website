// ----------------------------------------------------------------------

export default function HomeCareerSkeleton() {
  return (
    <div className="mt-6 flex w-full md:w-2/3 xl:w-1/2">
      <div className="hidden w-full max-w-24 py-9 pr-4 md:block xl:max-w-32">
        <div className="bg-foreground/10 h-80 animate-pulse" />
      </div>

      <div className="border-primary w-full border-l-2 py-9 pl-4">
        <div className="bg-foreground/10 h-80 animate-pulse" />
      </div>
    </div>
  );
}
