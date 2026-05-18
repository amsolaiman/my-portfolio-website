// utils
import { cn } from '@/utils/tw-merge';
// constants
import { DEFAULT_TIMEZONE } from '@/constants/content';
import { EMAIL_ADDRESS, RESUME_URL, SOCIAL_LINKS } from '@/constants/channel';
// components
import DigitalClock from '@/components/digital-clock';

// ----------------------------------------------------------------------

export default function ContactDetails() {
  //#region Business Hours Logic
  const now = new Date();

  const phTime = new Date(
    now.toLocaleString('en-US', { timeZone: DEFAULT_TIMEZONE })
  );
  const day = phTime.getDay();
  const hours = phTime.getHours();

  const BUSINESS_HOURS = day >= 1 && day <= 6 && hours >= 9 && hours < 18;
  //#endregion

  return (
    <div className="flex h-full w-full flex-col justify-between px-12 py-8">
      <p className="text-xs">/ P.004 / Open Channel</p>

      <div>
        <p className="text-background mb-10 text-sm font-medium">
          Let&apos;s talk & build something great together. Check out my&nbsp;
          <a
            className="hover:text-secondary underline"
            href={RESUME_URL}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            resume
          </a>
          .
        </p>

        <a
          className="hover:text-secondary cursor-pointer font-sans text-7xl"
          href={`mailto:${EMAIL_ADDRESS}`}
        >
          {EMAIL_ADDRESS}
        </a>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm">
            <span
              className={cn(
                BUSINESS_HOURS ? 'text-foreground' : 'text-foreground/75'
              )}
            >
              ({BUSINESS_HOURS ? 'Online' : 'Offline'})&nbsp;
            </span>
            Now, <DigitalClock />
          </p>

          <p className="text-foreground/75 text-xs">
            Mon-Sat, 9:00 AM-6:00 PM
            <br />
            Based in Marawi, Philippines
          </p>
        </div>

        <div className="flex items-center gap-10">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              className="text-foreground/75 hover:border-secondary cursor-pointer border-b-2 border-transparent text-base"
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.label} ↗
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
