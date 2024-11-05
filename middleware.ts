import { auth } from "./auth";

export default auth((req) => {
  const isAuth = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith("/login");

  if (isAuthPage) {
    if (isAuth) {
      return Response.redirect(new URL("/", req.nextUrl));
    }
    return null;
  }

  if (!isAuth) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }
  return null;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};