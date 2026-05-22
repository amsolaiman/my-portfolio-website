import { ChannelSocialLinkType } from './constant';

// ----------------------------------------------------------------------

type ImageType = {
  src: string;
  alt?: string;
};

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

export interface IGroupedExperience {
  group: string;
  items: IExperience[];
}

// ----------------------------------------------------------------------

export interface IProject {
  _id: string;
  name: string;
  description: string;
  client?: string;
  type: string;
  techStack: string[];
  isOngoing: boolean;
  date?: Date | null;
  posterImage: ImageType;
  bannerImage: ImageType;
  images: Array<ImageType & { _key: string }>;
  previewUrl?: {
    link: string;
    type: string;
  };
  designUrl?: string;
  align: 'start' | 'center' | 'end';
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
  portraitImage: ImageType;
  city: string;
  country: string;
}
