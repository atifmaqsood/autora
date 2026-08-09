"use client";

import { useState } from "react";
import {
  Save, RotateCcw, CheckCircle2, Layout, Plus, Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useContent } from "@/lib/content/context";
import { defaultContent } from "@/lib/content/store";
import type { ShowcaseContent } from "@/lib/content/types";

type IconType = "shield" | "globe" | "file";

export default function AdminHomepageContentPage() {
  const { content, updateContent } = useContent();
  const [local, setLocal] = useState<
    Pick<ShowcaseContent, "featuredSection" | "categorySection" | "spotlightSection" | "whySection" | "ctaBanner">
  >(() => ({
    featuredSection: { ...content.featuredSection },
    categorySection: { ...content.categorySection },
    spotlightSection: { ...content.spotlightSection },
    whySection: {
      ...content.whySection,
      pillars: content.whySection.pillars.map((p) => ({ ...p }))
    },
    ctaBanner: { ...content.ctaBanner }
  }));
  const [saved, setSaved] = useState(false);

  const patchSection = <K extends keyof typeof local>(
    section: K,
    fields: Partial<(typeof local)[K]>
  ) => {
    setLocal((prev) => ({ ...prev, [section]: { ...prev[section], ...fields } }));
    setSaved(false);
  };

  const patchPillar = (idx: number, fields: Partial<(typeof local.whySection.pillars)[number]>) => {
    const pillars = local.whySection.pillars.map((p, i) => (i === idx ? { ...p, ...fields } : p));
    setLocal((prev) => ({ ...prev, whySection: { ...prev.whySection, pillars } }));
    setSaved(false);
  };

  const addPillar = () => {
    const pillars = [
      ...local.whySection.pillars,
      { id: `pillar-${Date.now()}`, icon: "shield" as IconType, title: "New Feature", body: "Describe this showcase feature." }
    ];
    setLocal((prev) => ({ ...prev, whySection: { ...prev.whySection, pillars } }));
    setSaved(false);
  };

  const removePillar = (idx: number) => {
    if (local.whySection.pillars.length <= 1) return;
    const pillars = local.whySection.pillars.filter((_, i) => i !== idx);
    setLocal((prev) => ({ ...prev, whySection: { ...prev.whySection, pillars } }));
    setSaved(false);
  };

  const handleSave = () => {
    updateContent(local);
    setSaved(true);
  };

  const handleReset = () => {
    if (!confirm("Reset all homepage content to defaults?")) return;
    const d = defaultContent;
    setLocal({
      featuredSection: { ...d.featuredSection },
      categorySection: { ...d.categorySection },
      spotlightSection: { ...d.spotlightSection },
      whySection: { ...d.whySection, pillars: d.whySection.pillars.map((p) => ({ ...p })) },
      ctaBanner: { ...d.ctaBanner }
    });
    setSaved(false);
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Layout className="w-6 h-6 text-amber-500" />
            Homepage Section Content
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage headings, labels, and CTAs for every homepage section.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={handleReset} className="gap-1.5 text-xs text-slate-500">
            <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave} className="gap-2 font-bold shadow-sm">
            <Save className="w-4 h-4" />
            {saved ? "Saved!" : "Save Content"}
          </Button>
        </div>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl flex items-center gap-2.5 text-sm font-semibold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          Homepage content saved and live on the showcase.
        </div>
      )}

      {/* ── Featured Vehicles Section ───────────────────────────── */}
      <SectionCard title="Featured Vehicles Section">
        <Row>
          <Field label="Eyebrow / Label">
            <Input value={local.featuredSection.eyebrow} onChange={(e) => patchSection("featuredSection", { eyebrow: e.target.value })} className="text-sm" />
          </Field>
          <Field label="Section Heading">
            <Input value={local.featuredSection.heading} onChange={(e) => patchSection("featuredSection", { heading: e.target.value })} className="text-sm" />
          </Field>
        </Row>
        <Row>
          <Field label="Sub-heading">
            <Input value={local.featuredSection.subheading} onChange={(e) => patchSection("featuredSection", { subheading: e.target.value })} className="text-sm" />
          </Field>
          <Field label={'"View All" Button Label'}>
            <Input value={local.featuredSection.ctaLabel} onChange={(e) => patchSection("featuredSection", { ctaLabel: e.target.value })} className="text-sm" />
          </Field>
          <Field label={'"View All" Button URL'}>
            <Input value={local.featuredSection.ctaHref} onChange={(e) => patchSection("featuredSection", { ctaHref: e.target.value })} className="text-sm" />
          </Field>
        </Row>
      </SectionCard>

      {/* ── Category Grid Section ───────────────────────────────── */}
      <SectionCard title="Vehicle Category Grid Section">
        <Row>
          <Field label="Eyebrow / Label">
            <Input value={local.categorySection.eyebrow} onChange={(e) => patchSection("categorySection", { eyebrow: e.target.value })} className="text-sm" />
          </Field>
          <Field label="Section Heading">
            <Input value={local.categorySection.heading} onChange={(e) => patchSection("categorySection", { heading: e.target.value })} className="text-sm" />
          </Field>
        </Row>
        <Field label="Sub-heading" full>
          <Textarea value={local.categorySection.subheading} onChange={(e) => patchSection("categorySection", { subheading: e.target.value })} rows={2} className="text-sm" />
        </Field>
      </SectionCard>

      {/* ── Spotlight Section ───────────────────────────────────── */}
      <SectionCard title="Flagship Vehicle Spotlight Section">
        <Row>
          <Field label="Eyebrow / Label">
            <Input value={local.spotlightSection.eyebrow} onChange={(e) => patchSection("spotlightSection", { eyebrow: e.target.value })} className="text-sm" />
          </Field>
          <Field label="Badge Text">
            <Input value={local.spotlightSection.badge} onChange={(e) => patchSection("spotlightSection", { badge: e.target.value })} className="text-sm" />
          </Field>
        </Row>
        <Row>
          <Field label="Section Heading">
            <Input value={local.spotlightSection.heading} onChange={(e) => patchSection("spotlightSection", { heading: e.target.value })} className="text-sm" />
          </Field>
          <Field label="Sub-heading">
            <Input value={local.spotlightSection.subheading} onChange={(e) => patchSection("spotlightSection", { subheading: e.target.value })} className="text-sm" />
          </Field>
        </Row>
      </SectionCard>

      {/* ── Why Section / Pillars ───────────────────────────────── */}
      <SectionCard title='"Why Autora" Trust Pillars Section'>
        <Row>
          <Field label="Eyebrow / Label">
            <Input value={local.whySection.eyebrow} onChange={(e) => patchSection("whySection", { eyebrow: e.target.value })} className="text-sm" />
          </Field>
          <Field label="Section Heading">
            <Input value={local.whySection.heading} onChange={(e) => patchSection("whySection", { heading: e.target.value })} className="text-sm" />
          </Field>
        </Row>

        <div className="pt-2 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Pillars ({local.whySection.pillars.length})
            </span>
            <Button variant="outline" size="sm" onClick={addPillar} className="gap-1.5 text-xs font-semibold">
              <Plus className="w-3.5 h-3.5" /> Add Pillar
            </Button>
          </div>

          {local.whySection.pillars.map((pillar, idx) => (
            <div key={pillar.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-600 uppercase">Pillar {idx + 1}</span>
                <button
                  onClick={() => removePillar(idx)}
                  className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-red-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <Row>
                <Field label="Icon">
                  <select
                    value={pillar.icon}
                    onChange={(e) => patchPillar(idx, { icon: e.target.value as IconType })}
                    className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-sm"
                  >
                    <option value="shield">Shield (Verification)</option>
                    <option value="globe">Globe (Global)</option>
                    <option value="file">File (Documents)</option>
                  </select>
                </Field>
                <Field label="Title">
                  <Input value={pillar.title} onChange={(e) => patchPillar(idx, { title: e.target.value })} className="text-sm" />
                </Field>
              </Row>
              <Field label="Body Text" full>
                <Textarea value={pillar.body} onChange={(e) => patchPillar(idx, { body: e.target.value })} rows={2} className="text-sm" />
              </Field>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* ── CTA Banner ──────────────────────────────────────────── */}
      <SectionCard title="Bottom CTA Banner Section">
        <Row>
          <Field label="Badge Text">
            <Input value={local.ctaBanner.badge} onChange={(e) => patchSection("ctaBanner", { badge: e.target.value })} className="text-sm" />
          </Field>
          <Field label="Button Label">
            <Input value={local.ctaBanner.ctaLabel} onChange={(e) => patchSection("ctaBanner", { ctaLabel: e.target.value })} className="text-sm" />
          </Field>
        </Row>
        <Field label="Heading" full>
          <Input value={local.ctaBanner.heading} onChange={(e) => patchSection("ctaBanner", { heading: e.target.value })} className="text-sm" />
        </Field>
        <Field label="Sub-heading" full>
          <Textarea value={local.ctaBanner.subheading} onChange={(e) => patchSection("ctaBanner", { subheading: e.target.value })} rows={2} className="text-sm" />
        </Field>
      </SectionCard>
    </div>
  );
}

// ── Shared Sub-components ──────────────────────────────────────────────────────
function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center gap-2">
        <span className="text-sm font-bold text-slate-800">{title}</span>
      </div>
      <div className="p-6 space-y-4">{children}</div>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{children}</div>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? "sm:col-span-2 lg:col-span-3" : ""}>
      <Label className="text-xs mb-1 block">{label}</Label>
      {children}
    </div>
  );
}
