import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { defaultContent } from "@/lib/content/store";
import type { ShowcaseContent } from "@/lib/content/types";

const DATA_FILE = path.join(process.cwd(), "data", "content.json");

function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

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

    ensureDirectoryExistence(DATA_FILE);
    fs.writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2), "utf-8");

    return NextResponse.json({ success: true, content: updated });
  } catch (error) {
    console.error("Error saving content:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save content" },
      { status: 500 }
    );
  }
}
