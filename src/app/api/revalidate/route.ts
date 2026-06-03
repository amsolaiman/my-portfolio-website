import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

// ----------------------------------------------------------------------

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.SANITY_STUDIO_REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    // Revalidates every page that uses cached data
    revalidatePath('/', 'layout');

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error revalidating',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
