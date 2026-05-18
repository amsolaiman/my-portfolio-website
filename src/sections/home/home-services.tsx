// contexts
import { useToggleContext } from '@/contexts/use-toggle-context';
// constants
import { SKILL_SET } from '@/constants/content';

// ----------------------------------------------------------------------

export default function HomeServices() {
  const { handleToggleProject } = useToggleContext();

  return (
    <div className="flex w-full flex-col">
      <p className="text-secondary text-xs">/ P.001 / Skills & Services</p>

      <h1 className="mt-8 font-sans text-8xl/[0.9]">
        What
        <br />I offer
      </h1>

      <div className="mt-6 grid grid-cols-3 space-x-20">
        <div className="col-span-2 flex max-w-72 flex-col gap-6">
          <p className="text-xs">
            I design & build digital experiences that communicate brands
            clearly. The focus is simple: fast, reliable & intuitive solutions
            that prioritize clarity over complexity.
          </p>

          <p className="text-foreground/50 text-xs">
            Interests span modern frontend development, design systems &
            performance-first builds. Turn ideas into well-structured products
            that work seamlessly for both users & the teams maintaining them.
          </p>
        </div>

        <ul>
          {SKILL_SET.map((skill, index) => (
            <li
              key={skill + index}
              className="text-foreground border-foreground/20 border-b py-4 text-end text-base first:pt-0"
            >
              {skill}
              <span className="text-primary ml-4">•</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleToggleProject}
        className="text-foreground hover:text-foreground/75 mt-6 cursor-pointer self-end text-end text-xs"
      >
        Check out my projects →
      </button>
    </div>
  );
}
