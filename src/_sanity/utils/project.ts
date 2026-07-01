// types
import { IProject } from '@/types/data';

//
import { client } from '../client';

// ----------------------------------------------------------------------

/**
 * Fetch all project entries from Sanity.
 *
 * @returns An array of `IProject` objects.
 *          - Poster/banner images and gallery images resolved to their URLs.
 *          - Date parsed as a `Date` instance (or `null` if not set).
 */
export async function getProjectData(): Promise<IProject[]> {
  const query = `*[_type == "project"] | order(startDate asc) {
    _id,
    name,
    description,
    client,
    type,
    techStack,
    isOngoing,
    startDate,
    endDate,
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

  const data = (await client.fetch(query)) as IProject[];

  return data.map((item) => ({
    ...item,
    startDate: new Date(item.startDate),
    endDate: item.endDate ? new Date(item.endDate) : null,
  }));
}
