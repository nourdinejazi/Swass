import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT } from "./routes";
import { NextResponse } from "next/server";
export { auth as middleware } from "@/auth";
const { auth } = NextAuth(authConfig);
// @ts-ignore
export default auth((req) => {
  // const { nextUrl } = req;
  // const isLoggedIn = !!req.auth;

  // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  // const isAuthRoute = authRoutes.includes(nextUrl.pathname);
 

  // if (isApiAuthRoute) {
  //   return null;
  // }

  // if (isAuthRoute) {
  //   if (isLoggedIn) {
  //     return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  //   }
  //   return null;
  // }

  // if (!isLoggedIn) {
  //   // let callbackUrl = nextUrl.pathname;
  //   // if (nextUrl.search) {
  //   //   callbackUrl += nextUrl.search;
  //   // }

  //   // const encodedCallbackUrl = encodeURIComponent(callbackUrl);

  //   // return Response.redirect(
  //   //   new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
  //   // );

  // }

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};