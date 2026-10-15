import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth/constants";
const apiUrl = process.env.API_URL ?? "http://localhost:3101/api";
async function token() {
  return (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
}
export async function GET() {
  const access = await token();
  if (!access)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  try {
    const response = await fetch(`${apiUrl}/admin/vehicle-products`, {
      headers: { Authorization: `Bearer ${access}` },
      cache: "no-store",
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
export async function POST(request: Request) {
  const access = await token();
  if (!access)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  try {
    const response = await fetch(`${apiUrl}/admin/vehicle-products`, {
      method: "POST",
      headers: { Authorization: `Bearer ${access}` },
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
