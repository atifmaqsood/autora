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
    const body = (await backendResponse.json().catch(() => ({}))) as {
      reference?: string;
      debug?: unknown;
    };

    if (!backendResponse.ok) {
      const isServerError = backendResponse.status >= 500;
      return NextResponse.json(
        {
          message: isServerError ? unavailable : "Please check the form and try again.",
          // Present only when the backend runs with MAIL_DEBUG=true.
          ...(body.debug ? { reference: body.reference, debug: body.debug } : {})
        },
        { status: isServerError ? 503 : 400 }
      );
    }

    return NextResponse.json(body, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message: unavailable,
        debug: {
          proxy: `Could not reach ${new URL(apiUrl).origin}: ${
            error instanceof Error ? error.message : String(error)
          }`
        }
      },
      { status: 503 }
    );
  }
}
