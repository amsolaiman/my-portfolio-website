'use client';

import Image from 'next/image';

// contexts
import { useToggleContext } from '@/contexts/use-toggle-context';
import { useGlobalContent } from '@/contexts/use-global-content';
// constants
import { FALLBACK_IMAGE_URL } from '@/constants/content';
// components
import DigitalClock from '@/components/digital-clock';

//
import HomeToggleButtons from './components/home-toggle-buttons';

// ----------------------------------------------------------------------

const COPYRIGHT_TEXT = `©${new Date().getFullYear()} Abdul Moiz Solaiman - moizsolaiman.com`;

export default function HomeFooter() {
  const { portraitImage } = useGlobalContent();

  const { handleToggleContact } = useToggleContext();

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
          <p className="text-foreground/50 text-xs">{COPYRIGHT_TEXT}</p>

          <button
            onClick={handleToggleContact}
            className="text-foreground hover:text-foreground/75 cursor-pointer text-xs"
          >
            Let&apos;s get creative →
          </button>
        </div>
      </div>

      <HomeToggleButtons />

      <p className="[&_span]:text-foreground/50 p-4 text-center font-mono text-xs uppercase xl:hidden">
        <span className="md:hidden">
          Now, <DigitalClock />
          <br />
        </span>

        <span>{COPYRIGHT_TEXT}</span>
      </p>
    </div>
  );
}
