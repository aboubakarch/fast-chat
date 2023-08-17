import { NextResponse } from 'next/server';
import cookies from 'js-cookie';

// This function can be marked `async` if using `await` inside
export function middleware(req) {
  const token = req.cookies.get('access_token');
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
};
