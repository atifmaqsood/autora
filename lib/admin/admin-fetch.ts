/**
 * Drop-in `fetch` for the admin panel. Requests that carry files (FormData)
 * to `/api/admin/...` go straight to the backend API with a short-lived
 * upload token, because the frontend host rejects bodies over ~4.5 MB
 * ("Request Entity Too Large") and videos are bigger than that. Everything
 * else goes through the usual `/api/admin` proxy routes.
 */

interface UploadAccess {
  token: string;
  apiUrl: string;
  expiresAt: number;
}

let cachedAccess: UploadAccess | null = null;

async function uploadAccess(): Promise<UploadAccess | null> {
  if (cachedAccess && cachedAccess.expiresAt > Date.now() + 60_000) {
    return cachedAccess;
  }
  try {
    const response = await fetch("/api/auth/upload-token", {
      method: "POST",
      cache: "no-store"
    });
    if (!response.ok) return null;
    const body = (await response.json()) as {
      token: string;
      expiresIn: number;
      apiUrl: string;
    };
    cachedAccess = {
      token: body.token,
      apiUrl: body.apiUrl.replace(/\/+$/, ""),
      expiresAt: Date.now() + body.expiresIn * 1000
    };
    return cachedAccess;
  } catch {
    return null;
  }
}

/** Maps a frontend proxy path to the backend path when they differ. */
function backendPath(path: string): string {
  return path
    .replace(/^\/api/, "")
    .replace(/^\/admin\/home\/section-items\//, "/admin/home/sections/items/");
}

export async function adminFetch(
  input: string,
  init: RequestInit = {}
): Promise<Response> {
  if (!(init.body instanceof FormData) || !input.startsWith("/api/admin/")) {
    return fetch(input, init);
  }

  const access = await uploadAccess();
  if (!access) return fetch(input, init);

  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${access.token}`);
  const response = await fetch(`${access.apiUrl}${backendPath(input)}`, {
    ...init,
    headers
  });
  if (response.status === 401) cachedAccess = null;
  return response;
}
