"use client";

import { useState, type ReactNode } from "react";
import { CheckCircle2, PackageCheck, Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useContent } from "@/lib/content/context";
import { defaultContent } from "@/lib/content/store";
import type { SparePartsPageContent } from "@/lib/content/types";

export default function AdminSparePartsContentPage() {
  const { content, updateContent } = useContent();
  const [local, setLocal] = useState<SparePartsPageContent>(() => ({
    ...content.sparePartsPage,
    categories: content.sparePartsPage.categories.map((category) => ({ ...category }))
  }));
  const [saved, setSaved] = useState(false);

  const patch = (fields: Partial<SparePartsPageContent>) => {
    setLocal((prev) => ({ ...prev, ...fields }));
    setSaved(false);
  };

  const patchCategory = (idx: number, fields: Partial<SparePartsPageContent["categories"][number]>) => {
    const categories = local.categories.map((category, index) =>
      index === idx ? { ...category, ...fields } : category
    );
    setLocal((prev) => ({ ...prev, categories }));
    setSaved(false);
  };

  const addCategory = () => {
    setLocal((prev) => ({
      ...prev,
      categories: [
        ...prev.categories,
        {
          id: `parts-${Date.now()}`,
          title: "New Parts Category",
          description: "Describe the spare parts included in this category."
        }
      ]
    }));
    setSaved(false);
  };

  const removeCategory = (idx: number) => {
    if (local.categories.length <= 1) return;
    setLocal((prev) => ({
      ...prev,
      categories: prev.categories.filter((_, index) => index !== idx)
    }));
    setSaved(false);
  };

  const handleSave = () => {
    updateContent({ sparePartsPage: local });
    setSaved(true);
  };

  const handleReset = () => {
    if (!confirm("Reset spare parts page content to defaults?")) return;
    setLocal({
      ...defaultContent.sparePartsPage,
      categories: defaultContent.sparePartsPage.categories.map((category) => ({ ...category }))
    });
    setSaved(false);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-black tracking-tight text-slate-900">
            <PackageCheck className="h-6 w-6 text-amber-500" />
            Spare Parts Page Content
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Manage headings, category cards, sourcing process copy, and quote CTAs for the spare parts page.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={handleReset} className="gap-1.5 text-xs text-slate-500">
            <RotateCcw className="h-3.5 w-3.5" /> Reset Defaults
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave} className="gap-2 font-bold shadow-sm">
            <Save className="h-4 w-4" />
            {saved ? "Saved!" : "Save Content"}
          </Button>
        </div>
      </div>

      {saved && (
        <div className="animate-in fade-in flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          Spare parts page content saved and live on the storefront.
        </div>
      )}

      <SectionCard title="Hero Section">
        <Row>
          <Field label="Eyebrow / Label">
            <Input value={local.heroEyebrow} onChange={(e) => patch({ heroEyebrow: e.target.value })} className="text-sm" />
          </Field>
          <Field label="Primary Button Label">
            <Input value={local.primaryCtaLabel} onChange={(e) => patch({ primaryCtaLabel: e.target.value })} className="text-sm" />
          </Field>
          <Field label="Secondary Button Label">
            <Input value={local.secondaryCtaLabel} onChange={(e) => patch({ secondaryCtaLabel: e.target.value })} className="text-sm" />
          </Field>
        </Row>
        <Field label="Hero Heading" full>
          <Textarea value={local.heroTitle} onChange={(e) => patch({ heroTitle: e.target.value })} rows={2} className="text-sm font-bold" />
        </Field>
        <Field label="Hero Sub-heading" full>
          <Textarea value={local.heroSubtitle} onChange={(e) => patch({ heroSubtitle: e.target.value })} rows={3} className="text-sm" />
        </Field>
      </SectionCard>

      <SectionCard title="Parts Categories Section">
        <Row>
          <Field label="Eyebrow / Label">
            <Input value={local.categoriesEyebrow} onChange={(e) => patch({ categoriesEyebrow: e.target.value })} className="text-sm" />
          </Field>
          <Field label="Section Heading">
            <Input value={local.categoriesTitle} onChange={(e) => patch({ categoriesTitle: e.target.value })} className="text-sm" />
          </Field>
        </Row>
        <Field label="Section Sub-heading" full>
          <Textarea value={local.categoriesSubtitle} onChange={(e) => patch({ categoriesSubtitle: e.target.value })} rows={2} className="text-sm" />
        </Field>

        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Category Cards ({local.categories.length})
            </span>
            <Button variant="outline" size="sm" onClick={addCategory} className="gap-1.5 text-xs font-semibold">
              <Plus className="h-3.5 w-3.5" /> Add Category
            </Button>
          </div>

          {local.categories.map((category, idx) => (
            <div key={category.id} className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-amber-600">Category {idx + 1}</span>
                <button
                  onClick={() => removeCategory(idx)}
                  className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-600"
                  aria-label={`Remove ${category.title}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <Row>
                <Field label="Title">
                  <Input value={category.title} onChange={(e) => patchCategory(idx, { title: e.target.value })} className="text-sm" />
                </Field>
                <Field label="Description">
                  <Textarea value={category.description} onChange={(e) => patchCategory(idx, { description: e.target.value })} rows={2} className="text-sm" />
                </Field>
              </Row>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Sourcing Process Section">
        <Row>
          <Field label="Eyebrow / Label">
            <Input value={local.processEyebrow} onChange={(e) => patch({ processEyebrow: e.target.value })} className="text-sm" />
          </Field>
          <Field label="Section Heading">
            <Input value={local.processTitle} onChange={(e) => patch({ processTitle: e.target.value })} className="text-sm" />
          </Field>
        </Row>
        <Field label="Section Sub-heading" full>
          <Textarea value={local.processSubtitle} onChange={(e) => patch({ processSubtitle: e.target.value })} rows={3} className="text-sm" />
        </Field>
      </SectionCard>

      <SectionCard title="Bottom CTA Section">
        <Row>
          <Field label="Eyebrow / Label">
            <Input value={local.ctaEyebrow} onChange={(e) => patch({ ctaEyebrow: e.target.value })} className="text-sm" />
          </Field>
          <Field label="Button Label">
            <Input value={local.ctaLabel} onChange={(e) => patch({ ctaLabel: e.target.value })} className="text-sm" />
          </Field>
        </Row>
        <Field label="CTA Heading" full>
          <Textarea value={local.ctaTitle} onChange={(e) => patch({ ctaTitle: e.target.value })} rows={2} className="text-sm font-bold" />
        </Field>
        <Field label="CTA Sub-heading" full>
          <Textarea value={local.ctaSubtitle} onChange={(e) => patch({ ctaSubtitle: e.target.value })} rows={3} className="text-sm" />
        </Field>
      </SectionCard>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-6 py-3">
        <span className="text-sm font-bold text-slate-800">{title}</span>
      </div>
      <div className="space-y-4 p-6">{children}</div>
    </div>
  );
}

function Row({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}

function Field({ label, children, full }: { label: string; children: ReactNode; full?: boolean }) {
  return (
    <div className={full ? "sm:col-span-2 lg:col-span-3" : ""}>
      <Label className="mb-1 block text-xs">{label}</Label>
      {children}
    </div>
  );
}


