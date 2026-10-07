import { NextStudio } from 'next-sanity/studio';
import type { Metadata } from 'next';
import { metadata as studioMetadata } from 'next-sanity/studio';

// constants
import { DEFAULT_WEBSITE_NAME } from '@/constants/meta';

import config from '../../../../sanity.config';

// ----------------------------------------------------------------------

export const dynamic = 'force-static';

export { viewport } from 'next-sanity/studio';

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...studioMetadata,
    title: `Studio | ${DEFAULT_WEBSITE_NAME}`,
  };
}

export default function StudioPage() {
  return <NextStudio config={config} />;
}
