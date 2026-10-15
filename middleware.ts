import { NextRequest, NextResponse } from "next/server";

import {
  ADMIN_HOME,
  ADMIN_SESSION_COOKIE,
  PUBLIC_ADMIN_PATHS
} from "@/lib/auth/constants";

const apiUrl = process.env.API_URL ?? "http://localhost:3101/api";

export async function middleware(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === "/admin/login";
  const isPublicPage = PUBLIC_ADMIN_PATHS.includes(request.nextUrl.pathname);
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  let authState: "authenticated" | "unauthenticated" | "unavailable" = token
    ? "unavailable"
    : "unauthenticated";

  if (token) {
    try {
      const response = await fetch(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store"
      });

      if (response.ok) {
        authState = "authenticated";
      } else if (response.status === 401 || response.status === 403) {
        authState = "unauthenticated";
      }
    } catch {
      // Keep the existing session during short API restarts/hot reloads. A
      // temporary connection failure must not be treated as an invalid token.
      authState = "unavailable";
    }
  }

  if (authState === "authenticated" && isLoginPage) {
    return NextResponse.redirect(new URL(ADMIN_HOME, request.url));
  }

  if (authState === "unauthenticated" && !isPublicPage) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set(
      "from",
      `${request.nextUrl.pathname}${request.nextUrl.search}`
    );
    const response = NextResponse.redirect(loginUrl);
    if (token) response.cookies.delete(ADMIN_SESSION_COOKIE);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
