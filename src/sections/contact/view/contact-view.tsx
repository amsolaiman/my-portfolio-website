'use client';

// contexts
import { useToggleContext } from '@/contexts/use-toggle-context';
// utils
import { cn } from '@/utils/tw-merge';
// hooks
import { useBreakpoint } from '@/hooks/use-breakpoint';

// sections
import ContactDetails from '../contact-details';

// ----------------------------------------------------------------------

export default function ContactView() {
  const upXl = useBreakpoint('up', 'xl');

  const { openContact, handleToggleContact } = useToggleContext();

  if (!upXl) {
    return null;
  }

  return (
    <section
      className={cn(
        'bg-primary absolute inset-y-0 right-0 z-20 flex w-screen transition-transform duration-500 ease-in-out',
        openContact ? 'translate-x-16' : 'translate-x-[calc(100vw-64px)]'
      )}
    >
      <button
        onClick={handleToggleContact}
        className="text-foreground/75 hover:text-foreground flex h-full w-16 cursor-pointer items-end justify-start transition-colors duration-300"
      >
        <p className="-mb-8 origin-top-left -rotate-90 pt-4 font-sans text-6xl whitespace-nowrap">
          Contact
        </p>
      </button>

      <div className="mr-16 w-full">
        <ContactDetails />
      </div>
    </section>
  );
}
