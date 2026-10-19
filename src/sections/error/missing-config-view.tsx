'use client';

import { useState } from 'react';

// constants
import { PATHS } from '@/constants/paths';
// hooks
import { useRapidClick } from '@/hooks/use-rapid-click';
// utils
import { NotifyResult, sendEmailjsNotification } from '@/utils/emailjs';

// ----------------------------------------------------------------------

export default function MissingConfigView() {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = useRapidClick(PATHS.studio.root);

  const handleNotify = async () => {
    if (isDisabled) return;

    setIsDisabled(true);
    const result = await sendEmailjsNotification();

    if (result === NotifyResult.SENT) {
      alert('Notification has been sent.');
      return;
    }
    if (result === NotifyResult.THROTTLED) {
      alert('Notification has been sent.');
      return;
    }

    alert('Something went wrong.');
    setIsDisabled(false);
  };

  return (
    <main className="bg-neutral flex h-svh w-full flex-col gap-4 px-4 py-8 xl:h-screen xl:px-12">
      <div
        aria-hidden
        onClick={handleClick}
        className="flex flex-1 items-end justify-center xl:justify-start"
      >
        <div className="bg-primary aspect-square h-16 xl:h-20" />
        <div className="bg-secondary aspect-square h-16 xl:h-20" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-between xl:flex-row xl:items-start">
        <h1 className="font-norma text-center text-xs text-white">
          Oops! The site is not properly configured.
        </h1>

        <button
          type="button"
          onClick={handleNotify}
          disabled={isDisabled}
          className="cursor-pointer text-xs text-white hover:text-white/75 focus-visible:text-white/75 disabled:cursor-default disabled:text-gray-400"
        >
          Ping me here <span aria-hidden>↗</span>
        </button>
      </div>
    </main>
  );
}
