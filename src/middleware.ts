import {getToken} from "next-auth/jwt";
import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

const isUnAuthed = ["/auth/sign-in", "/auth/sign-up"];
const isAuthed = ["/transactions", "/settings", "/security", "/investments", "/cards", "/accounts"];

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if(token) {
    if(isUnAuthed.some((el: string) => request.nextUrl.pathname.includes(el))) {
      return NextResponse.redirect(new URL("/settings", request.url));
    }
  } else {
    if(isAuthed.some((el: string) => request.nextUrl.pathname.includes(el)) || request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/auth/sign-in", request.nextUrl.origin));
    }
  }
}