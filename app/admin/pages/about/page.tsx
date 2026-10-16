"use client";

import Image from "next/image";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { CheckCircle2, ImagePlus, Info, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AboutPageSection } from "@/lib/about-page/types";
import { agtpAssets } from "@/src/assets";
import { adminFetch } from "@/lib/admin/admin-fetch";

type SectionKey = AboutPageSection["sectionKey"];
type Draft = Pick<
  AboutPageSection,
  "eyebrow" | "title" | "accentTitle" | "body" | "badgeTitle" | "badgeSubtitle"
>;
const builtins: Record<string, string> = {
  "builtin:about-yard": agtpAssets.aboutYard.src,
  "builtin:inventory-hero": agtpAssets.inventoryHero.src,
};
const definitions: Array<{
  key: SectionKey;
  title: string;
  description: string;
}> = [
  {
    key: "story",
    title: "Our Story",
    description: "Image, heading, paragraphs and image badge",
  },
  {
    key: "difference",
    title: "What Makes Us Different",
    description: "Right-side showcase image",
  },
  {
    key: "cta",
    title: "Ready to Get Started",
    description: "Background image, heading and content",
  },
];

export default function AboutPageAdmin() {
  const [active, setActive] = useState<SectionKey>("story");
  const [sections, setSections] = useState<AboutPageSection[]>([]);
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
      const response = await adminFetch("/api/admin/about/sections", {
        cache: "no-store",
      });
      const body = await response.json();
      if (!response.ok)
        throw new Error(body.message ?? "Unable to load About page content.");
      const data = body as AboutPageSection[];
      setSections(data);
      setDrafts(
        Object.fromEntries(
          data.map((item) => [
            item.id,
            {
              eyebrow: item.eyebrow,
              title: item.title,
              accentTitle: item.accentTitle,
              body: item.body,
              badgeTitle: item.badgeTitle,
              badgeSubtitle: item.badgeSubtitle,
            },
          ]),
        ),
      );
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Unable to load content.",
      );
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);
  const section = sections.find((item) => item.sectionKey === active);
  const draft = section ? drafts[section.id] : undefined;
  function setField(key: keyof Draft, value: string) {
    if (!section || !draft) return;
    setDrafts((current) => ({
      ...current,
      [section.id]: { ...draft, [key]: value },
    }));
  }
  function selectImage(event: ChangeEvent<HTMLInputElement>) {
    if (!section) return;
    setImages((current) => ({
      ...current,
      [section.id]: event.target.files?.[0] ?? null,
    }));
  }
  async function save() {
    if (!section || !draft) return;
    setSaving(true);
    setError("");
    setMessage("");
    const data = new FormData();
    Object.entries(draft).forEach(([key, value]) => data.set(key, value ?? ""));
    if (images[section.id]) data.set("image", images[section.id]!);
    try {
      const response = await adminFetch(`/api/admin/about/sections/${section.id}`, {
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
      setMessage(
        `${definitions.find((item) => item.key === active)?.title} updated successfully.`,
      );
      await load();
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Unable to save section.",
      );
    } finally {
      setSaving(false);
    }
  }
  const source = section
    ? (builtins[section.imageUrl] ?? section.imageUrl)
    : "";
  const input = (label: string, key: keyof Draft, maxLength = 191) => (
    <div>
      <Label className="text-xs font-bold text-slate-700">{label}</Label>
      <Input
        value={draft?.[key] ?? ""}
        onChange={(event) => setField(key, event.target.value)}
        maxLength={maxLength}
        className="mt-1.5 h-11"
      />
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-12">
      <header className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-blue-700">
            <Info className="h-4 w-4" />
            About page content
          </div>
          <h1 className="text-3xl font-black text-slate-950">About Us Page</h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage About page sections without changing the website layout.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm">
          3 sections configured
        </div>
      </header>
      <nav className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <p className="px-3 pb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
          Sections
        </p>
        <div className="grid gap-2 md:grid-cols-3">
          {definitions.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                setActive(item.key);
                setError("");
                setMessage("");
              }}
              className={`rounded-xl px-4 py-3 text-left transition ${active === item.key ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-700 hover:bg-slate-100"}`}
            >
              <span className="block text-xs font-bold">{item.title}</span>
              <span
                className={`mt-1 block text-[10px] ${active === item.key ? "text-slate-400" : "text-slate-500"}`}
              >
                {item.description}
              </span>
            </button>
          ))}
        </div>
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
          <div className="relative h-72 bg-slate-950">
            <Image
              src={source}
              alt={
                definitions.find((item) => item.key === active)?.title ??
                "About section"
              }
              fill
              className="object-cover"
              sizes="1000px"
            />
          </div>
          <div className="space-y-4 p-5">
            <div>
              <Label className="text-xs font-bold text-slate-700">
                Replace image
              </Label>
              <Input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={selectImage}
                className="mt-1.5 h-11 cursor-pointer bg-white text-xs"
              />
              <p className="mt-1.5 text-[10px] text-slate-400">
                <ImagePlus className="mr-1 inline h-3 w-3" />
                JPG, PNG or WebP · Maximum 5 MB
              </p>
            </div>
            {active === "story" && (
              <div className="grid gap-4 md:grid-cols-2">
                {input("Eyebrow", "eyebrow", 100)}
                {input("Main heading", "title")}
                {input("Accent heading", "accentTitle")}
                {input("Image badge title", "badgeTitle", 100)}
                {input("Image badge subtitle", "badgeSubtitle")}
                <div className="md:col-span-2">
                  <Label className="text-xs font-bold text-slate-700">
                    Story paragraphs
                  </Label>
                  <textarea
                    value={draft.body ?? ""}
                    onChange={(event) => setField("body", event.target.value)}
                    rows={10}
                    maxLength={5000}
                    className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
                  />
                  <p className="mt-1 text-[10px] text-slate-400">
                    Leave one blank line between paragraphs.
                  </p>
                </div>
              </div>
            )}
            {active === "cta" && (
              <div className="space-y-4">
                {input("Heading", "title")}
                <div>
                  <Label className="text-xs font-bold text-slate-700">
                    Description
                  </Label>
                  <textarea
                    value={draft.body ?? ""}
                    onChange={(event) => setField("body", event.target.value)}
                    rows={5}
                    maxLength={5000}
                    className="mt-1.5 w-full rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-500"
                  />
                </div>
              </div>
            )}
            {active === "difference" && (
              <p className="rounded-xl bg-blue-50 px-4 py-3 text-xs font-semibold text-blue-800">
                This control replaces only the right-side image. Existing
                headings, feature list and button remain unchanged.
              </p>
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
    </div>
  );
}
