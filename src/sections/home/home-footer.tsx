'use client';

import Image from 'next/image';

// contexts
import { useToggleContext } from '@/contexts/use-toggle-context';
import { useGlobalContent } from '@/contexts/use-global-content';
// constants
import { FALLBACK_IMAGE_URL } from '@/constants/content';

// ----------------------------------------------------------------------

export default function HomeFooter() {
  const { portraitImage } = useGlobalContent();

  const { handleToggleContact } = useToggleContext();

  return (
    <div className="relative mt-24 flex min-h-screen w-full shrink-0 flex-col items-center justify-center">
      <div className="flex w-full max-w-80 flex-col items-end">
        <p className="text-foreground/50 [&_span]:text-secondary text-xs whitespace-nowrap">
          <span>/ Motivation</span> / Game of Thrones S04 EP06, Min 28:23-28:35
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

      <div className="absolute bottom-8 flex w-full items-center justify-between px-12">
        <p className="text-foreground/50 text-xs">
          ©{new Date().getFullYear()} Abdul Moiz Solaiman - moizsolaiman.com
        </p>

        <button
          onClick={handleToggleContact}
          className="text-foreground hover:text-foreground/75 cursor-pointer text-xs"
        >
          Let&apos;s get creative →
        </button>
      </div>
    </div>
  );
}
