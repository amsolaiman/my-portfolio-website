// types
import { IContent } from '@/types/data';

//
import { client } from '../client';

// ----------------------------------------------------------------------

export async function getGlobalContentData(): Promise<IContent> {
  const query = `*[_id == "global-content"][0]{
    _id,
    title,
    description,
    email,
    "resume": resume.asset->url,
    socialLink[] {
      _key,
      label,
      link
    },
    businessDays,
    businessHours,
    skills,
    "portraitImage": {
      "src": portraitImage.asset->url,
      "alt": portraitImage.alt
    },
    city,
    country,
    copyright
  }`;

  const data = await client.fetch(query);

  return data;
}
