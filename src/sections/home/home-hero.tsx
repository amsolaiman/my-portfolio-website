import Image from 'next/image';

// components
import DigitalClock from '@/components/digital-clock';

// ----------------------------------------------------------------------

const PROFESSIONS = [
  'Frontend Developer',
  'UI/UX Designer',
  'Graphic Designer',
];

export default function HomeHero() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-start justify-between px-12 py-6">
      <div className="flex w-full flex-col">
        <div className="relative aspect-2/1 w-3/4 overflow-hidden">
          <Image
            src="/assets/banner.svg"
            alt="Name Banner"
            fill
            priority
            draggable={false}
            className="object-contain object-bottom-left"
          />
        </div>

        <div className="z-1 flex w-3/4 justify-end">
          <div className="-mt-2 flex flex-wrap gap-4">
            {PROFESSIONS.map((profession, index) => (
              <p key={index} className="text-sm [&_span]:mr-4">
                <span>/</span>
                {profession}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="border-primary flex w-full items-center justify-between border-t-2 pt-2">
        <p className="text-xs">
          Now, <DigitalClock />
        </p>

        <p className="text-foreground/50 text-xs">↓ Scroll to tune in</p>
      </div>
    </div>
  );
}
