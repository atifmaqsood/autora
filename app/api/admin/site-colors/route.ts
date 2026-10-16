import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE } from "@/lib/auth/constants";

const apiUrl = process.env.API_URL ?? "http://localhost:3101/api";

export async function PUT(request: Request) {
  const accessToken = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (!accessToken) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const response = await fetch(`${apiUrl}/admin/site-settings/colors`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(await request.json())
    });
    return NextResponse.json(await response.json(), { status: response.status });
  } catch {
    return NextResponse.json({ message: "Content service is unavailable." }, { status: 503 });
  }
}
