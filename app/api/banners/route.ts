import { NextRequest, NextResponse } from "next/server";

const apiUrl = process.env.API_URL ?? "http://localhost:3101/api";

export async function GET(request: NextRequest) {
  const pageKey = request.nextUrl.searchParams.get("pageKey");
  if (!pageKey) return NextResponse.json({ message: "pageKey is required" }, { status: 400 });

  try {
    const response = await fetch(
      `${apiUrl}/page-banners?pageKey=${encodeURIComponent(pageKey)}`,
      { cache: "no-store" }
    );
    return NextResponse.json(await response.json(), { status: response.status });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
