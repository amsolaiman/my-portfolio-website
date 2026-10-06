import { PortableTextBlock } from '@portabletext/react';

//
import { ChannelSocialLinkType } from './constant';

// ----------------------------------------------------------------------

type ImageType = {
  src: string;
  alt?: string;
};

// ----------------------------------------------------------------------

export interface IWebsiteConfig {
  _id: string;
  author: string;
  logo: string;
  businessDays?: {
    start: number;
    end: number;
  };
  businessHours?: {
    start: number;
    end: number;
  };
  city: string;
  country: string;
  llmsTxt?: string;
}

// ----------------------------------------------------------------------

export interface IGlobalContent {
  _id: string;
  title: string;
  description: string;
  email: string;
  resume: string;
  socialLinks: ChannelSocialLinkType[];
  skills: string[];
  portraitImage: ImageType;
  copyright: string;
}

// ----------------------------------------------------------------------

export enum ExperienceTypeEnum {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  SELF_EMPLOYED = 'self-employed',
  FREELANCE = 'freelance',
  CONTRACT = 'contract',
  INTERNSHIP = 'internship',
  APPRENTICESHIP = 'apprenticeship',
  SEASONAL = 'seasonal',
  STUDENT = 'student',
}

export interface IExperience {
  _id: string;
  title: string;
  type: ExperienceTypeEnum;
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
  description: PortableTextBlock[];
  client?: string;
  type: string;
  techStack: string[];
  isOngoing: boolean;
  startDate: Date;
  endDate?: Date | null;
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
