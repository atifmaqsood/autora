import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE } from "@/lib/auth/constants";

const apiUrl = process.env.API_URL ?? "http://localhost:3101/api";

async function authorizedRequest(
  id: string,
  init: RequestInit
): Promise<NextResponse> {
  const accessToken = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (!accessToken) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const response = await fetch(`${apiUrl}/admin/page-banners/${encodeURIComponent(id)}`, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${accessToken}`
    }
  });
  return NextResponse.json(await response.json(), { status: response.status });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return authorizedRequest(id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: await request.text()
  });
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return authorizedRequest(id, { method: "DELETE" });
}
