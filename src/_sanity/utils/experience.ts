// types
import { IExperience } from '@/types/data';

//
import { client } from '../client';

// ----------------------------------------------------------------------

export async function getExperienceData(): Promise<IExperience[]> {
  const query = `*[_type == "experience"] | order(startDate desc) {
    _id,
    title,
    type,
    isCurrent,
    startDate,
    endDate,
    employer {
      name,
      link
    }
  }`;

  const data = await client.fetch(query);

  return data.map((item: IExperience) => ({
    ...item,
    startDate: new Date(item.startDate),
    endDate: item.endDate ? new Date(item.endDate) : null,
  }));
}
