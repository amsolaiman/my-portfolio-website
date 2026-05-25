'use client';

import Image from 'next/image';

// contexts
import { useGlobalContent } from '@/contexts/use-global-content';
import { useToggleButtons } from '@/contexts/use-toggle-buttons';
// constants
import { FALLBACK_IMAGE_URL } from '@/constants/content';
import { FALLBACK_COPYRIGHT_TEXT } from '@/constants/meta';
// components
import DigitalClock from '@/components/digital-clock';
import { CursorIdentfierEnum } from '@/components/cursor-effect/types';

//
import HomeToggleButtons from './components/home-toggle-buttons';

// ----------------------------------------------------------------------

export default function HomeFooter() {
  const { portraitImage, copyright } = useGlobalContent();

  const { handleToggleContact } = useToggleButtons();

  const copyrightText = `©${new Date().getFullYear()} ${copyright || FALLBACK_COPYRIGHT_TEXT}`;

  return (
    <div className="mt-32 flex w-full flex-col xl:mt-24 xl:min-h-screen">
      <div className="relative flex flex-1 flex-col items-center justify-center">
        <div className="flex w-full max-w-80 flex-col items-end">
          <p className="text-foreground/50 [&_span]:text-secondary hidden text-xs whitespace-nowrap xl:block">
            <span>/ Motivation</span> / Game of Thrones S04 EP06, Min
            28:23-28:35
          </p>

          <div className="relative mt-2 aspect-3/4 w-full overflow-hidden">
            <Image
              src={portraitImage.src || FALLBACK_IMAGE_URL}
              alt={portraitImage.alt || ''}
              fill
              priority
              draggable={false}
              className="object-contain object-center"
            />
          </div>
        </div>

        <div className="absolute bottom-8 hidden w-full items-center justify-between px-12 xl:flex">
          <p className="text-foreground/50 text-xs">{copyrightText}</p>

          <button
            data-hover-cursor={CursorIdentfierEnum.TEXT_BTN}
            onClick={handleToggleContact}
            className="text-foreground hover:text-foreground/75 cursor-pointer text-xs"
          >
            Let&apos;s get creative →
          </button>
        </div>
      </div>

      <HomeToggleButtons />

      <p className="p-4 text-center text-xs xl:hidden">
        <span className="text-foreground md:hidden">
          Now, <DigitalClock />
          <br />
        </span>

        <span className="text-foreground/50">{copyrightText}</span>
      </p>
    </div>
  );
}
