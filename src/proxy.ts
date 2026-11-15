import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

const isRoute = (pathname: string, route: string) =>
  pathname === route || pathname.startsWith(`${route}/`);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // صفحه اصلی پروژه‌ات عمومی است.
  if (pathname === "/") {
    return NextResponse.next();
  }

  const isMoreInfo = isRoute(pathname, "/register/moreinfo");
  const isVerifyEmail = isRoute(pathname, "/register/verify-email");
  const isVerifySuccess = isRoute(pathname, "/register/verify-success");

  const isAuthRoute = ["/login", "/register", "/auth"].some((route) =>
    isRoute(pathname, route),
  );

  const redirectTo = (path: string) =>
    NextResponse.redirect(new URL(path, request.url));

  const session = await auth.api.getSession({
    headers: request.headers,
    query: {
      disableCookieCache: true,
    },
  });

  // ۱. مهمان
  if (!session?.user) {
    if (isMoreInfo) {
      return redirectTo("/register/baseinfo");
    }

    if (isVerifyEmail || isVerifySuccess) {
      return redirectTo("/login");
    }

    if (!isAuthRoute) {
      return redirectTo("/login");
    }

    return NextResponse.next();
  }

  // ۲. سشن دارد، ولی پروفایلش هنوز تکمیل نشده است.
  if (!session.user.isOnboarded) {
    return isMoreInfo ? NextResponse.next() : redirectTo("/register/moreinfo");
  }

  // ۳. پروفایل کامل است، ولی ایمیل هنوز تأیید نشده است.
  if (!session.user.emailVerified) {
    return isVerifyEmail
      ? NextResponse.next()
      : redirectTo("/register/verify-email");
  }

  // ۴. تأیید انجام شده؛ صفحه موفقیت می‌تواند تایمر دوثانیه‌ای نشان دهد.
  if (isVerifySuccess) {
    return NextResponse.next();
  }

  // کاربر کامل و تأییدشده نباید به فرم‌های ورود/ثبت‌نام برگردد.
  if (isAuthRoute) {
    return redirectTo("/members");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
