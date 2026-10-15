import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE } from "@/lib/auth/constants";

interface BackendLoginResponse {
  accessToken: string;
  expiresIn: number;
  user: { id: string; email: string };
}

const apiUrl = process.env.API_URL ?? "http://localhost:3101/api";

export async function POST(request: Request) {
  let credentials: unknown;

  try {
    credentials = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  try {
    const backendResponse = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      cache: "no-store"
    });

    if (!backendResponse.ok) {
      const status =
        backendResponse.status === 401
          ? 401
          : backendResponse.status >= 500
            ? 503
            : 400;
      return NextResponse.json(
        {
          message:
            status === 401
              ? "Invalid email or password."
              : status === 503
                ? "Authentication service is unavailable."
                : "Unable to sign in."
        },
        { status }
      );
    }

    const session = (await backendResponse.json()) as BackendLoginResponse;
    const response = NextResponse.json({ user: session.user });
    response.cookies.set(ADMIN_SESSION_COOKIE, session.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: session.expiresIn
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: "Authentication service is unavailable." },
      { status: 503 }
    );
  }
}
