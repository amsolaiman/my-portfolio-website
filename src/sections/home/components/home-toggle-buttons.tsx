'use client';

// contexts
import { useToggleButtons } from '@/contexts/use-toggle-buttons';

// ----------------------------------------------------------------------

export default function HomeToggleButtons() {
  const { handleToggleProject, handleToggleContact } = useToggleButtons();

  return (
    <div className="flex w-full flex-col xl:hidden">
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={handleToggleProject}
        className="bg-secondary flex cursor-pointer justify-center px-4 pt-2 pb-1 font-sans text-4xl/[0.8em] whitespace-nowrap text-white hover:text-white/75 focus-visible:text-white/75"
      >
        Work
      </button>

      <button
        type="button"
        aria-haspopup="dialog"
        onClick={handleToggleContact}
        className="bg-primary flex cursor-pointer justify-center px-4 pt-2 pb-1 font-sans text-4xl/[0.8em] whitespace-nowrap text-white hover:text-white/75 focus-visible:text-white/75"
      >
        Contact
      </button>
    </div>
  );
}
