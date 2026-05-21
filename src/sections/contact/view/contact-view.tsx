'use client';

// contexts
import { useToggleButtons } from '@/contexts/use-toggle-buttons';
// utils
import { cn } from '@/utils/tw-merge';
// hooks
import { useBreakpoint } from '@/hooks/use-breakpoint';

// sections
import ContactDetails from '../contact-details';

// ----------------------------------------------------------------------

export default function ContactView() {
  const upXl = useBreakpoint('up', 'xl');

  const { openContact, handleToggleContact, setOpenProject } =
    useToggleButtons();

  const handleToggleMobile = () => {
    handleToggleContact();
    setOpenProject(false);
  };

  if (!upXl) {
    return (
      <section
        key="contact-view-mobile"
        className={cn(
          'bg-primary absolute inset-0 z-20 flex w-screen flex-col overflow-hidden transition-transform duration-500 ease-in-out',
          openContact ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <button
          onClick={handleToggleMobile}
          className="bg-primary sticky top-0 w-full p-2 text-start text-sm"
        >
          ↓ Close
        </button>

        <div className="h-full w-full">
          <ContactDetails />
        </div>
      </section>
    );
  }

  return (
    <section
      key="contact-view-desktop"
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
