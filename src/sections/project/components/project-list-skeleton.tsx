// ----------------------------------------------------------------------

export default function ProjectListSkeleton() {
  return (
    <div className="flex h-full w-full flex-row items-center gap-6">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="bg-foreground/30 aspect-square h-24 animate-pulse"
        />
      ))}
    </div>
  );
}
