import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE } from "@/lib/auth/constants";

const apiUrl = process.env.API_URL ?? "http://localhost:3101/api";

/**
 * Hands the signed-in admin a short-lived upload token plus the API address,
 * so large files can go straight to the API instead of through this host,
 * which rejects request bodies over ~4.5 MB.
 */
export async function POST() {
  const accessToken = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(`${apiUrl}/auth/upload-token`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store"
    });
    if (!response.ok) {
      return NextResponse.json(
        { message: "Upload is unavailable." },
        { status: response.status === 401 ? 401 : 503 }
      );
    }
    const { token, expiresIn } = (await response.json()) as {
      token: string;
      expiresIn: number;
    };
    return NextResponse.json({ token, expiresIn, apiUrl });
  } catch {
    return NextResponse.json({ message: "Upload is unavailable." }, { status: 503 });
  }
}
