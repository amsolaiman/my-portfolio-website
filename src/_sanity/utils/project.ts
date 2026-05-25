// types
import { IProject } from '@/types/data';

//
import { client } from '../client';

// ----------------------------------------------------------------------

/**
 * Fetch all project entries from Sanity.
 *
 * @returns An array of `IProject` objects with poster/banner images and
 *          gallery images resolved to their URLs, and `date` parsed as a
 *          `Date` instance (or `null` if not set).
 */
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
    images[] {
      _key,
      "src": asset->url,
      "alt": alt
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
