'use client';

// components
import { CursorIdentfierEnum } from '@/components/cursor-effect/types';
import DigitalClock from '@/components/digital-clock';
import Image from '@/components/image';
// constants
import {
  FALLBACK_COPYRIGHT_TEXT,
  FALLBACK_IMAGE_URL,
} from '@/constants/content';
import { PATHS } from '@/constants/paths';
// contexts
import { useGlobalContent } from '@/contexts/use-global-content';
import { useToggleButtons } from '@/contexts/use-toggle-buttons';
// hooks
import { useRapidClick } from '@/hooks/use-rapid-click';

//
import HomeToggleButtons from './components/home-toggle-buttons';

// ----------------------------------------------------------------------

export default function HomeFooter() {
  const { portraitImage, copyright } = useGlobalContent();

  const { handleToggleContact } = useToggleButtons();

  const handleClick = useRapidClick(PATHS.studio.root);

  const copyrightText = `©${new Date().getFullYear()} ${copyright || FALLBACK_COPYRIGHT_TEXT}`;

  return (
    <div className="mt-32 flex w-full flex-col xl:mt-24 xl:min-h-screen">
      <div className="relative flex flex-1 flex-col items-center justify-center px-4 xl:px-12">
        <div className="flex w-full max-w-80 flex-col items-end">
          <p className="[&_span]:text-secondary hidden text-xs whitespace-nowrap text-gray-400 xl:block">
            <span>/ Motivation</span> / Game of Thrones S04 EP06, Min
            28:23-28:35
          </p>

          <div className="relative aspect-3/4 w-full overflow-hidden xl:mt-2">
            <Image
              src={portraitImage?.src || FALLBACK_IMAGE_URL}
              alt={portraitImage?.alt || ''}
              fill
              loading="lazy"
              draggable={false}
              className="object-contain object-center"
            />
          </div>
        </div>

        <div className="absolute bottom-8 hidden w-full items-center justify-between px-12 xl:flex">
          <small onClick={handleClick} className="text-xs text-gray-400">
            {copyrightText}
          </small>

          <button
            type="button"
            data-hover-cursor={CursorIdentfierEnum.TEXT_BTN}
            onClick={handleToggleContact}
            className="button-focus-effect cursor-pointer text-xs text-white hover:text-white/75"
          >
            Let&apos;s get creative →
          </button>
        </div>
      </div>

      <HomeToggleButtons />

      <div className="p-4 text-center text-xs xl:hidden">
        <p className="text-white md:hidden">
          Now, <DigitalClock />
          <br />
        </p>

        <small onClick={handleClick} className="text-xs text-gray-400">
          {copyrightText}
        </small>
      </div>
    </div>
  );
}
