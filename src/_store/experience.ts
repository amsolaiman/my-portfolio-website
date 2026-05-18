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
  title: string;
  type: ExperienceType;
  startDate: Date;
  endDate: Date | null;
  isCurrent: boolean;
  employer: string | null;
  employerLink: string | null;
}

// ----------------------------------------------------------------------

const experience: IExperience[] = [
  {
    title: 'BS Information Technology',
    type: 'student',
    startDate: new Date(2017, 7, 21),
    endDate: new Date(2023, 0, 23),
    isCurrent: false,
    employer: 'Mindanao State University',
    employerLink: 'https://www.msumain.edu.ph/',
  },
  {
    title: 'Frontend Developer',
    type: 'internship',
    startDate: new Date(2022, 8, 5),
    endDate: new Date(2022, 10, 28),
    isCurrent: false,
    employer: 'AP Global IT Solutions Inc.',
    employerLink: 'https://www.apgitsolutions.com/',
  },
  {
    title: 'Software Developer',
    type: 'full-time',
    startDate: new Date(2022, 10, 29),
    endDate: new Date(2025, 0, 7),
    isCurrent: false,
    employer: 'AP Global IT Solutions Inc.',
    employerLink: 'https://www.apgitsolutions.com/',
  },
  {
    title: 'Front End Engineer',
    type: 'full-time',
    startDate: new Date(2025, 2, 31),
    endDate: null,
    isCurrent: true,
    employer: 'Access Group Australia Pty Ltd',
    employerLink: 'https://www.accessgroup.net.au/',
  },
];

export default experience;
