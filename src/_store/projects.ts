// ----------------------------------------------------------------------

export interface IProject {
  name: string;
  posterImage: string;
  align: 'top' | 'center' | 'bottom';
}

// ----------------------------------------------------------------------

const project: IProject[] = [
  {
    name: 'mBALING App',
    posterImage: '/assets/portfolio/placeholder-1.png',
    align: 'top',
  },
  {
    name: 'mBALING Admin',
    posterImage: '/assets/portfolio/placeholder-2.png',
    align: 'bottom',
  },
  {
    name: 'Global Talent Placements',
    posterImage: '/assets/portfolio/placeholder-3.png',
    align: 'center',
  },
];

export default project;
