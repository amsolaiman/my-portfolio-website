'use client';

// contexts
import { useGlobalContent } from '@/contexts/use-global-content';
import { useToggleButtons } from '@/contexts/use-toggle-buttons';
// constants
import { FALLBACK_SKILL_SET } from '@/constants/content';

// ----------------------------------------------------------------------

export default function HomeServices() {
  const { skills } = useGlobalContent();

  const { handleToggleProject } = useToggleButtons();

  const skillSet = skills || FALLBACK_SKILL_SET;

  return (
    <div className="flex w-full flex-col">
      <p className="text-secondary text-xs">/ P.001 / Skills & Services</p>

      <h1 className="mt-8 font-sans text-6xl xl:text-8xl/[0.9]">
        What
        <br />I offer
      </h1>

      <div className="mt-6 grid grid-cols-1 space-x-20 xl:grid-cols-3">
        <div className="flex w-full flex-col gap-6 xl:col-span-2 xl:max-w-72">
          <p className="text-justify text-xs xl:text-start">
            I design & build digital experiences that communicate brands
            clearly. The focus is simple: fast, reliable & intuitive solutions
            that prioritize clarity over complexity.
          </p>

          <p className="text-foreground/50 text-justify text-xs xl:text-start">
            Interests span modern frontend development, design systems &
            performance-first builds. Turn ideas into well-structured products
            that work seamlessly for both users & the teams maintaining them.
          </p>
        </div>

        <ul className="mt-12 flex flex-col xl:mt-0">
          {skillSet.map((skill, index) => (
            <li
              key={skill + index}
              className="text-foreground border-foreground/20 border-b py-4 text-end text-base first:pt-0"
            >
              {skill}
              <span className="text-primary ml-4">•</span>
            </li>
          ))}

          <button
            onClick={handleToggleProject}
            className="text-foreground hover:text-foreground/75 mt-6 hidden cursor-pointer self-end text-xs xl:block"
          >
            Check out my projects →
          </button>
        </ul>
      </div>
    </div>
  );
}
