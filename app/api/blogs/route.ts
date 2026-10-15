import { NextResponse } from "next/server";

const apiUrl = process.env.API_URL ?? "http://localhost:3101/api";

export async function GET() {
  try {
    const response = await fetch(`${apiUrl}/blogs`, { cache: "no-store" });
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
