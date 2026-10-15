import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE } from "@/lib/auth/constants";

const apiUrl = process.env.API_URL ?? "http://localhost:3101/api";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ sectionKey: string }> }
) {
  const accessToken = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (!accessToken) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { sectionKey } = await params;
  try {
    const response = await fetch(
      `${apiUrl}/admin/home/sections/${encodeURIComponent(sectionKey)}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store"
      }
    );
    return NextResponse.json(await response.json(), { status: response.status });
  } catch {
    return NextResponse.json({ message: "Content service is unavailable." }, { status: 503 });
  }
}
