"use client";

import Image from "next/image";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { CheckCircle2, ImagePlus, Loader2, Save, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type {
  MarketingPageKey,
  MarketingPageSection,
} from "@/lib/marketing-page-content/types";
import { adminFetch } from "@/lib/admin/admin-fetch";

type Draft = Pick<
  MarketingPageSection,
  | "eyebrow"
  | "title"
  | "body"
  | "primaryButtonText"
  | "primaryButtonHref"
  | "secondaryButtonText"
  | "secondaryButtonHref"
>;

export interface MarketingSectionDefinition {
  key: string;
  label: string;
  description: string;
  allowVideo?: boolean;
  /** Video sections whose video doubles as its own thumbnail (no image). */
  videoOnly?: boolean;
  primaryTextLabel?: string;
  secondaryTextLabel?: string;
}

interface Props {
  pageKey: MarketingPageKey;
  title: string;
  description: string;
  definitions: MarketingSectionDefinition[];
  builtinImages: Record<string, string>;
}

function makeDraft(section: MarketingPageSection): Draft {
  return {
    eyebrow: section.eyebrow,
    title: section.title,
    body: section.body,
    primaryButtonText: section.primaryButtonText,
    primaryButtonHref: section.primaryButtonHref,
    secondaryButtonText: section.secondaryButtonText,
    secondaryButtonHref: section.secondaryButtonHref,
  };
}

export function MarketingPageEditor({
  pageKey,
  title,
  description,
  definitions,
  builtinImages,
}: Props) {
  const [activeKey, setActiveKey] = useState(definitions[0]?.key ?? "");
  const [sections, setSections] = useState<MarketingPageSection[]>([]);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [images, setImages] = useState<Record<string, File | null>>({});
  const [videos, setVideos] = useState<Record<string, File | null>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await adminFetch(`/api/admin/page-content/${pageKey}`, {
        cache: "no-store",
      });
      const body = await response.json();
      if (!response.ok) {
        throw new Error(body.message ?? "Unable to load page content.");
      }
      const items = body as MarketingPageSection[];
      setSections(items);
      setDrafts(
        Object.fromEntries(items.map((item) => [item.id, makeDraft(item)])),
      );
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Unable to load page content.",
      );
    } finally {
      setLoading(false);
    }
  }, [pageKey]);

  useEffect(() => {
    void load();
  }, [load]);

  const section = sections.find((item) => item.sectionKey === activeKey);
  const draft = section ? drafts[section.id] : undefined;
  const definition = definitions.find((item) => item.key === activeKey);
  const imageSource = section
    ? images[section.id]
      ? URL.createObjectURL(images[section.id] as File)
      : section.imageUrl
        ? (builtinImages[section.imageUrl] ?? section.imageUrl)
        : ""
    : "";
  const videoSource = section
    ? videos[section.id]
      ? URL.createObjectURL(videos[section.id] as File)
      : (section.videoUrl ?? "")
    : "";

  function setField(field: keyof Draft, value: string) {
    if (!section || !draft) return;
    setDrafts((current) => ({
      ...current,
      [section.id]: { ...draft, [field]: value },
    }));
  }

  async function save() {
    if (!section || !draft) return;
    setSaving(true);
    setError("");
    setMessage("");
    const data = new FormData();
    Object.entries(draft).forEach(([key, value]) => data.set(key, value ?? ""));
    if (images[section.id]) data.set("image", images[section.id] as File);
    if (videos[section.id]) data.set("video", videos[section.id] as File);
    try {
      const response = await adminFetch(
        `/api/admin/page-content/${pageKey}/${section.id}`,
        { method: "PATCH", body: data },
      );
      const body = await response.json();
      if (!response.ok) {
        throw new Error(
          Array.isArray(body.message)
            ? body.message[0]
            : (body.message ?? "Unable to save section."),
        );
      }
      setImages((current) => ({ ...current, [section.id]: null }));
      setVideos((current) => ({ ...current, [section.id]: null }));
      setMessage(`${definition?.label ?? "Section"} updated successfully.`);
      await load();
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Unable to save section.",
      );
    } finally {
      setSaving(false);
    }
  }

  const input = (label: string, field: keyof Draft, maxLength = 191) => (
    <div>
      <Label className="text-xs font-bold text-slate-700">{label}</Label>
      <Input
        value={(draft?.[field] as string | null) ?? ""}
        onChange={(event) => setField(field, event.target.value)}
        maxLength={maxLength}
        className="mt-1.5 h-11 bg-white text-slate-900"
      />
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-12">
      <header className="border-b border-slate-200 pb-5">
        <h1 className="text-3xl font-black text-slate-950">{title}</h1>
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      </header>

      <nav
        className={`grid gap-3 ${definitions.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4"}`}
      >
        {definitions.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => {
              setActiveKey(item.key);
              setMessage("");
            }}
            className={`rounded-2xl border p-4 text-left transition ${activeKey === item.key ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100" : "border-slate-200 bg-white hover:border-slate-300"}`}
          >
            <span className="block text-sm font-black text-slate-900">
              {item.label}
            </span>
            <span className="mt-1 block text-xs text-slate-500">
              {item.description}
            </span>
          </button>
        ))}
      </nav>

      {(error || message) && (
        <div
          className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold ${error ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}
        >
          {!error && <CheckCircle2 className="h-4 w-4" />}
          {error || message}
        </div>
      )}

      {loading ? (
        <div className="flex min-h-64 items-center justify-center rounded-2xl bg-white">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : section && draft ? (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {imageSource && !definition?.videoOnly && (
            <div className="relative h-80 bg-slate-950">
              <Image
                src={imageSource}
                alt={section.title ?? definition?.label ?? "Page section"}
                fill
                className="object-cover"
                sizes="1100px"
                unoptimized={imageSource.startsWith("http://localhost:")}
              />
            </div>
          )}
          <div className="space-y-5 p-5">
            <div className="grid gap-4 md:grid-cols-2">
              {!definition?.videoOnly && (
                <div>
                  <Label className="text-xs font-bold text-slate-700">
                    Replace image
                  </Label>
                  <Input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setImages((current) => ({
                        ...current,
                        [section.id]: event.target.files?.[0] ?? null,
                      }))
                    }
                    className="mt-1.5 h-11 cursor-pointer bg-white text-xs"
                  />
                  <p className="mt-1.5 text-[10px] text-slate-400">
                    <ImagePlus className="mr-1 inline h-3 w-3" /> JPG, PNG or
                    WebP · Maximum 100 MB
                  </p>
                </div>
              )}
              {definition?.allowVideo && (
                <div>
                  <Label className="text-xs font-bold text-slate-700">
                    Replace video
                  </Label>
                  <Input
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime"
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setVideos((current) => ({
                        ...current,
                        [section.id]: event.target.files?.[0] ?? null,
                      }))
                    }
                    className="mt-1.5 h-11 cursor-pointer bg-white text-xs"
                  />
                  <p className="mt-1.5 text-[10px] text-slate-400">
                    <Video className="mr-1 inline h-3 w-3" /> MP4, WebM or MOV ·
                    Maximum 100 MB
                  </p>
                </div>
              )}
            </div>

            {definition?.allowVideo && videoSource && (
              <video
                src={videoSource}
                controls
                preload="metadata"
                className="max-h-80 w-full rounded-xl bg-black"
              />
            )}

            <div className="grid gap-4 md:grid-cols-2">
              {draft.eyebrow !== null &&
                input("Eyebrow / language", "eyebrow", 100)}
              {draft.title !== null && input("Heading", "title")}
              {draft.primaryButtonText !== null &&
                input(
                  definition?.primaryTextLabel ?? "Primary button",
                  "primaryButtonText",
                  100,
                )}
              {draft.primaryButtonHref !== null &&
                input("Primary button link", "primaryButtonHref", 500)}
              {draft.secondaryButtonText !== null &&
                input(
                  definition?.secondaryTextLabel ?? "Secondary button",
                  "secondaryButtonText",
                  100,
                )}
              {draft.secondaryButtonHref !== null &&
                input("Secondary button link", "secondaryButtonHref", 500)}
              {draft.body !== null && (
                <div className="md:col-span-2">
                  <Label className="text-xs font-bold text-slate-700">
                    Description
                  </Label>
                  <textarea
                    value={draft.body ?? ""}
                    onChange={(event) => setField("body", event.target.value)}
                    rows={7}
                    maxLength={5000}
                    className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900"
                  />
                  <p className="mt-1 text-[10px] text-slate-400">
                    Leave a blank line between paragraphs.
                  </p>
                </div>
              )}
            </div>

            <Button
              type="button"
              onClick={() => void save()}
              disabled={saving}
              className="gap-2 bg-slate-950"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {saving ? "Saving..." : "Save section"}
            </Button>
          </div>
        </section>
      ) : (
        <div className="rounded-2xl bg-white p-8 text-sm text-red-600">
          Section content is unavailable.
        </div>
      )}
    </div>
  );
}
