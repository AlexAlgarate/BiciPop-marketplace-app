import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from './lib/auth/auth';

export async function proxy(request: NextRequest) {
  const token = await getSession();

  if (!token && request.nextUrl.pathname.startsWith('/')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: ['/', '/products/:path*'],
};
