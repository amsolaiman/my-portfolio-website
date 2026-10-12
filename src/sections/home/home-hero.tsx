import Image from 'next/image';

// components
import DigitalClock from '@/components/digital-clock';

//
import HomeToggleButtons from './components/home-toggle-buttons';

// ----------------------------------------------------------------------

const PROFESSIONS = [
  'Frontend Developer',
  'UI/UX Designer',
  'Graphic Designer',
];

export default function HomeHero() {
  return (
    <div className="flex min-h-svh w-full flex-col xl:min-h-screen">
      <div className="flex flex-1 flex-col items-start justify-between p-4 xl:px-12 xl:py-6">
        <div className="relative flex w-full flex-col">
          <h1 className="relative aspect-2/1 w-full overflow-hidden xl:w-3/4">
            <span className="sr-only">Abdul Moiz Solaiman</span>
            <Image
              src="/assets/banner.svg"
              alt=""
              aria-hidden
              fill
              priority
              draggable={false}
              className="object-contain object-bottom-left"
            />
          </h1>

          <div className="z-1 flex w-full justify-end xl:w-3/4">
            <ul className="-mt-1 flex flex-col flex-wrap items-end gap-2 md:-mt-2 xl:flex-row xl:items-center xl:gap-4">
              {PROFESSIONS.map((profession, index) => (
                <li key={index} className="text-sm text-white">
                  <span aria-hidden className="mr-2 xl:mr-4">
                    /
                  </span>
                  {profession}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-primary flex w-full items-center justify-center pt-12 md:justify-between xl:border-t-2 xl:pt-2">
          <p className="hidden text-xs text-white md:block">
            Now, <DigitalClock />
          </p>

          <p className="text-xs text-gray-400">↓ Scroll to tune in</p>
        </div>
      </div>

      <HomeToggleButtons />
    </div>
  );
}
