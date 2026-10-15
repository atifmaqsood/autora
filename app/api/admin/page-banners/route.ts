import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE } from "@/lib/auth/constants";

const apiUrl = process.env.API_URL ?? "http://localhost:3101/api";

async function token(): Promise<string | null> {
  return (await cookies()).get(ADMIN_SESSION_COOKIE)?.value ?? null;
}

export async function GET() {
  const accessToken = await token();
  if (!accessToken) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const response = await fetch(`${apiUrl}/admin/page-banners`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store"
  });
  return NextResponse.json(await response.json(), { status: response.status });
}

export async function POST(request: Request) {
  const accessToken = await token();
  if (!accessToken) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const response = await fetch(`${apiUrl}/admin/page-banners`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: await request.formData()
  });
  return NextResponse.json(await response.json(), { status: response.status });
}
