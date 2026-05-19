import { ChannelSocialLinkType } from '@/types/constant';

// ----------------------------------------------------------------------

export const RESUME_URL =
  'https://raw.githubusercontent.com/amsolaiman/amsolaiman/main/assets/resume.pdf';

export const EMAIL_ADDRESS = 'abdulmoiz.solaiman@outlook.com';

export const SOCIAL_LINKS: ChannelSocialLinkType[] = [
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/',
  },
  {
    label: 'GitHub',
    link: 'https://github.com/',
  },
  {
    label: 'Telegram',
    link: 'https://telegram.org/',
  },
];

export const BUSINESS_DAYS = {
  START: 1, // Monday
  END: 5, // Friday
};

export const BUSINESS_HOURS = {
  START: 8, // 8 AM
  END: 17, // 5 PM
};
