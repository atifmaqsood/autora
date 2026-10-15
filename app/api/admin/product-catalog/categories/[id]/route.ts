import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth/constants";
const apiUrl = process.env.API_URL ?? "http://localhost:3101/api";
async function token() {
  return (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
}
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const access = await token();
  if (!access)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    const response = await fetch(
      `${apiUrl}/admin/product-catalog/categories/${encodeURIComponent(id)}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${access}` },
        body: await request.formData(),
      },
    );
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
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const access = await token();
  if (!access)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    const response = await fetch(
      `${apiUrl}/admin/product-catalog/categories/${encodeURIComponent(id)}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${access}` } },
    );
    return response.status === 204
      ? new NextResponse(null, { status: 204 })
      : NextResponse.json(await response.json(), { status: response.status });
  } catch {
    return NextResponse.json(
      { message: "Content service is unavailable." },
      { status: 503 },
    );
  }
}
