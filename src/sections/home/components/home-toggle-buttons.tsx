'use client';

// contexts
import { useToggleContext } from '@/contexts/use-toggle-context';

// ----------------------------------------------------------------------

export default function HomeToggleButtons() {
  const { handleToggleProject, handleToggleContact } = useToggleContext();

  return (
    <div className="flex w-full flex-col">
      <button
        onClick={handleToggleProject}
        className="bg-secondary text-foreground/75 hover:text-foreground flex justify-center px-4 pt-2 pb-1 xl:hidden"
      >
        <p className="font-sans text-4xl/[0.8em] whitespace-nowrap">Work</p>
      </button>

      <button
        onClick={handleToggleContact}
        className="bg-primary text-foreground/75 hover:text-foreground flex justify-center px-4 pt-2 pb-1 xl:hidden"
      >
        <p className="font-sans text-4xl/[0.8em] whitespace-nowrap">Contact</p>
      </button>
    </div>
  );
}
