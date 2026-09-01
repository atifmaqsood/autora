import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { defaultContent } from "@/lib/content/store";
import type { ShowcaseContent } from "@/lib/content/types";

const DATA_FILE = path.join(process.cwd(), "data", "content.json");

function readStoredContent(): ShowcaseContent {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      return {
        ...defaultContent,
        ...parsed,
        site: {
          ...defaultContent.site,
          ...(parsed.site || {})
        }
      };
    }
  } catch (error) {
    console.error("Error reading stored content:", error);
  }
  return defaultContent;
}

export async function GET() {
  const content = readStoredContent();
  return NextResponse.json(content);
}

export async function POST(req: Request) {
  try {
    const incoming = await req.json();
    const current = readStoredContent();
    const updated: ShowcaseContent = {
      ...current,
      ...incoming,
      site: {
        ...current.site,
        ...(incoming.site || {})
      }
    };

    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2), "utf-8");

    return NextResponse.json({ success: true, content: updated });
  } catch (error) {
    // On Vercel the filesystem is read-only — writes will fail with EROFS.
    // Return the current content so the client still gets a valid response.
    console.warn("Could not write content.json (read-only filesystem?):", error);
    const current = readStoredContent();
    return NextResponse.json(
      { success: true, content: current, persisted: false },
      { status: 200 }
    );
  }
}
