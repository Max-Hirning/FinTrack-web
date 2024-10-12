import { NextRequest, NextResponse } from 'next/server';

const dashboardPages = [
  '/accounts',
  '/cards',
  '/profile',
  '/settings',
  '/transactions',
];

export async function middleware(req: NextRequest) {
  const userId = req.cookies.get('userId')?.value;
  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  if (req.nextUrl.pathname.includes('auth')) {
    req.cookies.delete('refreshToken');
    req.cookies.delete('accessToken');
    req.cookies.delete('userId');
    return NextResponse.next();
  }

  if (userId && accessToken && refreshToken) {
    if (req.nextUrl.pathname.includes('auth')) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } else if (req.nextUrl.pathname === '/' || dashboardPages.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }

  return NextResponse.next();
}
