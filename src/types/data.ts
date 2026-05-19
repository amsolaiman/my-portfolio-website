import { ChannelSocialLinkType } from './constant';

// ----------------------------------------------------------------------

export interface IContent {
  _id: string;
  title: string;
  description: string;
  email: string;
  resume: string;
  socialLink: ChannelSocialLinkType[];
  businessDays?: {
    start: number;
    end: number;
  };
  businessHours?: {
    start: number;
    end: number;
  };
  skills: string[];
  portraitImage: {
    src: string;
    alt: string;
  };
  city: string;
  country: string;
}
