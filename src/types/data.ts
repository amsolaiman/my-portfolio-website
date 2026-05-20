import { ChannelSocialLinkType } from './constant';

// ----------------------------------------------------------------------

type ExperienceType =
  | 'full-time'
  | 'part-time'
  | 'self-employed'
  | 'freelance'
  | 'contract'
  | 'internship'
  | 'apprenticeship'
  | 'seasonal'
  | 'student';

export interface IExperience {
  _id: string;
  title: string;
  type: ExperienceType;
  isCurrent: boolean;
  startDate: Date;
  endDate?: Date | null;
  employer: {
    name: string;
    link?: string;
  };
}

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
    alt?: string;
  };
  city: string;
  country: string;
}
