// middleware.ts 

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // const { pathname } = request.nextUrl;

  // // Paths to exclude from redirection
  // const excludedPaths = [
  //   '/under-construction',
  //   '/api', // If you have API routes
  //   '/_next', // Next.js internal paths
  //   '/favicon.ico',
  // ];

  // // Allow static files (e.g., .css, .js, images)
  // const isStaticFile = /\.(.*)$/.test(pathname);

  // if (excludedPaths.some(path => pathname.startsWith(path)) || isStaticFile) {
  //   return NextResponse.next();
  // }

  // // Redirect all other paths to /under-construction
  // const url = request.nextUrl.clone();
  // url.pathname = '/under-construction';
  // return NextResponse.rewrite(url);
}

// Specify the paths the middleware should run on
export const config = {
  matcher: '/:path*',
};
