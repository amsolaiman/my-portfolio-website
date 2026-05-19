'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import schemas from '@/_sanity/schemas';
import { structure } from '@/_sanity/structure';

const sanityConfig = defineConfig({
  title: 'jasafanar portfolio',
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET!,
  plugins: [structureTool({ structure })],
  schema: { types: schemas },
});

export default sanityConfig;
