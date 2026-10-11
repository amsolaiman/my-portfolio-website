'use client';

// contexts
import { useToggleButtons } from '@/contexts/use-toggle-buttons';

// ----------------------------------------------------------------------

export default function HomeToggleButtons() {
  const { handleToggleProject, handleToggleContact } = useToggleButtons();

  return (
    <div className="flex w-full flex-col">
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={handleToggleProject}
        className="bg-secondary text-foreground focus-visible:outline-foreground flex cursor-pointer justify-center px-4 pt-2 pb-1 font-sans text-4xl/[0.8em] whitespace-nowrap focus-visible:outline-2 focus-visible:-outline-offset-4 xl:hidden"
      >
        Work
      </button>

      <button
        type="button"
        aria-haspopup="dialog"
        onClick={handleToggleContact}
        className="bg-primary text-foreground focus-visible:outline-foreground flex cursor-pointer justify-center px-4 pt-2 pb-1 font-sans text-4xl/[0.8em] whitespace-nowrap focus-visible:outline-2 focus-visible:-outline-offset-4 xl:hidden"
      >
        Contact
      </button>
    </div>
  );
}
