import { NextResponse } from "next/server";

const apiUrl = process.env.API_URL ?? "http://localhost:3101/api";

export async function GET() {
  try {
    const response = await fetch(`${apiUrl}/home/industry-cards`, { cache: "no-store" });
    return NextResponse.json(await response.json(), { status: response.status });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
