"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { CheckCircle2, Eye, EyeOff, Globe2, ImageIcon, ImagePlus, LayoutGrid, Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { HomeIndustryCard } from "@/lib/home-industries/types";
import { agtpAssets } from "@/src/assets";
import { AutomotiveSpotlightEditor, GlobalNetworkEditor } from "@/components/admin/home-page-section-editors";
import { adminFetch } from "@/lib/admin/admin-fetch";

type HomeAdminSection = "industries" | "global-network" | "automotive-parts";

interface CardDraft {
  title: string;
  subtitle: string;
  linkUrl: string;
  isActive: boolean;
}

const builtinImages: Record<string, string> = {
  "builtin:suvs": agtpAssets.suvs.src,
  "builtin:pickups": agtpAssets.pickups.src,
  "builtin:vans": agtpAssets.vans.src,
  "builtin:engines": agtpAssets.mercedesCclassCard.src,
  "builtin:parts": agtpAssets.sparePartsHero.src
};

function imageSource(imageUrl: string): string {
  return builtinImages[imageUrl] ?? imageUrl;
}

export default function HomeIndustriesAdminPage() {
  const [activeSection, setActiveSection] = useState<HomeAdminSection>("industries");
  const [cards, setCards] = useState<HomeIndustryCard[]>([]);
  const [drafts, setDrafts] = useState<Record<string, CardDraft>>({});
  const [images, setImages] = useState<Record<string, File | null>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadCards = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await adminFetch("/api/admin/home/industry-cards", { cache: "no-store" });
      if (!response.ok) throw new Error("Unable to load home industry cards.");
      const data = (await response.json()) as HomeIndustryCard[];
      setCards(data);
      setDrafts(
        Object.fromEntries(
          data.map((card) => [
            card.id,
            {
              title: card.title,
              subtitle: card.subtitle,
              linkUrl: card.linkUrl,
              isActive: card.isActive
            }
          ])
        )
      );
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load cards.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadCards();
  }, [loadCards]);

  function updateDraft(id: string, patch: Partial<CardDraft>) {
    setDrafts((current) => ({
      ...current,
      [id]: { ...current[id], ...patch }
    }));
  }

  function selectImage(id: string, event: ChangeEvent<HTMLInputElement>) {
    setImages((current) => ({ ...current, [id]: event.target.files?.[0] ?? null }));
  }

  async function saveCard(card: HomeIndustryCard) {
    const draft = drafts[card.id];
    if (!draft?.title.trim() || !draft.subtitle.trim() || !draft.linkUrl.trim()) {
      setError("Title, description and link are required.");
      return;
    }

    setSavingId(card.id);
    setError("");
    setMessage("");
    const formData = new FormData();
    formData.set("title", draft.title.trim());
    formData.set("subtitle", draft.subtitle.trim());
    formData.set("linkUrl", draft.linkUrl.trim());
    formData.set("isActive", String(draft.isActive));
    if (images[card.id]) formData.set("image", images[card.id]!);

    try {
      const response = await adminFetch(`/api/admin/home/industry-cards/${card.id}`, {
        method: "PATCH",
        body: formData
      });
      const body = (await response.json()) as HomeIndustryCard | { message?: string };
      if (!response.ok) {
        throw new Error("message" in body ? body.message : "Unable to save card.");
      }
      setImages((current) => ({ ...current, [card.id]: null }));
      setMessage(`${draft.title.trim()} updated successfully.`);
      await loadCards();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save card.");
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-12">
      <header className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
            <LayoutGrid className="h-4 w-4" /> Homepage content
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950">Home Page</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Manage homepage sections without changing the website layout.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm">
          3 sections configured
        </div>
      </header>

      <nav className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm" aria-label="Home page sections">
        <p className="px-3 pb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Sections</p>
        <div className="grid gap-2 md:grid-cols-3">
          {[
            { key: "industries" as const, label: "Industries We Serve", detail: "Cards, text and images", icon: LayoutGrid },
            { key: "global-network" as const, label: "Global Network", detail: "Header, hub and markets", icon: Globe2 },
            { key: "automotive-parts" as const, label: "Parts Spotlight", detail: "Full-width background image", icon: ImageIcon }
          ].map((section) => {
            const Icon = section.icon;
            const active = activeSection === section.key;
            return (
              <button key={section.key} type="button" onClick={() => setActiveSection(section.key)} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left transition ${active ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-700 hover:bg-slate-100"}`}>
                <Icon className={`h-4 w-4 ${active ? "text-amber-400" : "text-slate-400"}`} />
                <span>
                  <span className="block text-xs font-bold">{section.label}</span>
                  <span className={`mt-0.5 block text-[10px] ${active ? "text-slate-400" : "text-slate-500"}`}>{section.detail}</span>
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {activeSection === "industries" ? (
        <>
      {(error || message) && (
        <div className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold ${error ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
          {!error && <CheckCircle2 className="h-4 w-4" />}
          {error || message}
        </div>
      )}

      {isLoading ? (
        <div className="flex min-h-64 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-400">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {cards.map((card) => {
            const draft = drafts[card.id];
            if (!draft) return null;
            const previewUrl = imageSource(card.imageUrl);

            return (
              <section key={card.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div
                  role="img"
                  aria-label={draft.title}
                  className="h-52 bg-slate-900 bg-cover bg-center"
                  style={{ backgroundImage: `linear-gradient(to top, rgba(15,23,42,.6), transparent), url(${JSON.stringify(previewUrl).slice(1, -1)})` }}
                />
                <div className="space-y-4 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">Card {card.sortOrder + 1}</p>
                    <button
                      type="button"
                      onClick={() => updateDraft(card.id, { isActive: !draft.isActive })}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold ${draft.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}
                    >
                      {draft.isActive ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                      {draft.isActive ? "Visible" : "Hidden"}
                    </button>
                  </div>

                  <div>
                    <Label htmlFor={`title-${card.id}`} className="text-xs font-bold text-slate-700">Title</Label>
                    <Input id={`title-${card.id}`} value={draft.title} onChange={(event) => updateDraft(card.id, { title: event.target.value })} className="mt-1.5 h-11" maxLength={100} />
                  </div>
                  <div>
                    <Label htmlFor={`subtitle-${card.id}`} className="text-xs font-bold text-slate-700">Description</Label>
                    <Input id={`subtitle-${card.id}`} value={draft.subtitle} onChange={(event) => updateDraft(card.id, { subtitle: event.target.value })} className="mt-1.5 h-11" maxLength={191} />
                  </div>
                  <div>
                    <Label htmlFor={`link-${card.id}`} className="text-xs font-bold text-slate-700">Destination link</Label>
                    <Input id={`link-${card.id}`} value={draft.linkUrl} onChange={(event) => updateDraft(card.id, { linkUrl: event.target.value })} className="mt-1.5 h-11" placeholder="/vehicles" maxLength={255} />
                  </div>
                  <div>
                    <Label htmlFor={`image-${card.id}`} className="text-xs font-bold text-slate-700">Replace image</Label>
                    <Input id={`image-${card.id}`} type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => selectImage(card.id, event)} className="mt-1.5 h-11 cursor-pointer bg-white text-xs file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:font-semibold" />
                    <p className="mt-1.5 flex items-center gap-1 text-[10px] text-slate-400"><ImagePlus className="h-3 w-3" /> JPG, PNG or WebP · Maximum 5 MB</p>
                  </div>

                  <Button type="button" onClick={() => void saveCard(card)} disabled={savingId === card.id} className="w-full gap-2 bg-slate-950">
                    {savingId === card.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    {savingId === card.id ? "Saving..." : "Save card"}
                  </Button>
                </div>
              </section>
            );
          })}
        </div>
      )}
        </>
      ) : activeSection === "global-network" ? (
        <GlobalNetworkEditor />
      ) : (
        <AutomotiveSpotlightEditor />
      )}
    </div>
  );
}
