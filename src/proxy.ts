import { NextRequest, NextResponse } from 'next/server';

// constants
import { PATHS } from '@/constants/paths';

// ----------------------------------------------------------------------

function withCors(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,DELETE,OPTIONS'
  );
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type,Authorization'
  );

  return response;
}

function unauthorized() {
  const response = new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Protected Area"',
    },
  });

  return withCors(response);
}

export function proxy(request: NextRequest) {
  if (request.method === 'OPTIONS') {
    return withCors(new NextResponse(null, { status: 200 }));
  }

  // Skip Basic Auth for revalidation webhook
  if (request.nextUrl.pathname === PATHS.api.revalidate) {
    return NextResponse.next();
  }

  const username = process.env.BASIC_AUTH_USERNAME;
  const password = process.env.BASIC_AUTH_PASSWORD;
  const bypassAuth = process.env.BASIC_AUTH_BYPASS === 'true';

  if (!bypassAuth) {
    if (username && password) {
      const authHeader = request.headers.get('authorization');

      if (!authHeader) {
        return unauthorized();
      }

      const expectedAuth = `Basic ${btoa(`${username}:${password}`)}`;
      const isAuthorized = authHeader === expectedAuth;

      if (!isAuthorized) {
        return unauthorized();
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - API routes
     * - Next.js internals
     * - static files
     */
    '/api/:path*',
    '/((?!api|_next|.*\\..*).*)',
  ],
};
