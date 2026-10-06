// types
import { IWebsiteConfig } from '@/types/data';

//
import { client } from '../client';

// ----------------------------------------------------------------------

/**
 * Fetch the website config document from Sanity.
 *
 * @returns The singleton `IWebsiteConfig` object containing
 *          site-wide configuration data.
 */
export async function getWebsiteConfigData(): Promise<IWebsiteConfig | null> {
  const query = `*[_id == "website-config"][0]{
    _id,
    author,
    "logo": logo.asset->url,
    businessDays,
    businessHours,
    city,
    country,
    llmsTxt
  }`;

  const data = await client.fetch(query);

  return data;
}
