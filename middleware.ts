import { NextRequest, NextResponse } from "next/server";

import {
  ADMIN_HOME,
  ADMIN_SESSION_COOKIE,
  PUBLIC_ADMIN_PATHS
} from "@/lib/auth/constants";

const apiUrl = process.env.API_URL ?? "http://localhost:3101/api";

/** True once less than half of the session's lifetime is left. */
function needsRefresh(token: string): boolean {
  try {
    const payload = JSON.parse(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
    ) as { iat?: number; exp?: number };
    if (!payload.iat || !payload.exp) return false;
    const now = Date.now() / 1000;
    return payload.exp - now < (payload.exp - payload.iat) / 2;
  } catch {
    return false;
  }
}

/**
 * Sliding session: while the admin keeps working, swap the session cookie
 * for a fresh token so they are not logged out mid-task. An idle session
 * still expires after its full lifetime.
 */
async function refreshSession(token: string, response: NextResponse): Promise<void> {
  if (!needsRefresh(token)) return;
  try {
    const refreshed = await fetch(`${apiUrl}/auth/refresh`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store"
    });
    if (!refreshed.ok) return;
    const session = (await refreshed.json()) as { accessToken: string; expiresIn: number };
    response.cookies.set(ADMIN_SESSION_COOKIE, session.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: session.expiresIn
    });
  } catch {
    // Keep the current session; the next request will try again.
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

  // Admin API calls (saving, uploading) only extend the session.
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const response = NextResponse.next();
    if (token) await refreshSession(token, response);
    return response;
  }

  const isLoginPage = request.nextUrl.pathname === "/admin/login";
  const isPublicPage = PUBLIC_ADMIN_PATHS.includes(request.nextUrl.pathname);
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

  const response = NextResponse.next();
  if (authState === "authenticated" && token) await refreshSession(token, response);
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/api/auth/upload-token"]
};
