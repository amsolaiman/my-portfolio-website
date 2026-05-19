// ----------------------------------------------------------------------

export interface IContent {
  _id: string;
  title: string;
  description: string;
  email: string;
  resume: string;
  socialLink: {
    _key: string;
    label: string;
    link: string;
  }[];
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
}
