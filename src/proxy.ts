import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const publicRoutes = ["/"];
const authRoutes = ["/register", "/login"]; // اصلاح شد

export async function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const sessionCookie = getSessionCookie(request);
  const isPublic = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

  if (isPublic) return NextResponse.next();

  if (isAuthRoutes && sessionCookie) {
    return NextResponse.redirect(new URL("/members", nextUrl));
  }

  if (!sessionCookie && !isAuthRoutes) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
