/* eslint-disable no-console */

import { NextResponse } from 'next/server';

// @sanity
import { getWebsiteConfigData } from '@/_sanity/utils/website';

export async function GET() {
  try {
    const websiteConfig = await getWebsiteConfigData();

    if (!websiteConfig) {
      console.error('Website config not found');
      return new NextResponse('Not found', {
        status: 404,
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    const llmFileContent = websiteConfig?.llmsTxt;

    if (!llmFileContent) {
      console.error('llms.txt content not found in website config');
      return new NextResponse('Not found', {
        status: 404,
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    return new NextResponse(llmFileContent, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating llms.txt:', error);
    return new NextResponse(
      `Error generating llms.txt: ${error instanceof Error ? error.message : 'Unknown error'}`,
      {
        status: 500,
        headers: { 'Content-Type': 'text/plain' },
      }
    );
  }
}
