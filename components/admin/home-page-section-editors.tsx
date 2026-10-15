"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { CheckCircle2, ImagePlus, Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { HomePageContentItem } from "@/lib/home-page-content/types";
import { agtpAssets } from "@/src/assets";

interface ItemDraft {
  label: string;
  title: string;
  subtitle: string;
}

const builtinImages: Record<string, string> = {
  "builtin:spotlight-ferrari": agtpAssets.spotlightFerrari.src
};

function imageSource(imageUrl: string | null): string {
  return imageUrl ? (builtinImages[imageUrl] ?? imageUrl) : "";
}

function useSectionItems(sectionKey: string) {
  const [items, setItems] = useState<HomePageContentItem[]>([]);
  const [drafts, setDrafts] = useState<Record<string, ItemDraft>>({});
  const [images, setImages] = useState<Record<string, File | null>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/home/sections/${sectionKey}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Unable to load section content.");
      const data = (await response.json()) as HomePageContentItem[];
      setItems(data);
      setDrafts(
        Object.fromEntries(
          data.map((item) => [
            item.id,
            {
              label: item.label ?? "",
              title: item.title ?? "",
              subtitle: item.subtitle ?? ""
            }
          ])
        )
      );
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load section.");
    } finally {
      setIsLoading(false);
    }
  }, [sectionKey]);

  useEffect(() => {
    void load();
  }, [load]);

  function updateDraft(id: string, patch: Partial<ItemDraft>) {
    setDrafts((current) => ({ ...current, [id]: { ...current[id], ...patch } }));
  }

  function selectImage(id: string, event: ChangeEvent<HTMLInputElement>) {
    setImages((current) => ({ ...current, [id]: event.target.files?.[0] ?? null }));
  }

  async function save(item: HomePageContentItem, includeText = true) {
    const draft = drafts[item.id];
    const image = images[item.id];
    if (includeText && !draft) return;
    if (!includeText && !image) {
      setError("Choose a replacement image first.");
      return;
    }

    setSavingId(item.id);
    setError("");
    setMessage("");
    const formData = new FormData();
    if (includeText && draft) {
      formData.set("label", draft.label);
      formData.set("title", draft.title);
      formData.set("subtitle", draft.subtitle);
    }
    if (image) formData.set("image", image);

    try {
      const response = await fetch(`/api/admin/home/section-items/${item.id}`, {
        method: "PATCH",
        body: formData
      });
      const body = (await response.json()) as HomePageContentItem | { message?: string };
      if (!response.ok) throw new Error("message" in body ? body.message : "Unable to save content.");
      setImages((current) => ({ ...current, [item.id]: null }));
      setMessage("Section content updated successfully.");
      await load();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save content.");
    } finally {
      setSavingId(null);
    }
  }

  return {
    items,
    drafts,
    images,
    isLoading,
    savingId,
    error,
    message,
    updateDraft,
    selectImage,
    save
  };
}

function Status({ error, message }: { error: string; message: string }) {
  if (!error && !message) return null;
  return (
    <div className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold ${error ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
      {!error && <CheckCircle2 className="h-4 w-4" />}
      {error || message}
    </div>
  );
}

function ImageField({ item, onChange }: { item: HomePageContentItem; onChange: (event: ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div>
      <Label htmlFor={`content-image-${item.id}`} className="text-xs font-bold text-slate-700">Replace image</Label>
      <Input id={`content-image-${item.id}`} type="file" accept="image/jpeg,image/png,image/webp" onChange={onChange} className="mt-1.5 h-11 cursor-pointer bg-white text-xs file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:font-semibold" />
      <p className="mt-1.5 flex items-center gap-1 text-[10px] text-slate-400"><ImagePlus className="h-3 w-3" /> JPG, PNG or WebP · Maximum 5 MB</p>
    </div>
  );
}

export function GlobalNetworkEditor() {
  const editor = useSectionItems("global-network");
  if (editor.isLoading) return <div className="flex min-h-64 items-center justify-center rounded-2xl border border-slate-200 bg-white"><Loader2 className="h-6 w-6 animate-spin text-slate-400" /></div>;

  return (
    <div className="space-y-5">
      <Status error={editor.error} message={editor.message} />
      <div className="grid gap-5 lg:grid-cols-2">
        {editor.items.map((item) => {
          const draft = editor.drafts[item.id];
          if (!draft) return null;
          const isHeader = item.itemKey === "header";
          return (
            <section key={item.id} className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${isHeader ? "lg:col-span-2" : ""}`}>
              {!isHeader && item.imageUrl && (
                <div role="img" aria-label={draft.title} className="h-44 bg-slate-900 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(to top, rgba(15,23,42,.55), transparent), url(${JSON.stringify(imageSource(item.imageUrl)).slice(1, -1)})` }} />
              )}
              <div className="space-y-4 p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-700">{isHeader ? "Section heading" : item.itemKey === "hub" ? "Dubai hub card" : `Market ${item.itemKey.replace("market-", "")}`}</p>
                <div>
                  <Label htmlFor={`label-${item.id}`} className="text-xs font-bold text-slate-700">Label</Label>
                  <Input id={`label-${item.id}`} value={draft.label} onChange={(event) => editor.updateDraft(item.id, { label: event.target.value })} className="mt-1.5 h-11" maxLength={100} />
                </div>
                <div>
                  <Label htmlFor={`title-${item.id}`} className="text-xs font-bold text-slate-700">Title</Label>
                  <Input id={`title-${item.id}`} value={draft.title} onChange={(event) => editor.updateDraft(item.id, { title: event.target.value })} className="mt-1.5 h-11" maxLength={191} />
                </div>
                <div>
                  <Label htmlFor={`subtitle-${item.id}`} className="text-xs font-bold text-slate-700">Description</Label>
                  <Input id={`subtitle-${item.id}`} value={draft.subtitle} onChange={(event) => editor.updateDraft(item.id, { subtitle: event.target.value })} className="mt-1.5 h-11" maxLength={1000} />
                </div>
                {!isHeader && <ImageField item={item} onChange={(event) => editor.selectImage(item.id, event)} />}
                <Button type="button" onClick={() => void editor.save(item)} disabled={editor.savingId === item.id} className="w-full gap-2 bg-slate-950">
                  {editor.savingId === item.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  {editor.savingId === item.id ? "Saving..." : "Save item"}
                </Button>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export function AutomotiveSpotlightEditor() {
  const editor = useSectionItems("automotive-parts");
  if (editor.isLoading) return <div className="flex min-h-64 items-center justify-center rounded-2xl border border-slate-200 bg-white"><Loader2 className="h-6 w-6 animate-spin text-slate-400" /></div>;
  const item = editor.items[0];
  if (!item) return <Status error={editor.error || "Spotlight content is unavailable."} message="" />;

  return (
    <div className="space-y-5">
      <Status error={editor.error} message={editor.message} />
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div role="img" aria-label={item.label ?? "Automotive parts spotlight"} className="h-72 bg-slate-950 bg-cover bg-center" style={{ backgroundImage: `url(${JSON.stringify(imageSource(item.imageUrl)).slice(1, -1)})` }} />
        <div className="space-y-4 p-5">
          <div>
            <h2 className="text-lg font-black text-slate-950">Automotive Parts Spotlight</h2>
            <p className="mt-1 text-xs text-slate-500">Only the background image changes; existing scroll animation and overlay content stay untouched.</p>
          </div>
          <ImageField item={item} onChange={(event) => editor.selectImage(item.id, event)} />
          <Button type="button" onClick={() => void editor.save(item, false)} disabled={editor.savingId === item.id || !editor.images[item.id]} className="gap-2 bg-slate-950">
            {editor.savingId === item.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {editor.savingId === item.id ? "Saving..." : "Replace image"}
          </Button>
        </div>
      </section>
    </div>
  );
}
