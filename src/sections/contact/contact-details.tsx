'use client';

// contexts
import { useGlobalContent } from '@/contexts/use-global-content';
// hooks
import { useBreakpoint } from '@/hooks/use-breakpoint';
// constants
import {
  FALLBACK_EMAIL_ADDRESS,
  FALLBACK_RESUME_URL,
  FALLBACK_SOCIAL_LINKS,
} from '@/constants/channel';
// components
import { CursorIdentfierEnum } from '@/components/cursor-effect/types';

//
import ContactWidget from './contact-widget';

// ----------------------------------------------------------------------

export default function ContactDetails() {
  const upMd = useBreakpoint('up', 'md');

  const { email, resume, socialLink } = useGlobalContent();

  const socialLinks = !!socialLink.length ? socialLink : FALLBACK_SOCIAL_LINKS;

  const resumeUrl = resume || FALLBACK_RESUME_URL;
  const emailAddress = email || FALLBACK_EMAIL_ADDRESS;

  return (
    <div className="flex h-full w-full flex-col justify-between p-4 xl:px-12 xl:py-8">
      <p className="text-xs">/ P.004 / Open Channel</p>

      <div>
        <p className="text-background mb-6 text-sm font-medium xl:mb-10">
          Let&apos;s talk & build something great together. Check out my&nbsp;
          <a
            data-hover-cursor={CursorIdentfierEnum.TEXT_BTN}
            className="hover:text-secondary underline"
            href={resumeUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            resume
          </a>
          .
        </p>

        <a
          data-hover-cursor={CursorIdentfierEnum.TEXT_BTN}
          className="hover:text-secondary cursor-pointer font-sans text-6xl xl:text-7xl"
          href={`mailto:${emailAddress}`}
        >
          {upMd ? emailAddress : 'Email Me'}
        </a>
      </div>

      <div className="flex flex-col-reverse justify-between gap-12 md:flex-row md:items-end">
        <ContactWidget />

        <div className="flex flex-col items-end gap-4 xl:flex-row xl:items-center xl:gap-10">
          {socialLinks.map((social) => (
            <a
              data-hover-cursor={CursorIdentfierEnum.TEXT_BTN}
              key={social.label}
              className="text-foreground hover:text-foreground/75 hover:border-secondary cursor-pointer border-b-2 border-transparent text-base"
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
