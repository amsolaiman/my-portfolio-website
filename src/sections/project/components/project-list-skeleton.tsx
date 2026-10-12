// ----------------------------------------------------------------------

export default function ProjectListSkeleton() {
  return (
    <div aria-hidden className="flex h-full w-full flex-row items-center gap-6">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="aspect-square h-24 bg-white/30 motion-safe:animate-pulse"
        />
      ))}
    </div>
  );
}
