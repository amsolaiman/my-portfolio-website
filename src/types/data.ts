import { PortableTextBlock } from '@portabletext/react';

//
import { ChannelSocialLinkType } from './constant';

// ----------------------------------------------------------------------

type ImageType = {
  src: string;
  alt?: string;
};

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
  copyright: string;
}
