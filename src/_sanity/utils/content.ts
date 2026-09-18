// types
import { IContent } from '@/types/data';

//
import { client } from '../client';

// ----------------------------------------------------------------------

/**
 * Fetch the global content document from Sanity.
 *
 * @returns The singleton `IContent` object containing site-wide data.
 */
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
    copyright,
    llmsTxt
  }`;

  const data = await client.fetch(query);

  return data;
}
