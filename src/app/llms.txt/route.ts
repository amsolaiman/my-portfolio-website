/* eslint-disable no-console */

import { NextResponse } from 'next/server';

// _sanity
import { getGlobalContentData } from '@/_sanity/utils/content';

export async function GET() {
  try {
    const globalContent = await getGlobalContentData();

    if (!globalContent) {
      console.error('Global content not found');
      return new NextResponse('Not found', {
        status: 404,
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    const llmFileContent = globalContent?.llmsTxt;

    if (!llmFileContent) {
      console.error('llms.txt content not found in global content');
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
