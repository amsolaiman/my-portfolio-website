// types
import { IGlobalContent } from '@/types/data';

//
import { client } from '../client';

// ----------------------------------------------------------------------

/**
 * Fetch the global content document from Sanity.
 *
 * @returns The singleton `IGlobalContent` object containing
 *          site-wide content data.
 */
export async function getGlobalContentData(): Promise<IGlobalContent> {
  const query = `*[_id == "global-content"][0]{
    _id,
    title,
    description,
    email,
    "resume": resume.asset->url,
    socialLinks[] {
      _key,
      label,
      link
    },
    skills,
    "portraitImage": {
      "src": portraitImage.asset->url,
      "alt": portraitImage.alt
    },
    copyright
  }`;

  const data = await client.fetch(query);

  return data;
}
