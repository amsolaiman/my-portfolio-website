import { NextStudio } from 'next-sanity/studio';
import type { Metadata } from 'next';
import { metadata as studioMetadata } from 'next-sanity/studio';

import config from '../../../../sanity.config';

// ----------------------------------------------------------------------

export const dynamic = 'force-static';

export { viewport } from 'next-sanity/studio';

export const metadata: Metadata = {
  ...studioMetadata,
  title: 'Studio — jasafanar portfolio',
};

export default function StudioPage() {
  return <NextStudio config={config} />;
}
