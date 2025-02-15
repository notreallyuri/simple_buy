import {
  NextResponse,
  type MiddlewareConfig,
  type NextRequest,
} from "next/server";

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

const redirect_Auth = "/";
const redirectUser_NotAuth = "/user/sign-in";
const redirectStore_NotAuth = "/store/sign-in";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const publicRoute = publicRoutes.find((r) => r.path === path);
  const authToken = req.cookies.get("token");
  const redirectUrl = req.nextUrl.clone();
  const res = NextResponse;

  if (publicRoute) {
    if (!authToken) return res.next();

    if (publicRoute.redirect) {
      redirectUrl.pathname = redirect_Auth;
      return res.redirect(redirectUrl);
    }

    return res.next();
  }

  if (!authToken) {
    redirectUrl.pathname = path.startsWith("/user")
      ? redirectUser_NotAuth
      : redirectStore_NotAuth;
    return res.redirect(redirectUrl);
  }

  return res.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
