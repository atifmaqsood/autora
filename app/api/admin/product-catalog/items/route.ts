import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth/constants";
const apiUrl = process.env.API_URL ?? "http://localhost:3101/api";
export async function POST(request: Request) {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (!token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  try {
    const response = await fetch(`${apiUrl}/admin/product-catalog/items`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: await request.formData(),
    });
    return NextResponse.json(await response.json(), {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      { message: "Content service is unavailable." },
      { status: 503 },
    );
  }
}
