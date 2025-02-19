import {
  NextResponse,
  type MiddlewareConfig,
  type NextRequest,
} from "next/server";

import jwt from "jsonwebtoken";

type PublicRoute = {
  path: string;
  redirect: boolean;
};

const publicRoutes: PublicRoute[] = [
  { path: "/", redirect: false },
  { path: "/faq", redirect: false },
  { path: "/user/sign-in", redirect: true },
  { path: "/user/sign-up", redirect: true },
  { path: "/store/sign-in", redirect: true },
  { path: "/store/sign-up", redirect: true },
];

const redirectUser_NotAuth = "/user/sign-in";
const redirectStore_NotAuth = "/store/sign-in";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const publicRoute = publicRoutes.find((r) => r.path === path);
  const authToken = req.cookies.get("authToken")?.value;
  const redirectUrl = req.nextUrl.clone();

  let userId: string | null = null;

  if (authToken) {
    try {
      const decoded = jwt.decode(authToken) as { userId?: string } | null;
      userId = decoded?.userId || null;
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }

  if (publicRoute) {
    if (!authToken) {
      return NextResponse.next();
    }

    if (publicRoute.redirect) {
      redirectUrl.pathname = userId ? `/user/${userId}` : "/";
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
  }

  if (!authToken) {
    redirectUrl.pathname = path.startsWith("/store/")
      ? redirectStore_NotAuth
      : redirectUser_NotAuth;
    console.log("Invalid access, redirecting");
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
