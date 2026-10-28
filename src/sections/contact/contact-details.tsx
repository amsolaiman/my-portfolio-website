'use client';

// components
import { CursorIdentfierEnum } from '@/components/cursor-effect/types';
// constants
import {
  FALLBACK_EMAIL_ADDRESS,
  FALLBACK_RESUME_URL,
  FALLBACK_SOCIAL_LINKS,
} from '@/constants/channel';
// contexts
import { useGlobalContent } from '@/contexts/use-global-content';
import { useWebsiteConfig } from '@/contexts/use-website-config';

//
import ContactWidget from './contact-widget';

// ----------------------------------------------------------------------

export default function ContactDetails() {
  const { email } = useWebsiteConfig();

  const { resume, socialLinks } = useGlobalContent();

  const socials = socialLinks || FALLBACK_SOCIAL_LINKS;

  const resumeUrl = resume || FALLBACK_RESUME_URL;
  const emailAddress = email || FALLBACK_EMAIL_ADDRESS;

  return (
    <section
      aria-labelledby="contact-heading"
      className="flex h-full w-full flex-col justify-between p-4 xl:px-12 xl:py-8"
    >
      <p className="text-xs text-white">/ P.004 / Open Channel</p>

      <div>
        <div className="mb-6 text-sm font-medium text-black xl:mb-10">
          <h2 id="contact-heading" className="inline">
            Let&apos;s talk & build something great together.
          </h2>
          &nbsp;
          <p className="inline">
            Check out my&nbsp;
            <a
              data-hover-cursor={CursorIdentfierEnum.TEXT_BTN}
              className="hover:text-secondary button-focus-effect underline"
              href={resumeUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              resume
            </a>
            .
          </p>
        </div>

        <a
          data-hover-cursor={CursorIdentfierEnum.TEXT_BTN}
          className="hover:text-secondary button-focus-effect cursor-pointer font-sans text-6xl text-white xl:text-7xl"
          href={`mailto:${emailAddress}`}
        >
          <span className="md:hidden">Email Me</span>
          <span className="hidden md:inline">{emailAddress}</span>
        </a>
      </div>

      <div className="flex flex-col-reverse justify-between gap-12 md:flex-row md:items-end">
        <ContactWidget />

        <ul
          role="list"
          aria-label="Social links"
          className="flex flex-col items-end gap-4 xl:flex-row xl:items-center xl:gap-10"
        >
          {socials.map((social) => (
            <li key={social._key}>
              <a
                data-hover-cursor={CursorIdentfierEnum.TEXT_BTN}
                className="hover:border-secondary button-focus-effect cursor-pointer border-b-2 border-transparent text-base text-white hover:text-white/75"
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.label}
                <span aria-hidden> ↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
