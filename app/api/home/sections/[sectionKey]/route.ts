import { NextResponse } from "next/server";

const apiUrl = process.env.API_URL ?? "http://localhost:3101/api";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ sectionKey: string }> }
) {
  const { sectionKey } = await params;
  try {
    const response = await fetch(
      `${apiUrl}/home/sections/${encodeURIComponent(sectionKey)}`,
      { cache: "no-store" }
    );
    return NextResponse.json(await response.json(), { status: response.status });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
