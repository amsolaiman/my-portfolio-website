'use client';

import { useEffect } from 'react';

// components
import { CursorIdentfierEnum } from '@/components/cursor-effect/types';
// contexts
import { useToggleButtons } from '@/contexts/use-toggle-buttons';
// hooks
import { useBreakpoint } from '@/hooks/use-breakpoint';
// utils
import { cn } from '@/utils/tw-merge';

//
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

  const handleClose = upXl ? handleToggleContact : handleToggleMobile;

  useEffect(() => {
    if (!openContact) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [openContact, handleClose]);

  if (!upXl) {
    return (
      <div
        id="contact-panel"
        key="contact-view-mobile"
        inert={!openContact}
        className={cn(
          'bg-primary absolute inset-0 z-20 flex w-screen flex-col overflow-hidden transition-transform duration-500 ease-in-out',
          openContact ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <button
          onClick={handleToggleMobile}
          className="bg-primary sticky top-0 w-full p-2 text-start text-sm"
        >
          <span aria-hidden>↓ </span>Close
        </button>

        <div className="h-full w-full">
          <ContactDetails />
        </div>
      </div>
    );
  }

  return (
    <div
      key="contact-view-desktop"
      className={cn(
        'bg-primary absolute inset-y-0 right-0 z-20 flex w-screen transition-transform duration-500 ease-in-out',
        openContact ? 'translate-x-16' : 'translate-x-[calc(100vw-64px)]'
      )}
    >
      <button
        type="button"
        aria-expanded={openContact}
        aria-controls="contact-panel"
        data-hover-cursor={CursorIdentfierEnum.CONTACT_BTN}
        onClick={handleToggleContact}
        className="text-foreground/75 hover:text-foreground flex h-full w-16 cursor-pointer items-end justify-start"
      >
        <span className="-mb-8 origin-top-left -rotate-90 pt-4 font-sans text-6xl whitespace-nowrap">
          Contact
        </span>
      </button>

      <div id="contact-panel" inert={!openContact} className="mr-16 w-full">
        <ContactDetails />
      </div>
    </div>
  );
}
