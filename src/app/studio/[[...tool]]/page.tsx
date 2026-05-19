import { NextStudio } from 'next-sanity/studio';
import type { Metadata } from 'next';
import { metadata as studioMetadata } from 'next-sanity/studio';

// utils
import { getGlobalContentData } from '@/_sanity/utils/content';
// constants
import { FALLBACK_METADATA_TITLE } from '@/constants/meta';

import config from '../../../../sanity.config';

// ----------------------------------------------------------------------

export const dynamic = 'force-static';

export { viewport } from 'next-sanity/studio';

export async function generateMetadata(): Promise<Metadata> {
  const globalContent = await getGlobalContentData();

  return {
    ...studioMetadata,
    title: `Studio | ${globalContent.title || FALLBACK_METADATA_TITLE}`,
  };
}

export default function StudioPage() {
  return <NextStudio config={config} />;
}
