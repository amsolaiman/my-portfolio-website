'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import schemas from '@/_sanity/schemas';
import { structure } from '@/_sanity/structure';
import { DEFAULT_WEBSITE_NAME } from '@/constants/meta';
import { PATHS } from '@/constants/paths';

// ----------------------------------------------------------------------

const sanityConfig = defineConfig({
  title: DEFAULT_WEBSITE_NAME,
  basePath: PATHS.studio,
  projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET!,
  plugins: [structureTool({ structure })],
  schema: { types: schemas },
});

export default sanityConfig;
