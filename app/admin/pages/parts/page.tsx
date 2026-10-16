"use client";

import Image from "next/image";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  ImagePlus,
  Loader2,
  PackageSearch,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAllPartsCategories } from "@/lib/parts/data";
import type { PartsPageSection } from "@/lib/parts-page/types";
import { agtpAssets } from "@/src/assets";
import { CatalogManager } from "@/components/admin/catalog-manager";
import { adminFetch } from "@/lib/admin/admin-fetch";

type Draft = Omit<
  PartsPageSection,
  "id" | "sectionKey" | "imageUrl" | "sortOrder"
>;
type Group = "categories" | "landscape" | "cta";

const groups: Array<{ key: Group; title: string; description: string }> = [
  {
    key: "categories",
    title: "Product Categories",
    description: "Five category cards",
  },
  {
    key: "landscape",
    title: "Dubai Automotive",
    description: "Image, content and button",
  },
  {
    key: "cta",
    title: "Parts Quote CTA",
    description: "Background, content and buttons",
  },
];
const categoryImages = Object.fromEntries(
  getAllPartsCategories().map((category) => [
    `builtin:parts-${category.slug}`,
    typeof category.image === "string" ? category.image : category.image.src,
  ]),
);
const builtinImages: Record<string, string> = {
  ...categoryImages,
  "builtin:parts-export-port": agtpAssets.exportPort.src,
  "builtin:parts-cta": agtpAssets.sparePartsHero.src,
};

function makeDraft(section: PartsPageSection): Draft {
  return {
    eyebrow: section.eyebrow,
    title: section.title,
    accentTitle: section.accentTitle,
    body: section.body,
    badgeTitle: section.badgeTitle,
    badgeSubtitle: section.badgeSubtitle,
    primaryButtonText: section.primaryButtonText,
    primaryButtonHref: section.primaryButtonHref,
    secondaryButtonText: section.secondaryButtonText,
    secondaryButtonHref: section.secondaryButtonHref,
  };
}

export default function PartsPageAdmin() {
  const [group, setGroup] = useState<Group>("categories");
  const [sections, setSections] = useState<PartsPageSection[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [images, setImages] = useState<Record<string, File | null>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await adminFetch("/api/admin/parts/sections", {
        cache: "no-store",
      });
      const body = await response.json();
      if (!response.ok)
        throw new Error(body.message ?? "Unable to load parts content.");
      const items = body as PartsPageSection[];
      setSections(items);
      setDrafts(
        Object.fromEntries(items.map((item) => [item.id, makeDraft(item)])),
      );
      setSelectedId(
        (current) =>
          current ||
          items.find((item) => item.sectionKey.startsWith("category-"))?.id ||
          "",
      );
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Unable to load parts content.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);
  const categories = useMemo(
    () => sections.filter((item) => item.sectionKey.startsWith("category-")),
    [sections],
  );
  const section =
    group === "categories"
      ? (categories.find((item) => item.id === selectedId) ?? categories[0])
      : sections.find((item) => item.sectionKey === group);
  const draft = section ? drafts[section.id] : undefined;
  const preview = section
    ? images[section.id]
      ? URL.createObjectURL(images[section.id] as File)
      : (builtinImages[section.imageUrl] ?? section.imageUrl)
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
    try {
      const response = await adminFetch(`/api/admin/parts/sections/${section.id}`, {
        method: "PATCH",
        body: data,
      });
      const body = await response.json();
      if (!response.ok)
        throw new Error(
          Array.isArray(body.message)
            ? body.message[0]
            : (body.message ?? "Unable to save section."),
        );
      setImages((current) => ({ ...current, [section.id]: null }));
      setMessage("Parts page section updated successfully.");
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
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-blue-700">
          <PackageSearch className="h-4 w-4" />
          Parts page content
        </div>
        <h1 className="mt-2 text-3xl font-black text-slate-950">
          Parts & Accessories Page
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage the requested sections while preserving the website layout.
        </p>
      </header>

      <nav className="grid gap-3 md:grid-cols-3">
        {groups.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => {
              setGroup(item.key);
              setMessage("");
              setSelectedId(
                item.key === "categories" ? (categories[0]?.id ?? "") : "",
              );
            }}
            className={`rounded-2xl border p-4 text-left transition ${group === item.key ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100" : "border-slate-200 bg-white hover:border-slate-300"}`}
          >
            <span className="block text-sm font-black text-slate-900">
              {item.title}
            </span>
            <span className="mt-1 block text-xs text-slate-500">
              {item.description}
            </span>
          </button>
        ))}
      </nav>

      {group === "categories" && !loading && (
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSelectedId(item.id);
                setMessage("");
              }}
              className={`rounded-full px-4 py-2 text-xs font-bold ${section?.id === item.id ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-600"}`}
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
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
          <div className="relative h-80 bg-slate-950">
            <Image
              src={preview}
              alt={section.title ?? "Parts section"}
              fill
              className="object-cover"
              sizes="1100px"
              unoptimized={preview.startsWith("http://localhost:")}
            />
          </div>
          <div className="space-y-5 p-5">
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
                <ImagePlus className="mr-1 inline h-3 w-3" />
                JPG, PNG or WebP · Maximum 5 MB
              </p>
            </div>
            {group === "categories" && (
              <div className="grid gap-4 md:grid-cols-2">
                {input("Card title", "title")}
                {input("Card description", "body", 5000)}
              </div>
            )}
            {group === "landscape" && (
              <div className="grid gap-4 md:grid-cols-2">
                {input("Eyebrow", "eyebrow", 100)}
                {input("Main heading", "title")}
                {input("Accent heading", "accentTitle")}
                {input("Image badge title", "badgeTitle", 100)}
                {input("Image badge subtitle", "badgeSubtitle")}
                {input("Button text", "primaryButtonText", 100)}
                {input("Button link", "primaryButtonHref", 500)}
                <div className="md:col-span-2">
                  <Label className="text-xs font-bold text-slate-700">
                    Content
                  </Label>
                  <textarea
                    value={draft.body ?? ""}
                    onChange={(e) => setField("body", e.target.value)}
                    rows={8}
                    maxLength={5000}
                    className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900"
                  />
                  <p className="mt-1 text-[10px] text-slate-400">
                    Leave a blank line between paragraphs.
                  </p>
                </div>
              </div>
            )}
            {group === "cta" && (
              <div className="grid gap-4 md:grid-cols-2">
                {input("Eyebrow", "eyebrow", 100)}
                {input("Heading", "title")}
                {input("Primary button", "primaryButtonText", 100)}
                {input("Secondary button", "secondaryButtonText", 100)}
                {input("Secondary button link", "secondaryButtonHref", 500)}
                <div className="md:col-span-2">
                  <Label className="text-xs font-bold text-slate-700">
                    Description
                  </Label>
                  <textarea
                    value={draft.body ?? ""}
                    onChange={(e) => setField("body", e.target.value)}
                    rows={5}
                    maxLength={5000}
                    className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900"
                  />
                </div>
              </div>
            )}
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
      <CatalogManager
        type="parts"
        title="Automotive Parts Categories & Products"
      />
    </div>
  );
}
