import { ChannelSocialLinkType } from '@/types/constant';

// ----------------------------------------------------------------------

export const FALLBACK_RESUME_URL = process.env.NEXT_PUBLIC_DEFAULT_RESUME_URL;

export const FALLBACK_EMAIL_ADDRESS =
  process.env.NEXT_PUBLIC_DEFAULT_EMAIL_ADDRESS;

export const FALLBACK_SOCIAL_LINKS: ChannelSocialLinkType[] = [
  {
    _key: 'github-link',
    label: 'GitHub',
    link: process.env.NEXT_PUBLIC_DEFAULT_SOCIAL_LINK_GITHUB!,
  },
  {
    _key: 'linkedin-link',
    label: 'LinkedIn',
    link: process.env.NEXT_PUBLIC_DEFAULT_SOCIAL_LINK_LINKEDIN!,
  },
];

export const FALLBACK_BUSINESS_DAYS = {
  START: 1, // Monday
  END: 5, // Friday
};

export const FALLBACK_BUSINESS_HOURS = {
  START: 8, // 8 AM
  END: 17, // 5 PM
};
