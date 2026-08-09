"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Plus, Trash2, ChevronUp, ChevronDown, Save, Eye,
  EyeOff, RotateCcw, CheckCircle2, ImageIcon, Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useContent } from "@/lib/content/context";
import { defaultContent } from "@/lib/content/store";
import type { HeroSlide } from "@/lib/content/types";

function generateId() {
  return `slide-${Date.now()}`;
}

const blankSlide = (): HeroSlide => ({
  id: generateId(),
  badge: "NEW SLIDE",
  heading: "Your Headline",
  accentWord: "Here",
  subheading: "Add your slide description here.",
  image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80",
  primaryCta: { label: "Browse Vehicles", href: "/vehicles" },
  secondaryCta: { label: "Learn More", href: "/about" },
  overlayColor: "dark",
  active: true
});

export default function AdminHeroSlidesPage() {
  const { content, updateContent } = useContent();
  const [slides, setSlides] = useState<HeroSlide[]>(() =>
    JSON.parse(JSON.stringify(content.heroSlides))
  );
  const [editingId, setEditingId] = useState<string | null>(slides[0]?.id ?? null);
  const [saved, setSaved] = useState(false);

  const editingSlide = slides.find((s) => s.id === editingId) ?? null;

  const patch = (id: string, fields: Partial<HeroSlide>) => {
    setSlides((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...fields } : s))
    );
    setSaved(false);
  };

  const patchCta = (
    id: string,
    ctaKey: "primaryCta" | "secondaryCta",
    field: "label" | "href",
    value: string
  ) => {
    setSlides((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, [ctaKey]: { ...s[ctaKey], [field]: value } } : s
      )
    );
    setSaved(false);
  };

  const addSlide = () => {
    const s = blankSlide();
    setSlides((prev) => [...prev, s]);
    setEditingId(s.id);
    setSaved(false);
  };

  const removeSlide = (id: string) => {
    if (slides.length <= 1) return alert("You must keep at least one slide.");
    const confirmed = confirm("Delete this hero slide?");
    if (!confirmed) return;
    const next = slides.filter((s) => s.id !== id);
    setSlides(next);
    if (editingId === id) setEditingId(next[0]?.id ?? null);
    setSaved(false);
  };

  const moveSlide = (id: string, dir: "up" | "down") => {
    const idx = slides.findIndex((s) => s.id === id);
    if (dir === "up" && idx === 0) return;
    if (dir === "down" && idx === slides.length - 1) return;
    const next = [...slides];
    const swap = dir === "up" ? idx - 1 : idx + 1;
    [next[idx], next[swap]] = [next[swap], next[idx]];
    setSlides(next);
    setSaved(false);
  };

  const handleSave = () => {
    updateContent({ heroSlides: slides });
    setSaved(true);
  };

  const handleReset = () => {
    if (!confirm("Reset all slides to defaults?")) return;
    const d = JSON.parse(JSON.stringify(defaultContent.heroSlides));
    setSlides(d);
    setEditingId(d[0]?.id ?? null);
    setSaved(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Layers className="w-6 h-6 text-amber-500" />
            Hero Carousel Slides
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage every slide shown in the homepage rotating hero banner.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={handleReset} className="gap-1.5 text-xs text-slate-500">
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave} className="gap-2 font-bold shadow-sm">
            <Save className="w-4 h-4" />
            {saved ? "Saved!" : "Save Slides"}
          </Button>
        </div>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl flex items-center gap-2.5 text-sm font-semibold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          Hero slides saved — visible on the live showcase homepage immediately.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── Left: Slide List ──────────────────────────────────────── */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {slides.length} Slide{slides.length !== 1 ? "s" : ""}
            </span>
            <Button variant="outline" size="sm" onClick={addSlide} className="gap-1.5 text-xs font-semibold">
              <Plus className="w-3.5 h-3.5" />
              Add Slide
            </Button>
          </div>

          {slides.map((s, idx) => (
            <div
              key={s.id}
              onClick={() => setEditingId(s.id)}
              className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                editingId === s.id
                  ? "border-amber-500 ring-2 ring-amber-500/30 shadow-md"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              {/* Thumbnail */}
              <div className="relative h-24 w-full bg-slate-900">
                <Image
                  src={s.image}
                  alt={s.heading}
                  fill
                  className="object-cover opacity-60"
                  sizes="300px"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-transparent" />
                <div className="absolute bottom-2 left-3 right-16 z-10">
                  <p className="text-[10px] font-bold text-amber-400 uppercase truncate">{s.badge}</p>
                  <p className="text-xs font-black text-white truncate">
                    {s.heading} {s.accentWord}
                  </p>
                </div>
                {/* Status badge */}
                <div className="absolute top-2 right-2 z-10">
                  {s.active ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold bg-emerald-500 text-white px-1.5 py-0.5 rounded">
                      <Eye className="w-3 h-3" /> ON
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-bold bg-slate-600 text-white px-1.5 py-0.5 rounded">
                      <EyeOff className="w-3 h-3" /> OFF
                    </span>
                  )}
                </div>
              </div>

              {/* Slide controls */}
              <div className="bg-white px-3 py-2 flex items-center justify-between border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400">SLIDE {idx + 1}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); moveSlide(s.id, "up"); }}
                    className="p-1 rounded hover:bg-slate-100 text-slate-500"
                    title="Move Up"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); moveSlide(s.id, "down"); }}
                    className="p-1 rounded hover:bg-slate-100 text-slate-500"
                    title="Move Down"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); patch(s.id, { active: !s.active }); }}
                    className="p-1 rounded hover:bg-slate-100 text-slate-500"
                    title={s.active ? "Hide Slide" : "Show Slide"}
                  >
                    {s.active ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeSlide(s.id); }}
                    className="p-1 rounded hover:bg-red-50 text-slate-400 hover:text-red-600"
                    title="Delete Slide"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Right: Slide Editor ───────────────────────────────────── */}
        {editingSlide ? (
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Editing: Slide {slides.findIndex((s) => s.id === editingSlide.id) + 1}
            </h3>

            {/* Image Preview */}
            <div className="relative h-36 rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
              <Image
                src={editingSlide.image}
                alt="Preview"
                fill
                className="object-cover opacity-70"
                sizes="800px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 to-transparent flex items-end p-4">
                <div>
                  <p className="text-[11px] font-bold text-amber-400">{editingSlide.badge}</p>
                  <p className="text-xl font-black text-white">
                    {editingSlide.heading}{" "}
                    <span className="text-amber-300">{editingSlide.accentWord}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label className="text-xs">Background Image URL</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={editingSlide.image}
                    onChange={(e) => patch(editingSlide.id, { image: e.target.value })}
                    placeholder="https://..."
                    className="text-sm flex-1"
                  />
                  <div className="w-10 h-10 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden relative shrink-0">
                    <ImageIcon className="w-5 h-5 text-slate-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-xs">Badge / Eyebrow Label</Label>
                <Input
                  value={editingSlide.badge}
                  onChange={(e) => patch(editingSlide.id, { badge: e.target.value })}
                  placeholder="LUXURY SHOWCASE"
                  className="mt-1 text-sm"
                />
              </div>

              <div>
                <Label className="text-xs">Heading (Main Text)</Label>
                <Input
                  value={editingSlide.heading}
                  onChange={(e) => patch(editingSlide.id, { heading: e.target.value })}
                  placeholder="Discover Premier Vehicle"
                  className="mt-1 text-sm"
                />
              </div>

              <div>
                <Label className="text-xs">Accent Word (Highlighted in Gold)</Label>
                <Input
                  value={editingSlide.accentWord}
                  onChange={(e) => patch(editingSlide.id, { accentWord: e.target.value })}
                  placeholder="Specifications"
                  className="mt-1 text-sm"
                />
              </div>

              <div>
                <Label className="text-xs">Overlay Theme</Label>
                <select
                  value={editingSlide.overlayColor}
                  onChange={(e) => patch(editingSlide.id, { overlayColor: e.target.value as "dark" | "light" })}
                  className="w-full h-10 px-3 mt-1 rounded-md border border-slate-300 bg-white text-sm"
                >
                  <option value="dark">Dark Overlay</option>
                  <option value="light">Light Overlay</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <Label className="text-xs">Subheading / Description</Label>
                <Textarea
                  value={editingSlide.subheading}
                  onChange={(e) => patch(editingSlide.id, { subheading: e.target.value })}
                  rows={2}
                  placeholder="Slide subtitle text..."
                  className="mt-1 text-sm"
                />
              </div>

              {/* Primary CTA */}
              <div>
                <Label className="text-xs">Primary Button Label</Label>
                <Input
                  value={editingSlide.primaryCta.label}
                  onChange={(e) => patchCta(editingSlide.id, "primaryCta", "label", e.target.value)}
                  placeholder="Browse Vehicles"
                  className="mt-1 text-sm"
                />
              </div>
              <div>
                <Label className="text-xs">Primary Button URL</Label>
                <Input
                  value={editingSlide.primaryCta.href}
                  onChange={(e) => patchCta(editingSlide.id, "primaryCta", "href", e.target.value)}
                  placeholder="/vehicles"
                  className="mt-1 text-sm"
                />
              </div>

              {/* Secondary CTA */}
              <div>
                <Label className="text-xs">Secondary Button Label</Label>
                <Input
                  value={editingSlide.secondaryCta.label}
                  onChange={(e) => patchCta(editingSlide.id, "secondaryCta", "label", e.target.value)}
                  placeholder="Learn More"
                  className="mt-1 text-sm"
                />
              </div>
              <div>
                <Label className="text-xs">Secondary Button URL</Label>
                <Input
                  value={editingSlide.secondaryCta.href}
                  onChange={(e) => patchCta(editingSlide.id, "secondaryCta", "href", e.target.value)}
                  placeholder="/about"
                  className="mt-1 text-sm"
                />
              </div>

              {/* Active Toggle */}
              <div className="sm:col-span-2 flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingSlide.active}
                    onChange={(e) => patch(editingSlide.id, { active: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                  />
                  Slide is Active (visible in carousel)
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
            Select a slide from the list to edit it.
          </div>
        )}
      </div>
    </div>
  );
}
