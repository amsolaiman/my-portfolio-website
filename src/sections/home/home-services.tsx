'use client';

// components
import { CursorIdentfierEnum } from '@/components/cursor-effect/types';
// constants
import { FALLBACK_SKILL_SET } from '@/constants/content';
// contexts
import { useGlobalContent } from '@/contexts/use-global-content';
import { useToggleButtons } from '@/contexts/use-toggle-buttons';

// ----------------------------------------------------------------------

export default function HomeServices() {
  const { skills } = useGlobalContent();

  const { handleToggleProject } = useToggleButtons();

  const skillSet = skills || FALLBACK_SKILL_SET;

  return (
    <section
      aria-labelledby="services-heading"
      className="flex w-full flex-col"
    >
      <p className="text-secondary text-xs">/ P.001 / Skills & Services</p>

      <h2
        id="services-heading"
        className="mt-8 font-sans text-6xl text-white xl:text-8xl/[0.9]"
      >
        What
        <br />I offer
      </h2>

      <div className="mt-6 grid grid-cols-1 space-x-20 xl:grid-cols-3">
        <div className="flex w-full flex-col gap-6 xl:col-span-2 xl:max-w-72">
          <p className="text-justify text-xs text-white xl:text-start">
            I design & build digital experiences that communicate brands
            clearly. The focus is simple: fast, reliable & intuitive solutions
            that prioritize clarity over complexity.
          </p>

          <p className="text-justify text-xs text-gray-400 xl:text-start">
            Interests span modern frontend development, design systems &
            performance-first builds. Turn ideas into well-structured products
            that work seamlessly for both users & the teams maintaining them.
          </p>
        </div>

        <div className="mt-12 flex flex-col xl:mt-0">
          <ul role="list" aria-label="Skills">
            {skillSet.map((skill, index) => (
              <li
                key={skill + index}
                className="border-b border-gray-700 py-4 text-end text-base text-white first:pt-0"
              >
                {skill}
                <span aria-hidden className="text-primary ml-4">
                  •
                </span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            data-hover-cursor={CursorIdentfierEnum.TEXT_BTN}
            onClick={handleToggleProject}
            className="button-focus-effect mt-6 hidden cursor-pointer self-end text-xs text-white hover:text-white/75 xl:block"
          >
            Check out my projects →
          </button>
        </div>
      </div>
    </section>
  );
}
