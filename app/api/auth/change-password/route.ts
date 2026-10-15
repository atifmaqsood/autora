import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE } from "@/lib/auth/constants";

interface BackendSessionResponse {
  accessToken: string;
  expiresIn: number;
  user: { id: string; email: string };
}

const apiUrl = process.env.API_URL ?? "http://localhost:3101/api";
const unavailable = "Password service is unavailable right now.";

export async function POST(request: Request) {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.json(
      { message: "Your session has expired. Please sign in again." },
      { status: 401 }
    );
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  try {
    const backendResponse = await fetch(`${apiUrl}/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(input),
      cache: "no-store"
    });

    if (!backendResponse.ok) {
      const { status } = backendResponse;
      const body = (await backendResponse.json().catch(() => ({}))) as {
        message?: unknown;
      };
      const message =
        status === 401
          ? "Your session has expired. Please sign in again."
          : status >= 500
            ? unavailable
            : body.message === "Current password is incorrect"
              ? "Your current password is incorrect."
              : "New password must be 8–128 characters.";
      return NextResponse.json({ message }, { status: status >= 500 ? 503 : status });
    }

    // The backend revokes older sessions, so swap in the fresh token.
    const session = (await backendResponse.json()) as BackendSessionResponse;
    const response = NextResponse.json({ message: "Password updated." });
    response.cookies.set(ADMIN_SESSION_COOKIE, session.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: session.expiresIn
    });
    return response;
  } catch {
    return NextResponse.json({ message: unavailable }, { status: 503 });
  }
}
