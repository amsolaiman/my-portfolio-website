// constants
import { SKILL_SET } from '@/constants/content';

// ----------------------------------------------------------------------

export default function HomeSkills() {
  return (
    <div className="w-full">
      <p className="text-secondary text-xs">/ P.001 / Skills</p>

      <h1 className="mt-8 font-sans text-8xl/[0.9]">
        What
        <br />
        I&apos;ve used
      </h1>

      <ul className="divide-foreground/20 border-foreground/20 mt-6 divide-y border-b">
        {Object.entries(SKILL_SET).map(([category, skills]) => (
          <li key={category} className="flex gap-6 p-4">
            <span className="text-primary text-sm">●</span>

            <div>
              <h4 className="text-primary text-xs">{category}</h4>

              <p className="mt-2 text-sm">
                {skills.map((skill) => skill).join(' • ')}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
