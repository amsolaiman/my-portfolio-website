// constants
import { EMAIL_ADDRESS, RESUME_URL, SOCIAL_LINKS } from '@/constants/channel';

//
import ContactWidget from './contact-widget';

// ----------------------------------------------------------------------

export default function ContactDetails() {
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
        <ContactWidget />

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
