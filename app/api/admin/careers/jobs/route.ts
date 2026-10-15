import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth/constants";

const apiUrl = process.env.API_URL ?? "http://localhost:3101/api";
const token = async () => (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;

export async function GET() {
  const accessToken = await token();
  if (!accessToken)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  try {
    const response = await fetch(`${apiUrl}/admin/careers/jobs`, {
      headers: { Authorization: `Bearer ${accessToken}` },
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
  const accessToken = await token();
  if (!accessToken)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  try {
    const response = await fetch(`${apiUrl}/admin/careers/jobs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: await request.text(),
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
