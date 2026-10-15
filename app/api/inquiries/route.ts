import { NextResponse } from "next/server";

const apiUrl = process.env.API_URL ?? "http://localhost:3101/api";
const unavailable =
  "We couldn't send your inquiry right now. Please try again or contact us on WhatsApp.";

export async function POST(request: Request) {
  let input: unknown;

  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  try {
    const backendResponse = await fetch(`${apiUrl}/inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
      cache: "no-store"
    });

    if (!backendResponse.ok) {
      const isServerError = backendResponse.status >= 500;
      return NextResponse.json(
        { message: isServerError ? unavailable : "Please check the form and try again." },
        { status: isServerError ? 503 : 400 }
      );
    }

    return NextResponse.json(await backendResponse.json(), { status: 201 });
  } catch {
    return NextResponse.json({ message: unavailable }, { status: 503 });
  }
}
