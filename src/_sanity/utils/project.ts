// types
import { IProject } from '@/types/data';

//
import { client } from '../client';

// ----------------------------------------------------------------------

export async function getProjectData(): Promise<IProject[]> {
  const query = `*[_type == "project"] {
    _id,
    name,
    description,
    client,
    type,
    techStack,
    isOngoing,
    date,
    "posterImage": {
      "src": posterImage.asset->url,
      "alt": posterImage.alt
    },
    "bannerImage": {
      "src": bannerImage.asset->url,
      "alt": bannerImage.alt
    },
    previewUrl {
      link,
      type
    },
    designUrl,
    align
  }`;

  const data = await client.fetch(query);

  return data.map((item: IProject) => ({
    ...item,
    date: item.date ? new Date(item.date) : null,
  }));
}
